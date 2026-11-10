'use client'

import { formatDate, generateIssueNumber } from '../lib/hackernews'
import ThemeToggle from './ThemeToggle'
import BlurWords from './BlurWords'
import VectorDivider from './VectorDivider'
import InteractiveNewspaper from './InteractiveNewspaper'

interface HeroSectionProps {
  isDark: boolean
  onThemeToggle: () => void
  onExplore: (opts?: { section?: number; focusRss?: boolean }) => void
}

const EDITION_SECTIONS = [
  {
    num: '01',
    kicker: 'LIVE DISPATCH',
    title: 'Front Page & AI Wire',
    description:
      'Top Hacker News front-page stories and curated AI & Code dispatches typeset into a classic three-column broadsheet.',
    cta: 'Open Front Page →',
    action: { section: 1 },
  },
  {
    num: '02',
    kicker: 'GOOGLE READER REVIVED',
    title: 'Dead RSS Feeds Resurrected',
    description:
      'Paste any RSS or Atom feed URL—or load curated tech blogs in one click—to print raw XML feeds into readable newspaper columns.',
    cta: 'Load an RSS Feed →',
    action: { focusRss: true },
  },
  {
    num: '03',
    kicker: 'LETTERS & COMMUNITY',
    title: 'Ask HN, Show HN & Drawer',
    description:
      'Click any headline to open the Reader Drawer with top comments formatted as Letters to the Editor. Press M anytime for Midnight.',
    cta: 'Browse Show HN →',
    action: { section: 4 },
  },
]

export default function HeroSection({
  isDark,
  onThemeToggle,
  onExplore,
}: HeroSectionProps) {
  const today = new Date()
  const formattedDate = formatDate(today)
  const issueNumber = generateIssueNumber(today)

  return (
    <div className="min-h-screen bg-[var(--bg)] animate-[workIn_0.5s_ease-out]">
      {/* Top Edition Masthead Bar */}
      <header className="w-full border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 font-geist text-xs text-[var(--muted)]">
            <time>{formattedDate}</time>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">
              Vol. I · Issue <span className="text-[var(--fg)]">#{issueNumber}</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onExplore({ section: 1 })}
              className="font-geist text-xs uppercase tracking-wider text-[var(--muted)] hover:text-[var(--fg)] transition-colors px-2 py-1"
            >
              Skip to Reader →
            </button>
            <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
          </div>
        </div>

        {/* Classic Double-Rule Newspaper Nameplate Strip */}
        <div className="max-w-6xl mx-auto px-4 pt-5 pb-4 text-center border-t border-[var(--border)]">
          <p className="font-geist text-[10px] uppercase tracking-[0.25em] text-[var(--accent)] mb-2">
            Kiroween 2026 · Resurrection Track
          </p>
          <h1 className="font-newsreader text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--fg)]">
            THE MIDNIGHT GAZETTE
          </h1>
          <div className="mt-4 border-t border-b border-[var(--rule)] py-1.5 flex flex-wrap items-center justify-between gap-2 font-geist text-[10px] uppercase tracking-widest text-[var(--muted)]">
            <span>Est. 2026 · Digital Broadsheet</span>
            <span>Morning Paper &amp; Midnight Edition</span>
            <span>Price: Free · Open Web RSS</span>
          </div>
        </div>
      </header>

      {/* Hero Split */}
      <section className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left: Editorial Hero Copy & Explore CTA */}
          <div className="lg:col-span-6 lg:pr-8 lg:border-r lg:border-[var(--border)]">
            <div className="font-geist text-[11px] uppercase tracking-widest text-[var(--muted)] mb-3">
              Special Resurrection Edition
            </div>

            <h2 className="font-newsreader text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--fg)] leading-[1.1] mb-6">
              <BlurWords text="Printed broadsheets & dead RSS, brought back to life." />
            </h2>

            <p className="font-inter text-base text-[var(--muted)] leading-relaxed mb-8 clearfix">
              <span className="drop-cap">B</span>
              efore algorithmic feeds buried the open web, readers gathered around
              two timeless rituals: the morning broadsheet and Google Reader.
              The Midnight Gazette resurrects both—turning live tech dispatches and
              any RSS feed into crisp, distraction-free columns.
            </p>

            {/* Primary Explore CTA + Secondary RSS Action */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onExplore({ section: 1 })}
                className="
                  px-6 py-3 rounded-sm font-geist text-xs uppercase tracking-wider
                  bg-[var(--fg)] text-[var(--bg)]
                  hover:bg-[var(--accent)] hover:text-[#fdfdfc]
                  transition-colors duration-200
                "
              >
                Explore the Gazette →
              </button>

              <button
                type="button"
                onClick={() => onExplore({ focusRss: true })}
                className="
                  px-5 py-3 rounded-sm font-geist text-xs uppercase tracking-wider
                  border border-[var(--rule)] text-[var(--fg)]
                  hover:border-[var(--fg)] hover:bg-[var(--surface-step)]
                  transition-colors duration-200
                "
              >
                Revive an RSS Feed
              </button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-geist text-[11px] text-[var(--muted)]">
              <span>
                <kbd className="px-1.5 py-0.5 bg-[var(--surface-step)] rounded-sm text-[var(--fg)]">1–4</kbd>{' '}
                Sections
              </span>
              <span>
                <kbd className="px-1.5 py-0.5 bg-[var(--surface-step)] rounded-sm text-[var(--fg)]">/</kbd>{' '}
                RSS Wire
              </span>
              <span>
                <kbd className="px-1.5 py-0.5 bg-[var(--surface-step)] rounded-sm text-[var(--fg)]">M</kbd>{' '}
                Morning / Midnight
              </span>
            </div>
          </div>

          {/* Right: Interactive Isometric Newspaper Vector */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <InteractiveNewspaper
              onSelectSection={(sec) => onExplore({ section: sec })}
            />
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4">
        <VectorDivider className="my-2" />
      </div>

      {/* Important Sections Index (Portfolio-style 3-column broadsheet index) */}
      <section className="max-w-6xl mx-auto px-4 py-10 md:py-12">
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6 pb-3 border-b border-[var(--border)]">
          <h3 className="font-geist text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
            Inside Today&apos;s Edition — Key Sections
          </h3>
          <span className="font-geist text-[11px] text-[var(--muted)]">
            Select any column to jump directly inside
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EDITION_SECTIONS.map((item, idx) => (
            <button
              key={item.num}
              type="button"
              onClick={() => onExplore(item.action)}
              className={`
                group text-left py-4 px-3 rounded-sm
                hover:bg-[var(--surface-step)] transition-colors duration-200
                flex flex-col justify-between
                ${idx < 2 ? 'md:border-r md:border-[var(--border)] md:pr-6' : ''}
              `}
            >
              <div>
                <div className="flex items-center justify-between font-geist text-[10px] uppercase tracking-widest text-[var(--muted)] mb-2">
                  <span>{item.kicker}</span>
                  <span className="text-[var(--fg)]">{item.num}</span>
                </div>
                <h4 className="font-newsreader text-xl font-bold text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors mb-2">
                  {item.title}
                </h4>
                <p className="font-inter text-sm text-[var(--muted)] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <span className="mt-5 inline-flex items-center font-geist text-xs text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
                {item.cta}
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

