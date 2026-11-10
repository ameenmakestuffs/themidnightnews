'use client'

import { HNStory, formatTimeAgo, extractDomain } from '../lib/hackernews'
import BlurWords from './BlurWords'

interface LeadStoryProps {
  story: HNStory
  onClick: () => void
}

function getLeadSummary(story: HNStory, domain: string): string {
  if (story.text) {
    let cleaned = story.text
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, ' ')
      .trim()

    // Avoid repeating the headline at the start of RSS summaries
    if (cleaned.toLowerCase().startsWith(story.title.toLowerCase())) {
      cleaned = cleaned.slice(story.title.length).replace(/^[\s:—–-]+/, '').trim()
    }
    if (cleaned.length > 0) return cleaned
  }

  const sourceLabel = domain ? `from ${domain}` : 'to the wire'
  const pointsPart = story.score > 0 ? `${story.score} points` : 'a fresh dispatch'
  const repliesPart =
    story.descendants > 0 ? ` and ${story.descendants} letters to the editor` : ''

  return `Filed ${sourceLabel} by ${story.by} — drawing ${pointsPart}${repliesPart} in today's edition. Open the dispatch to inspect the full text and reader correspondence.`
}

export default function LeadStory({ story, onClick }: LeadStoryProps) {
  const domain = extractDomain(story.url)
  const summary = getLeadSummary(story, domain)
  const firstLetter = summary.charAt(0)
  const restSummary = summary.slice(1)

  return (
    <article
      onClick={onClick}
      className="
        group cursor-pointer py-6 section-rule
        hover:bg-[var(--surface-step)]
        transition-colors duration-200 px-2 -mx-2 rounded-sm
      "
    >
      <div className="flex items-center justify-between font-geist text-[10px] uppercase tracking-[0.2em] text-[var(--accent)] mb-3">
        <span>Front Page · Lead Dispatch</span>
        {domain && <span className="text-[var(--muted)]">{domain}</span>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Left: 3 columns (60%) — Bold serif headline + Drop-cap editorial deck */}
        <div className="md:col-span-3 md:border-r md:border-[var(--border)] md:pr-8">
          <h2 className="font-newsreader text-3xl md:text-4xl font-bold text-[var(--fg)] leading-[1.12] group-hover:text-[var(--accent)] transition-colors duration-200">
            <BlurWords text={story.title} as="span" delay={0.05} />
          </h2>

          {summary && (
            <p className="mt-4 font-inter text-sm md:text-[15px] text-[var(--muted)] leading-relaxed line-clamp-4 clearfix">
              <span className="drop-cap">{firstLetter}</span>
              {restSummary}
            </p>
          )}
        </div>

        {/* Right: 2 columns (40%) — Dispatch metadata */}
        <div className="md:col-span-2 flex flex-col justify-between mt-2 md:mt-0 md:pl-2">
          <div className="font-geist text-xs text-[var(--muted)] space-y-2.5">
            <div className="pb-2 border-b border-[var(--border)] font-geist text-[10px] uppercase tracking-widest text-[var(--muted)]">
              Dispatch Filing Details
            </div>

            {story.score > 0 && (
              <div className="flex items-center gap-2">
                <span className="w-20">Score:</span>
                <span className="text-[var(--fg)] font-medium">{story.score} pts</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <span className="w-20">Byline:</span>
              <span className="text-[var(--fg)]">{story.by}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-20">Filed:</span>
              <span className="text-[var(--fg)]">{formatTimeAgo(story.time)}</span>
            </div>

            {domain && (
              <div className="flex items-center gap-2">
                <span className="w-20">Wire:</span>
                <span className="px-2 py-0.5 bg-[var(--surface-step)] rounded-sm text-[10px] text-[var(--fg)]">
                  {domain}
                </span>
              </div>
            )}

            {story.descendants > 0 && (
              <div className="flex items-center gap-2">
                <span className="w-20">Letters:</span>
                <span className="text-[var(--fg)]">{story.descendants} replies</span>
              </div>
            )}
          </div>

          <div className="mt-5 pt-3 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-3">
            <span className="font-geist text-xs text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
              Open Reader Drawer →
            </span>

            {story.url && (
              <a
                href={story.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="
                  inline-flex items-center gap-1.5 font-geist text-xs
                  text-[var(--muted)] hover:text-[var(--accent)]
                  transition-colors duration-200
                "
              >
                <span>Source</span>
                <span>↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
