---
name: Midnight Gazette Product Vision
description: Kiroween 2026 Resurrection track — classic printed broadsheet meets Google Reader
inclusion: auto
---

# The Midnight Gazette — Product Vision

## Resurrection Theme

**The Midnight Gazette** resurrects the golden age of printed broadsheet journalism into a modern, fast tech & AI reader. Like a newspaper press coming back to life at midnight, we blend the tactile gravitas of 19th-century broadsheets with the instant refresh of modern RSS reading.

The "Resurrection" concept means:
- **Revival**: Taking the print newspaper metaphor and breathing new digital life into it
- **Noir Aesthetic**: The "Midnight Edition" toggle transforms from warm Morning Paper to spooky darkness
- **Reader Revival**: Google Reader's clean content consumption, but as editorial experience

## Borderless Editorial Design Rules

1. **No boxed cards** — Stories flow as continuous editorial columns
2. **Whitespace separation** — Use negative space and surface elevation (`step-1`) instead of borders
3. **Hairline rules only** — 1px vertical column dividers where eyes need guidance across dense text
4. **Modal discipline** — Only the Reader Drawer gets a soft shadow; everything else is flat
5. **Typography hierarchy** — Newsreader for drama, Inter for readability, Geist_Mono for metadata

## Tech Stack

- **Framework**: Next.js 14+ (App Router, TypeScript)
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Fonts**: next/font/google (Newsreader, Inter, Geist_Mono)
- **Data**: Hacker News Firebase API + custom RSS Route Handler
- **State**: React useState/useEffect with clean server/client fetching
- **Animations**: CSS keyframes with prefers-reduced-motion support

## Animation Philosophy

- **BlurWords**: Staggered blur-in on masthead and headlines for dramatic reveal
- **workIn**: Column-by-column blur-fade for the "printing press" effect
- **VectorDivider**: SVG rules with stroke-dashoffset draw-in + traveling pulse
- **Texture**: SVG fractalNoise grain overlay for that "ink on paper" feel