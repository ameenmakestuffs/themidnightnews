'use client'

import { useState, useRef, useEffect } from 'react'

interface RSSInputProps {
  onSubmit: (url: string, label?: string) => void
  isLoading?: boolean
  autoFocus?: boolean
}

const PRESET_FEEDS = [
  { label: 'Simon Willison', url: 'https://simonwillison.net/atom/everything/' },
  { label: 'Lobste.rs', url: 'https://lobste.rs/rss' },
  { label: 'Ars Technica', url: 'https://feeds.arstechnica.com/arstechnica/index' },
  { label: 'Rust Blog', url: 'https://blog.rust-lang.org/feed.xml' },
  { label: 'HN RSS', url: 'https://hnrss.org/frontpage' },
]

export default function RSSInput({
  onSubmit,
  isLoading = false,
  autoFocus = false,
}: RSSInputProps) {
  const [url, setUrl] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus()
    }
  }, [autoFocus])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        !isFocused &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isFocused])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url.trim()) {
      onSubmit(url.trim())
    }
  }

  return (
    <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div
          className={`
            relative flex items-center border rounded-sm transition-all duration-200
            ${isFocused ? 'border-[var(--accent)]' : 'border-[var(--border)]'}
          `}
        >
          <span className="font-geist text-xs text-[var(--muted)] pl-3 pr-2">
            RSS
          </span>
          <input
            ref={inputRef}
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Paste any RSS or Atom feed URL..."
            disabled={isLoading}
            className="
              flex-1 py-2 pr-3 bg-transparent text-sm font-inter
              placeholder:text-[var(--muted)]
              focus:outline-none disabled:opacity-50
            "
          />
          <button
            type="submit"
            disabled={isLoading || !url.trim()}
            className="
              px-3 py-2 font-geist text-xs uppercase tracking-wider
              border-l border-[var(--border)] text-[var(--muted)]
              hover:text-[var(--fg)] hover:bg-[var(--surface-step)]
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors duration-200
            "
          >
            {isLoading ? '...' : 'Load'}
          </button>
        </div>
        <p className="mt-1 font-geist text-[10px] text-[var(--muted)]">
          Press <kbd className="px-1 py-0.5 bg-[var(--surface-step)] rounded-sm">/</kbd> to focus
        </p>
      </form>

      {/* One-click resurrected RSS feeds */}
      <div className="flex flex-wrap items-center gap-1.5 font-geist text-[11px]">
        <span className="text-[var(--muted)] mr-1 uppercase tracking-wider text-[10px]">
          Sample Wires:
        </span>
        {PRESET_FEEDS.map((feed) => (
          <button
            key={feed.url}
            type="button"
            disabled={isLoading}
            onClick={() => {
              setUrl(feed.url)
              onSubmit(feed.url, feed.label)
            }}
            className="
              px-2.5 py-1 rounded-sm border border-[var(--border)]
              text-[var(--muted)] hover:text-[var(--fg)] hover:border-[var(--rule)]
              hover:bg-[var(--surface-step)] transition-colors
              disabled:opacity-50
            "
          >
            {feed.label}
          </button>
        ))}
      </div>
    </div>
  )
}
