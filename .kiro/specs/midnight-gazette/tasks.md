# The Midnight Gazette — Implementation Tasks

## Phase 1: Project Setup

- [x] Initialize Next.js project with TypeScript and Tailwind CSS
- [x] Configure `next/font/google` with Newsreader, Inter, JetBrains Mono
- [x] Set up Tailwind CSS with custom CSS variables for Morning & Midnight theming
- [x] Create global styles with paper grain texture (`.paper-grain` in `globals.css`)
- [x] Add animation keyframes (`BlurWords`, `workIn`, `VectorDivider`)

## Phase 2: Core & Vector Components

- [x] Build `ThemeToggle` component (Morning/Midnight segmented toggle)
- [x] Build `NewspaperPress` isometric SVG component
- [x] Build `InteractiveNewspaper` 2:1 isometric SVG stack with hover fan & click page-turning
- [x] Build `VectorDivider` animated SVG component
- [x] Build `BlurWords` text animation component

## Phase 3: Data Layer

- [x] Create Hacker News API utility functions (`app/lib/hackernews.ts`)
- [x] Build `POST /api/rss` route handler with RSS & Atom parsing, CDATA unwrapping, and validation
- [x] Add story/comment fetching with Next.js `revalidate` caching

## Phase 4: Cover Hero & Broadsheet Layout

- [x] Build `HeroSection` portfolio cover with Explore CTA and 3-column edition index
- [x] Build `Masthead` component with date, issue #, double-rule bar, title, press icon
- [x] Build `RSSInput` bar with one-click Sample Wires and `/` shortcut
- [x] Build `StoryCard` component (serif headline, snippet, metadata, domain)
- [x] Build `LeadStory` component (60/40 asymmetric split, vertical rule, drop-cap deck)
- [x] Build `BroadsheetGrid` component (3-column layout with hairline dividers)
- [x] Build `SectionTabs` component (`1–4` section switcher)

## Phase 5: Reader Drawer

- [x] Build `ReaderDrawer` modal component
- [x] Implement "Letters to the Editor" comment formatting
- [x] Add keyboard shortcuts (`Esc` to close) and backdrop click to close

## Phase 6: Main Page & Integration

- [x] Build `app/page.tsx` integrating Cover Hero and Broadsheet Reader views
- [x] Implement section switching (`1–4` keys), theme toggle (`M`), and RSS focus (`/`)
- [x] Verify `npx tsc --noEmit` and `pnpm run build` pass cleanly

## File Structure

```
app/
├── layout.tsx                      # Root layout with Google fonts + paper grain
├── page.tsx                        # Cover Hero & Gazette Reader orchestration
├── globals.css                     # Tailwind + CSS tokens + animations
├── api/
│   └── rss/
│       └── route.ts                # RSS & Atom feed parser route handler
├── components/
│   ├── HeroSection.tsx             # Portfolio cover + edition index
│   ├── InteractiveNewspaper.tsx    # Isometric SVG newspaper with page-turn motion
│   ├── ThemeToggle.tsx             # Morning / Midnight segmented toggle
│   ├── NewspaperPress.tsx          # Isometric press SVG
│   ├── VectorDivider.tsx           # Animated hairline divider
│   ├── BlurWords.tsx               # Staggered word blur-in
│   ├── Masthead.tsx                # Broadsheet masthead & double-rule bar
│   ├── RSSInput.tsx                # RSS input + 1-click Sample Wires
│   ├── StoryCard.tsx               # Column story headline + snippet
│   ├── LeadStory.tsx               # 60/40 hero dispatch with drop cap
│   ├── BroadsheetGrid.tsx          # 3-column broadsheet layout
│   ├── SectionTabs.tsx             # 1–4 section switcher
│   └── ReaderDrawer.tsx            # Modal reader + Letters to the Editor
└── lib/
    ├── hackernews.ts               # Hacker News Firebase API utilities
    └── iso/
        ├── iso.js                  # 2:1 isometric SVG engine
        ├── iso-motion.js           # Hover/spring motion helpers
        └── iso.d.ts                # TypeScript declarations
```
