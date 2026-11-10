import { NextRequest, NextResponse } from 'next/server'

export interface RSSArticle {
  title: string
  link: string
  pubDate: string
  contentSnippet: string
  author?: string
}

interface RSSItem {
  title?: string
  link?: string
  pubDate?: string
  description?: string
  'content:encoded'?: string
  author?: string
  creator?: string
}

function isValidUrl(url: string): boolean {
  try {
    const urlObj = new URL(url)
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
  } catch {
    return false
  }
}

function parseDate(dateStr?: string): string {
  if (!dateStr) return ''
  try {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return dateStr
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return dateStr
  }
}

function unwrapCdata(value: string): string {
  return value.replace(/^<!\[CDATA\[([\s\S]*?)\]\]>$/i, '$1').trim()
}

function decodeEntities(value: string): string {
  return value
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
}

function stripHtml(html: string): string {
  const text = decodeEntities(unwrapCdata(html).replace(/<[^>]*>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim()
  return text.length > 300 ? text.substring(0, 297) + '...' : text
}

function parseRSS(xml: string): RSSArticle[] {
  const articles: RSSArticle[] = []
  
  const itemRegex = /<item[^>]*>([\s\S]*?)<\/item>/gi
  let match
  
  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1]
    
    const getTagContent = (tag: string): string => {
      const tagRegex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i')
      const tagMatch = itemXml.match(tagRegex)
      return tagMatch ? unwrapCdata(tagMatch[1].trim()) : ''
    }
    
    const title = decodeEntities(getTagContent('title'))
    const link = getTagContent('link')
    const pubDate = getTagContent('pubDate')
    const description = getTagContent('description')
    const contentEncoded = getTagContent('content:encoded')
    const author = decodeEntities(getTagContent('author') || getTagContent('dc:creator'))
    
    if (title) {
      articles.push({
        title,
        link,
        pubDate: parseDate(pubDate),
        contentSnippet: stripHtml(contentEncoded || description || ''),
        author: author || undefined,
      })
    }
  }
  
  if (articles.length === 0) {
    const entryRegex = /<entry[^>]*>([\s\S]*?)<\/entry>/gi
    while ((match = entryRegex.exec(xml)) !== null) {
      const entryXml = match[1]
      
      const getTagContent = (tag: string): string => {
        const tagRegex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i')
        const tagMatch = entryXml.match(tagRegex)
        return tagMatch ? unwrapCdata(tagMatch[1].trim()) : ''
      }
      
      const title = decodeEntities(getTagContent('title'))
      const linkTag = entryXml.match(/<link[^>]*href=["']([^"']*)["'][^>]*>/i)
      const link = linkTag ? linkTag[1] : ''
      const pubDate = getTagContent('published') || getTagContent('updated')
      const summary = getTagContent('summary') || getTagContent('content')
      const rawAuthor = getTagContent('author')
      const nameMatch = rawAuthor.match(/<name[^>]*>([\s\S]*?)<\/name>/i)
      const author = decodeEntities(nameMatch ? unwrapCdata(nameMatch[1].trim()) : rawAuthor)
      
      if (title) {
        articles.push({
          title,
          link,
          pubDate: parseDate(pubDate),
          contentSnippet: stripHtml(summary),
          author: author || undefined,
        })
      }
    }
  }
  
  return articles
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { url } = body
    
    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      )
    }
    
    if (!isValidUrl(url)) {
      return NextResponse.json(
        { error: 'Invalid URL provided' },
        { status: 400 }
      )
    }
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)
    
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/rss+xml, application/xml, text/xml, application/atom+xml',
        'User-Agent': 'The Midnight Gazette RSS Reader',
      },
    })
    
    clearTimeout(timeoutId)
    
    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch RSS feed: ${response.status}` },
        { status: response.status }
      )
    }
    
    const xml = await response.text()
    
    if (!xml.includes('<rss') && !xml.includes('<feed') && !xml.includes('<rdf')) {
      return NextResponse.json(
        { error: 'Response does not appear to be a valid RSS/Atom feed' },
        { status: 400 }
      )
    }
    
    const articles = parseRSS(xml)
    
    if (articles.length === 0) {
      return NextResponse.json(
        { error: 'No articles found in the feed' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ articles })
    
  } catch (error) {
    console.error('RSS fetch error:', error)
    
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Request timed out' },
        { status: 408 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch and parse RSS feed' },
      { status: 500 }
    )
  }
}