'use client'

import { useState, useEffect, useCallback } from 'react'
import { HNStory, getStoryEndpoint, fetchStories } from './lib/hackernews'
import HeroSection from './components/HeroSection'
import Masthead from './components/Masthead'
import RSSInput from './components/RSSInput'
import VectorDivider from './components/VectorDivider'
import SectionTabs from './components/SectionTabs'
import LeadStory from './components/LeadStory'
import BroadsheetGrid from './components/BroadsheetGrid'
import ReaderDrawer from './components/ReaderDrawer'

interface RSSArticle {
  title: string
  link: string
  pubDate: string
  contentSnippet: string
  author?: string
}

function convertRSStoStory(article: RSSArticle, index: number): HNStory {
  return {
    id: -1000 - index,
    title: article.title,
    url: article.link,
    by: article.author || 'Anonymous',
    time: Date.now() / 1000,
    score: 0,
    descendants: 0,
    type: 'story',
    text: article.contentSnippet,
  }
}

export default function Home() {
  const [view, setView] = useState<'cover' | 'reader'>('cover')
  const [focusRssOnEnter, setFocusRssOnEnter] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [activeSection, setActiveSection] = useState(1)
  const [activeFeedLabel, setActiveFeedLabel] = useState<string | null>(null)
  const [stories, setStories] = useState<HNStory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [rssLoading, setRssLoading] = useState(false)
  const [rssError, setRssError] = useState<string | null>(null)
  const [selectedStory, setSelectedStory] = useState<HNStory | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // Load HN stories when section changes
  const loadStories = useCallback(async (section: number) => {
    setIsLoading(true)
    setRssError(null)
    try {
      const endpoint = getStoryEndpoint(section)
      const fetchedStories = await fetchStories(endpoint, 30)
      setStories(fetchedStories)
    } catch (error) {
      console.error('Failed to fetch stories:', error)
      setStories([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Initial load
  useEffect(() => {
    if (!activeFeedLabel) {
      loadStories(activeSection)
    }
  }, [activeSection, activeFeedLabel, loadStories])

  // Handle theme toggle
  const handleThemeToggle = useCallback(() => {
    setIsDark((prev) => {
      const newValue = !prev
      if (newValue) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      return newValue
    })
  }, [])

  // Smoothly enter the Gazette reader from the Hero Cover
  const handleExplore = useCallback(
    (opts?: { section?: number; focusRss?: boolean }) => {
      if (opts?.section) {
        setActiveFeedLabel(null)
        setActiveSection(opts.section)
      }
      setFocusRssOnEnter(Boolean(opts?.focusRss))
      setView('reader')
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
    []
  )

  const handleSectionChange = useCallback((section: number) => {
    setActiveFeedLabel(null)
    setRssError(null)
    setActiveSection(section)
  }, [])

  // Handle RSS feed
  const handleRSSSubmit = useCallback(async (url: string, label?: string) => {
    setRssLoading(true)
    setRssError(null)
    try {
      const response = await fetch('/api/rss', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        const error = await response.json()
        setRssError(error.error || 'Failed to fetch RSS feed')
        return
      }

      const data = await response.json()
      const rssStories = data.articles.map((article: RSSArticle, index: number) =>
        convertRSStoStory(article, index)
      )
      let hostLabel = label
      if (!hostLabel) {
        try {
          hostLabel = new URL(url).hostname.replace(/^www\./, '')
        } catch {
          hostLabel = 'Custom RSS'
        }
      }
      setActiveFeedLabel(hostLabel)
      setStories(rssStories)
    } catch (error) {
      console.error('RSS fetch error:', error)
      setRssError('Failed to fetch RSS feed')
    } finally {
      setRssLoading(false)
    }
  }, [])

  // Handle story click
  const handleStoryClick = useCallback((story: HNStory) => {
    setSelectedStory(story)
    setIsDrawerOpen(true)
  }, [])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return
      }

      switch (e.key) {
        case '1':
          setView('reader')
          handleSectionChange(1)
          break
        case '2':
          setView('reader')
          handleSectionChange(2)
          break
        case '3':
          setView('reader')
          handleSectionChange(3)
          break
        case '4':
          setView('reader')
          handleSectionChange(4)
          break
        case 'm':
        case 'M':
          handleThemeToggle()
          break
        case '/':
          if (view === 'cover') {
            e.preventDefault()
            handleExplore({ focusRss: true })
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleThemeToggle, handleSectionChange, handleExplore, view])

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false)
  }, [])

  if (view === 'cover') {
    return (
      <HeroSection
        isDark={isDark}
        onThemeToggle={handleThemeToggle}
        onExplore={handleExplore}
      />
    )
  }

  const leadStory = stories[0]
  const gridStories = stories.slice(1)

  return (
    <div className="min-h-screen bg-[var(--bg)] animate-[workIn_0.45s_ease-out]">
      <Masthead
        isDark={isDark}
        onThemeToggle={handleThemeToggle}
        onBackToCover={() => setView('cover')}
      />

      {/* RSS Input + Sample Wires */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <RSSInput
          onSubmit={handleRSSSubmit}
          isLoading={rssLoading}
          autoFocus={focusRssOnEnter}
        />
        {rssError && (
          <p className="mt-2 font-geist text-xs text-[var(--accent)]">
            {rssError}
          </p>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <VectorDivider className="my-2" />
      </div>

      {/* Main Broadsheet Content */}
      <main className="max-w-6xl mx-auto px-4 pb-12 pt-4">
        {/* Section tabs + Active RSS indicator */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <SectionTabs
            activeSection={activeFeedLabel ? 0 : activeSection}
            onSectionChange={handleSectionChange}
          />

          {activeFeedLabel && (
            <div className="flex items-center gap-3 font-geist text-xs">
              <span className="px-2.5 py-1 bg-[var(--surface-step)] rounded-sm text-[var(--fg)]">
                RSS Wire: {activeFeedLabel}
              </span>
              <button
                type="button"
                onClick={() => handleSectionChange(activeSection)}
                className="text-[var(--accent)] hover:underline"
              >
                ← Back to Hacker News
              </button>
            </div>
          )}
        </div>

        {isLoading || rssLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="font-geist text-sm text-[var(--muted)]">
              Typesetting edition...
            </div>
          </div>
        ) : stories.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div className="font-inter text-sm text-[var(--muted)]">
              No stories found
            </div>
          </div>
        ) : (
          <>
            {leadStory && (
              <section className="mb-8">
                <LeadStory
                  story={leadStory}
                  onClick={() => handleStoryClick(leadStory)}
                />
              </section>
            )}

            <VectorDivider className="my-6" />

            {gridStories.length > 0 && (
              <section>
                <BroadsheetGrid
                  stories={gridStories}
                  onStoryClick={handleStoryClick}
                />
              </section>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-geist text-xs text-[var(--muted)]">
            <p>© 2026 The Midnight Gazette — Kiroween Resurrection</p>
            <div className="flex items-center gap-4">
              <span>
                Keyboard:{' '}
                <kbd className="px-1.5 py-0.5 bg-[var(--surface-step)] rounded-sm">1-4</kbd>{' '}
                sections{' '}
                <kbd className="px-1.5 py-0.5 bg-[var(--surface-step)] rounded-sm">M</kbd>{' '}
                theme{' '}
                <kbd className="px-1.5 py-0.5 bg-[var(--surface-step)] rounded-sm">/</kbd>{' '}
                RSS
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Reader Drawer */}
      <ReaderDrawer
        story={selectedStory}
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
      />
    </div>
  )
}
