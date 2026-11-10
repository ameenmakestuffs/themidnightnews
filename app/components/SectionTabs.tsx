'use client'

import { getSectionName } from '../lib/hackernews'

interface SectionTabsProps {
  activeSection: number
  onSectionChange: (section: number) => void
}

const sections = [
  { key: 1, label: 'Top Stories', shortcut: '1' },
  { key: 2, label: 'AI & Code', shortcut: '2' },
  { key: 3, label: 'Ask HN', shortcut: '3' },
  { key: 4, label: 'Show HN', shortcut: '4' },
]

export default function SectionTabs({ activeSection, onSectionChange }: SectionTabsProps) {
  return (
    <nav className="flex flex-wrap gap-1 font-geist text-xs" aria-label="Story sections">
      {sections.map((section) => (
        <button
          key={section.key}
          onClick={() => onSectionChange(section.key)}
          className={`
            px-3 py-2 rounded-sm transition-all duration-200
            flex items-center gap-2
            ${
              activeSection === section.key
                ? 'bg-[var(--fg)] text-[var(--bg)]'
                : 'text-[var(--muted)] hover:text-[var(--fg)] hover:bg-[var(--surface-step)]'
            }
          `}
          aria-current={activeSection === section.key ? 'page' : undefined}
        >
          <span>{section.label}</span>
          <kbd className={`
            px-1.5 py-0.5 rounded text-[9px]
            ${
              activeSection === section.key
                ? 'bg-[var(--bg)] text-[var(--fg)]'
                : 'bg-[var(--surface-step)]'
            }
          `}>
            {section.shortcut}
          </kbd>
        </button>
      ))}
    </nav>
  )
}