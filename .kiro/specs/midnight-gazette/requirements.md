# Requirements Document

## Introduction

**The Midnight Gazette** is a Next.js web application for the Kiroween 2026 Resurrection track that resurrects the classic printed broadsheet newspaper aesthetic combined with Google Reader's RSS functionality into a modern, fast tech & AI reader. The application fetches live stories from Hacker News and supports custom RSS feeds, presenting them in an elegant newspaper layout with two distinct themes: Morning Paper and Midnight Edition.

### Project Overview

- **Name**: The Midnight Gazette
- **Type**: Next.js Web Application (App Router, TypeScript, Tailwind CSS)
- **Core Functionality**: A broadsheet-style news reader that fetches stories from Hacker News and supports custom RSS feeds, presented in a classic newspaper aesthetic with modern digital interactivity.
- **Target Users**: Tech enthusiasts, developers, and readers who want a premium, editorial-style news consumption experience.

## Requirements

### FR-1: Data Fetching Requirements

#### FR-1.1: Hacker News Integration
- **FR-1.1.1**: System SHALL fetch stories from `https://hacker-news.firebaseio.com/v0/`
- **FR-1.1.2**: System SHALL support four story sections:
  1. **Top Stories**: `topstories` endpoint — Front page headlines
  2. **Best Stories**: `beststories` endpoint — AI & Code focused
  3. **Ask HN**: `askstories` endpoint — Ask & Show
  4. **Show HN**: `showstories` endpoint — Show & Ship
- **FR-1.1.3**: Each story fetch SHALL return: id, title, url, by, time, score, descendants, kids (top 5 comments)
- **FR-1.1.4**: System SHALL use server-side initial fetch with client-side revalidation (ISR-style)

#### FR-1.2: RSS Feed Reader
- **FR-1.2.1**: System SHALL provide a Route Handler at `POST /api/rss`
- **FR-1.2.2**: Route handler SHALL accept JSON body: `{ url: string }`
- **FR-1.2.3**: System SHALL validate URL, fetch XML, and parse feed content
- **FR-1.2.4**: System SHALL return cleaned articles with: title, link, pubDate, contentSnippet, author
- **FR-1.2.5**: System SHALL handle errors for invalid URLs, network failures, and malformed XML

### FR-2: Broadsheet Layout Requirements

#### FR-2.1: Masthead
- **FR-2.1.1**: System SHALL display full-width newspaper masthead with "THE MIDNIGHT GAZETTE" title
- **FR-2.1.2**: System SHALL show live formatted date (e.g., "Tuesday, November 10, 2026")
- **FR-2.1.3**: System SHALL display issue number (auto-incremented from date hash)
- **FR-2.1.4**: System SHALL include interactive NewspaperPress isometric SVG icon with hover lift animation
- **FR-2.1.5**: System SHALL provide Morning/Midnight Edition segmented toggle
- **FR-2.1.6**: System SHALL include RSS input bar with placeholder and focus states

#### FR-2.2: Lead Story Section
- **FR-2.2.1**: System SHALL display lead story in 2-column asymmetric split (60/40)
- **FR-2.2.2**: Left column SHALL show large headline and summary
- **FR-2.2.3**: Right column SHALL show secondary details and metadata
- **FR-2.2.4**: System SHALL render editorial drop cap on first letter
- **FR-2.2.5**: System SHALL open Reader Drawer on story click

#### FR-2.3: Broadsheet Grid
- **FR-2.3.1**: System SHALL display stories in 3-column layout on desktop
- **FR-2.3.2**: System SHALL render vertical hairline column rules between columns
- **FR-2.3.3**: Each story card SHALL display: headline, metadata (points, author, time ago), domain tag
- **FR-2.3.4**: Stories SHALL be sorted by score within each section
- **FR-2.3.5**: System SHALL collapse to single column on mobile devices

#### FR-2.4: Reader Drawer/Modal
- **FR-2.4.1**: System SHALL display borderless design with soft shadow on drawer
- **FR-2.4.2**: Drawer SHALL show: full headline, URL, domain, story text/excerpt
- **FR-2.4.3**: System SHALL format top 5 comments as "Letters to the Editor"
- **FR-2.4.4**: Drawer SHALL close with: Esc key, backdrop click, or close button

### FR-3: Keyboard Shortcuts
- **FR-3.1**: System SHALL support `1` key to switch to Top Stories
- **FR-3.2**: System SHALL support `2` key to switch to Best Stories (AI & Code)
- **FR-3.3**: System SHALL support `3` key to switch to Ask HN
- **FR-3.4**: System SHALL support `4` key to switch to Show HN
- **FR-3.5**: System SHALL support `M` key to toggle Morning/Midnight Edition
- **FR-3.6**: System SHALL support `/` key to focus headline filter / RSS search input
- **FR-3.7**: System SHALL support `Esc` key to close Reader Drawer/Modal

### FR-4: Theming

#### FR-4.1: Morning Paper (Default Theme)
- **FR-4.1.1**: System SHALL use color tokens:
  - `--bg: rgb(253, 253, 252)`
  - `--fg: rgb(38, 36, 31)`
  - `--muted: rgb(122, 116, 106)`
  - `--border: rgb(230, 228, 223)`
  - `--rule: rgb(179, 173, 162)`

#### FR-4.2: Midnight Edition Theme
- **FR-4.2.1**: System SHALL use color tokens:
  - `--bg: #0f0e0d`
  - `--fg: #edeae3`
  - `--muted: #969084`
  - `--border: #252320`
  - `--rule: #3a3631`
  - `--accent: #c84b31`

### NFR-1: Accessibility
- **NFR-1.1**: System SHALL respect `prefers-reduced-motion: reduce` preference
- **NFR-1.2**: System SHALL use semantic HTML throughout
- **NFR-1.3**: System SHALL support keyboard navigation for all interactive elements
- **NFR-1.4**: System SHALL provide screen reader friendly landmarks
- **NFR-1.5**: System SHALL maintain high contrast text in both themes

### NFR-2: Performance
- **NFR-2.1**: System SHALL use server components for initial data fetch
- **NFR-2.2**: System SHALL implement client-side caching with Next.js fetch
- **NFR-2.3**: System SHALL use SVG graphics only (no raster images)
- **NFR-2.4**: System SHALL minimize JavaScript bundle size
- **NFR-2.5**: System SHALL achieve fast LCP with font preloading

## Glossary

- **Broadsheet**: A large-format newspaper layout with multiple columns
- **Drop Cap**: An enlarged capital letter at the beginning of a paragraph
- **HN**: Hacker News, a social news website focusing on computer science and entrepreneurship
- **ISR**: Incremental Static Regeneration, a Next.js rendering strategy
- **LCP**: Largest Contentful Paint, a web performance metric
- **Masthead**: The title section at the top of a newspaper
- **RSS**: Really Simple Syndication, a web feed format for publishing frequently updated content
- **SVG**: Scalable Vector Graphics, an XML-based vector image format