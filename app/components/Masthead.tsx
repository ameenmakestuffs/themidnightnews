'use client'

import { formatDate, generateIssueNumber } from '../lib/hackernews'
import ThemeToggle from './ThemeToggle'
import NewspaperPress from './NewspaperPress'
import BlurWords from './BlurWords'

interface MastheadProps {
  isDark: boolean
  onThemeToggle: () => void
  onBackToCover?: () => void
}

export default function Masthead({
  isDark,
  onThemeToggle,
  onBackToCover,
}: MastheadProps) {
  const today = new Date()
  const formattedDate = formatDate(today)
  const issueNumber = generateIssueNumber(today)

  return (
    <header className="w-full">
      {/* Top utility bar: Back to Cover, Date, Issue, Theme */}
      <div className="border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            {onBackToCover && (
              <button
                type="button"
                onClick={onBackToCover}
                className="font-geist text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              >
                ← Front Cover
              </button>
            )}
            <time className="font-geist text-xs text-[var(--muted)]">
              {formattedDate}
            </time>
          </div>

          <div className="font-geist text-xs text-[var(--muted)]">
            Vol. I · Issue <span className="text-[var(--fg)]">#{issueNumber}</span>
          </div>

          <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
        </div>
      </div>

      {/* Main broadsheet masthead */}
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-4">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-32 md:w-44 flex-shrink-0 hidden md:block">
            <NewspaperPress />
          </div>

          <div className="flex-1 text-center">
            <BlurWords
              text="THE MIDNIGHT GAZETTE"
              as="h1"
              className="font-newsreader text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--fg)]"
              delay={0}
            />
            <p className="font-geist text-[10px] text-[var(--muted)] mt-2 uppercase tracking-[0.22em]">
              Kiroween 2026 — Resurrection Edition
            </p>
          </div>

          <div className="w-24 flex-shrink-0 md:hidden">
            <NewspaperPress />
          </div>
        </div>

        {/* Classic broadsheet double-rule edition bar */}
        <div className="mt-5 border-t-2 border-b border-[var(--rule)] py-1.5 flex flex-wrap items-center justify-between gap-2 font-geist text-[10px] uppercase tracking-widest text-[var(--muted)]">
          <span>Digital Broadsheet · Tech &amp; AI Wire</span>
          <span>{isDark ? 'Midnight Edition' : 'Morning Paper'}</span>
          <span>Live HN + Open RSS</span>
        </div>
      </div>
    </header>
  )
}
