'use client'

import { HNStory, formatTimeAgo, extractDomain } from '../lib/hackernews'

interface StoryCardProps {
  story: HNStory
  onClick: () => void
}

function cleanSnippet(text?: string, title?: string): string {
  if (!text) return ''
  let cleaned = text
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()

  if (title && cleaned.toLowerCase().startsWith(title.toLowerCase())) {
    cleaned = cleaned.slice(title.length).replace(/^[\s:—–-]+/, '').trim()
  }
  return cleaned
}

export default function StoryCard({ story, onClick }: StoryCardProps) {
  const domain = extractDomain(story.url)
  const snippet = cleanSnippet(story.text, story.title)

  return (
    <article
      onClick={onClick}
      className="
        group cursor-pointer py-4 border-b border-[var(--border)]
        hover:bg-[var(--surface-step)]
        transition-colors duration-200 px-1.5 -mx-1.5 rounded-sm
      "
    >
      {domain && (
        <div className="font-geist text-[9px] uppercase tracking-widest text-[var(--muted)] mb-1">
          {domain}
        </div>
      )}

      <h3 className="font-newsreader text-lg font-bold text-[var(--fg)] leading-snug group-hover:text-[var(--accent)] transition-colors duration-200">
        {story.title}
      </h3>

      {snippet && (
        <p className="mt-1.5 font-inter text-xs text-[var(--muted)] leading-relaxed line-clamp-2">
          {snippet}
        </p>
      )}

      <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-geist text-[10px] text-[var(--muted)]">
        {story.score > 0 && (
          <span className="flex items-center gap-1 text-[var(--fg)]">
            <span>▲</span>
            {story.score}
          </span>
        )}

        <span>by {story.by}</span>

        <span>{formatTimeAgo(story.time)}</span>

        {story.descendants > 0 && (
          <span className="text-[var(--muted)]">
            {story.descendants} letters
          </span>
        )}
      </div>
    </article>
  )
}
