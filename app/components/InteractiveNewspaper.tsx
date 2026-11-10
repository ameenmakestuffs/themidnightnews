'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { box, line, render, FRAMES, ZS } from '../lib/iso/iso.js'

interface InteractiveNewspaperProps {
  onSelectSection?: (section: number) => void
  className?: string
}

const EDITIONS = [
  { label: 'Front Page', section: 1, headlineW: 86, cols: 3 },
  { label: 'AI & Code', section: 2, headlineW: 72, cols: 3 },
  { label: 'Ask HN', section: 3, headlineW: 94, cols: 2 },
  { label: 'Show HN', section: 4, headlineW: 78, cols: 3 },
  { label: 'RSS Wire', section: 1, headlineW: 90, cols: 3 },
]

const W = 128
const D = 92
const T = 2.6
const STEP = 5.5

function makeBroadsheetDecal(editionIndex: number): string {
  const ed = EDITIONS[editionIndex] || EDITIONS[0]
  const lines: string[] = [
    // Masthead double rule
    `<path d="M12 11H${W - 12}" stroke-width="0.65"/>`,
    `<path d="M12 14H${W - 12}" stroke-width="0.35"/>`,
    // Headline block
    `<path d="M12 22H${ed.headlineW}" stroke-width="0.9"/>`,
    `<path d="M12 27H${ed.headlineW - 18}" stroke-width="0.5"/>`,
    // Drop-cap mark
    `<rect x="12" y="34" width="10" height="10" rx="1"/>`,
  ]

  // Editorial columns
  const colCount = ed.cols
  const innerW = W - 24
  const colW = (innerW - (colCount - 1) * 8) / colCount

  for (let c = 0; c < colCount; c++) {
    const x0 = 12 + c * (colW + 8)
    if (c > 0) {
      // Hairline column divider
      lines.push(`<path d="M${x0 - 4} 34V${D - 12}" opacity="0.55"/>`)
    }
    const startY = c === 0 ? 49 : 35
    for (let y = startY; y <= D - 14; y += 5) {
      const startX = c === 0 && y < 46 ? x0 + 13 : x0
      const w = y === D - 14 ? colW * 0.65 : colW
      lines.push(`<path d="M${startX} ${y}H${x0 + w}" opacity="0.7"/>`)
    }
  }

  return lines.join('')
}

export default function InteractiveNewspaper({
  onSelectSection,
  className = '',
}: InteractiveNewspaperProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [turnedCount, setTurnedCount] = useState(0) // 0..4 pages turned aside
  const [direction, setDirection] = useState<1 | -1>(1)
  const [isHovered, setIsHovered] = useState(false)

  const totalPages = EDITIONS.length

  const svgMarkup = useMemo(() => {
    const objects = [
      // Base press plinth
      box({
        at: [-4, -4, 0],
        size: [W + 8, D + 8, 4],
        radius: 4,
        bevel: 1.2,
        tone: { edge: 'lo', crease: 'faint', base: 'faint' },
      }),
      // Dotted alignment guides
      ...[
        [0, D],
        [W, 0],
        [W, D],
      ].map(([x, y]) =>
        line({
          points: [
            [x, y, 4],
            [x, y, 10 + (totalPages - 1) * STEP],
          ],
          dash: true,
          tone: 'faint',
        })
      ),
      // Stacked newspaper sheets (0 = bottom, 4 = top)
      ...Array.from({ length: totalPages }, (_, i) => {
        const isTop = i === totalPages - 1
        return box({
          item: i,
          at: [0, 0, 10 + i * STEP],
          size: [W, D, T],
          radius: 3,
          fog: isTop ? 6 : undefined,
          tone: {
            edge: isTop ? 'hi' : 'mid',
            crease: 'lo',
            base: 'faint',
          },
          decals: [{ face: '+z', svg: makeBroadsheetDecal(totalPages - 1 - i) }],
          grid: isTop
            ? {
                face: '+z',
                n: 3,
                gap: 4.5,
                r: 0.9,
                at: [W - 26, 20],
                frames: FRAMES.scan(5),
                interval: 180,
                once: false,
              }
            : undefined,
        })
      }),
    ]

    return render({
      objects,
      theme: 'light',
      pad: 52,
      stroke: 0.5,
      uid: 'iso-gazette',
      title: 'Interactive Isometric Broadsheet Newspaper',
      playOnHover: true,
    })
  }, [totalPages])

  // Apply back-and-forth page flip + hover fan transforms directly to .iso-obj[data-item]
  useEffect(() => {
    const svg = containerRef.current?.querySelector('svg')
    if (!svg) return

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const items = Array.from(svg.querySelectorAll<SVGGElement>('[data-item]')).sort(
      (a, b) => Number(a.dataset.item) - Number(b.dataset.item)
    )

    items.forEach((el, idx) => {
      // Top sheet is index = totalPages - 1; pageOrder 0 is top, 4 is bottom
      const pageOrder = totalPages - 1 - idx
      const isTurned = pageOrder < turnedCount

      if (reducedMotion) {
        el.style.transition = 'none'
      } else {
        el.style.transition =
          'transform 0.68s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.45s ease'
      }

      if (isTurned) {
        // Slide turned pages cleanly to the left-back (-x, +y isometric) so the page beneath is revealed
        const stackOffset = (turnedCount - pageOrder) * 5
        const dx = -54 - stackOffset * 1.4
        const dy = 24 - stackOffset * 0.4 - idx * 1.5
        el.style.setProperty('--lift-delay', `${pageOrder * 0.035}s`)
        el.style.transform = `translate(${dx}px, ${dy}px)`
        el.style.opacity = '0.78'
      } else if (isHovered) {
        // Fan remaining sheets upward and forward toward the reader
        const remainingIdx = idx
        const dz = (remainingIdx + 1) * 3.8
        const dy = (totalPages - 1 - pageOrder) * 2.2
        el.style.setProperty('--lift-delay', `${pageOrder * 0.04}s`)
        el.style.transform = `translate(${dy * 0.6}px, ${-dz * ZS}px)`
        el.style.opacity = '1'
      } else {
        el.style.setProperty('--lift-delay', `${pageOrder * 0.03}s`)
        el.style.transform = 'translate(0px, 0px)'
        el.style.opacity = '1'
      }
    })
  }, [turnedCount, isHovered, totalPages])

  // Click on the newspaper flips pages back and forth automatically
  const handleNewspaperClick = () => {
    setTurnedCount((prev) => {
      if (direction === 1) {
        if (prev >= totalPages - 1) {
          setDirection(-1)
          return prev - 1
        }
        return prev + 1
      } else {
        if (prev <= 0) {
          setDirection(1)
          return prev + 1
        }
        return prev - 1
      }
    })
  }

  const stepPage = (delta: -1 | 1) => {
    setTurnedCount((prev) => Math.max(0, Math.min(totalPages - 1, prev + delta)))
    setDirection(delta)
  }

  const activeEdition = EDITIONS[turnedCount] || EDITIONS[0]

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div
        ref={containerRef}
        onClick={handleNewspaperClick}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleNewspaperClick()
          } else if (e.key === 'ArrowRight') {
            stepPage(1)
          } else if (e.key === 'ArrowLeft') {
            stepPage(-1)
          }
        }}
        aria-label={`Interactive newspaper stack — ${activeEdition.label}, page ${turnedCount + 1} of ${totalPages}. Click to turn pages back and forth.`}
        className="
          iso-gazette-wrap relative w-full max-w-[440px] cursor-pointer select-none
          focus-visible:outline-none
        "
        dangerouslySetInnerHTML={{ __html: svgMarkup }}
      />

      {/* Interactive page-turn controls */}
      <div className="mt-2 flex flex-wrap items-center justify-center gap-3 font-geist text-[11px] text-[var(--muted)]">
        <button
          type="button"
          onClick={() => stepPage(-1)}
          disabled={turnedCount === 0}
          className="px-2 py-1 border border-[var(--border)] rounded-sm hover:text-[var(--fg)] hover:border-[var(--rule)] disabled:opacity-35 disabled:cursor-not-allowed transition-colors"
          aria-label="Turn page back"
        >
          ← Prev Page
        </button>

        <button
          type="button"
          onClick={() => onSelectSection?.(activeEdition.section)}
          className="px-2.5 py-1 bg-[var(--surface-step)] rounded-sm text-[var(--fg)] hover:text-[var(--accent)] transition-colors"
          title="Open this edition inside the Gazette"
        >
          P.{turnedCount + 1}/{totalPages} · {activeEdition.label}
        </button>

        <button
          type="button"
          onClick={() => stepPage(1)}
          disabled={turnedCount === totalPages - 1}
          className="px-2 py-1 border border-[var(--border)] rounded-sm hover:text-[var(--fg)] hover:border-[var(--rule)] disabled:opacity-35 disabled:cursor-not-allowed transition-colors"
          aria-label="Turn next page"
        >
          Next Page →
        </button>
      </div>

      <p className="mt-2 font-geist text-[10px] text-[var(--muted)] tracking-wide">
        Hover to fan broadsheet • Click newspaper to turn pages back &amp; forth
      </p>
    </div>
  )
}

