'use client'

import { useState, useEffect } from 'react'

interface ThemeToggleProps {
  isDark: boolean
  onToggle: () => void
}

export default function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="inline-flex items-center font-geist text-xs uppercase tracking-wider rounded-sm overflow-hidden border border-[var(--border)]"
      aria-label={`Switch to ${isDark ? 'Morning Paper' : 'Midnight Edition'} theme`}
    >
      <span
        className={`px-3 py-1.5 transition-colors duration-200 ${
          !isDark ? 'bg-[var(--fg)] text-[var(--bg)]' : 'text-[var(--muted)] hover:text-[var(--fg)]'
        }`}
      >
        Morning
      </span>
      <span
        className={`px-3 py-1.5 transition-colors duration-200 ${
          isDark ? 'bg-[var(--accent)] text-[var(--bg)]' : 'text-[var(--muted)] hover:text-[var(--fg)]'
        }`}
      >
        Midnight
      </span>
    </button>
  )
}