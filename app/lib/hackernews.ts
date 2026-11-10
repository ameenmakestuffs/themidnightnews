const HN_API_BASE = 'https://hacker-news.firebaseio.com/v0'

export interface HNStory {
  id: number
  title: string
  url?: string
  by: string
  time: number
  score: number
  descendants: number
  kids?: number[]
  type: string
  text?: string
}

export interface HNComment {
  id: number
  by: string
  text: string
  time: number
  kids?: number[]
  parent: number
  type: string
  deleted?: boolean
  dead?: boolean
}

type StoryEndpoint = 'topstories' | 'beststories' | 'askstories' | 'showstories'

const STORY_ENDPOINTS: Record<number, StoryEndpoint> = {
  1: 'topstories',
  2: 'beststories',
  3: 'askstories',
  4: 'showstories',
}

export function getStoryEndpoint(section: number): StoryEndpoint {
  return STORY_ENDPOINTS[section] || 'topstories'
}

export function getSectionName(section: number): string {
  const names: Record<number, string> = {
    1: 'Top Stories',
    2: 'AI & Code',
    3: 'Ask HN',
    4: 'Show HN',
  }
  return names[section] || 'Top Stories'
}

export async function fetchStoryIds(endpoint: StoryEndpoint): Promise<number[]> {
  const response = await fetch(`${HN_API_BASE}/${endpoint}.json`, {
    next: { revalidate: 60 },
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}`)
  }
  return response.json()
}

export async function fetchStory(id: number): Promise<HNStory | null> {
  const response = await fetch(`${HN_API_BASE}/item/${id}.json`, {
    next: { revalidate: 60 },
  })
  if (!response.ok) {
    return null
  }
  return response.json()
}

export async function fetchComment(id: number): Promise<HNComment | null> {
  const response = await fetch(`${HN_API_BASE}/item/${id}.json`, {
    next: { revalidate: 60 },
  })
  if (!response.ok) {
    return null
  }
  return response.json()
}

export async function fetchStories(
  endpoint: StoryEndpoint,
  limit: number = 30
): Promise<HNStory[]> {
  const ids = await fetchStoryIds(endpoint)
  const limitedIds = ids.slice(0, limit)
  
  const stories = await Promise.all(
    limitedIds.map(id => fetchStory(id))
  )
  
  return stories.filter((story): story is HNStory => story !== null)
}

export async function fetchTopComments(
  storyId: number,
  limit: number = 5
): Promise<HNComment[]> {
  const story = await fetchStory(storyId)
  if (!story || !story.kids) {
    return []
  }
  
  const topCommentIds = story.kids.slice(0, limit * 2)
  const comments = await Promise.all(
    topCommentIds.map(id => fetchComment(id))
  )
  
  return comments
    .filter((c): c is HNComment => c !== null && !c.deleted && !c.dead)
    .slice(0, limit)
}

export function formatTimeAgo(timestamp: number): string {
  const seconds = Math.floor(Date.now() / 1000 - timestamp)
  
  if (seconds < 60) {
    return 'just now'
  }
  
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) {
    return `${minutes}m ago`
  }
  
  const hours = Math.floor(minutes / 60)
  if (hours < 24) {
    return `${hours}h ago`
  }
  
  const days = Math.floor(hours / 24)
  if (days < 30) {
    return `${days}d ago`
  }
  
  const months = Math.floor(days / 30)
  return `${months}mo ago`
}

export function extractDomain(url?: string): string {
  if (!url) return ''
  
  try {
    const urlObj = new URL(url)
    let domain = urlObj.hostname.replace(/^www\./, '')
    return domain
  } catch {
    return ''
  }
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function generateIssueNumber(date: Date): number {
  const start = new Date('2026-01-01')
  const diff = date.getTime() - start.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  return 1000 + days
}