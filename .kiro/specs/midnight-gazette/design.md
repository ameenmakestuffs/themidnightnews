# The Midnight Gazette — Design Specification

## Typography System

### Font Stack (via next/font/google)

**Newsreader** (Masthead, Headlines, Pull Quotes, Drop Caps)
- Weights: 400 (normal), 400i (italic), 700 (bold)
- Use for: Masthead, H1/H2 headlines, drop caps, pull quotes

**Inter** (Body Text)
- Weight: 460 (medium-normal)
- Letter-spacing: `-0.08px` (subtle tight)
- Line-height: `1.6` (crisp, readable)
- Use for: All body paragraphs, story summaries

**Geist_Mono** (Metadata, Timestamps, Keyboard Hints)
- Use for: Issue numbers, domain tags, timestamps, keyboard shortcut hints
- Also: Section labels, bylines, comment counts

## Color Tokens

### Morning Paper (Default)
| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `rgb(253, 253, 252)` | Page background |
| `--fg` | `rgb(38, 36, 31)` | Primary text |
| `--muted` | `rgb(122, 116, 106)` | Secondary text, metadata |
| `--border` | `rgb(230, 228, 223)` | Hairline column rules |
| `--rule` | `rgb(179, 173, 162)` | Dividers, section rules |

### Midnight Edition (Kiroween Spooky)
| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#0f0e0d` | Page background (near-black warm) |
| `--fg` | `#edeae3` | Primary text (warm white) |
| `--muted` | `#969084` | Secondary text |
| `--border` | `#252320` | Hairline rules (dark) |
| `--rule` | `#3a3631` | Dividers |
| `--accent` | `#c84b31` | Solid accent (no neon glows) |

## Layout Specifications

### Masthead (Height: 120px desktop, 80px mobile)
- Full-width, centered content max-width: 1200px
- Top row: Date (left), Issue # (center), Theme toggle (right)
- Bottom row: Masthead title + SVG press icon
- RSS input bar below masthead

### Lead Story Section
- 2-column asymmetric: 60% left, 40% right
- Gap: 24px (hairline column rule in between)
- Drop cap: 3-line height, Newsreader italic, --fg color

### Broadsheet Grid
- 3-column desktop, 2-column tablet, 1-column mobile
- Column gap: 24px
- Vertical hairline rules between columns
- Story cards: no border, whitespace separation

### Reader Drawer
- Slides up from bottom (mobile) / centered modal (desktop)
- Max-width: 800px
- Soft shadow: `0 25px 50px -12px rgba(0,0,0,0.25)`
- Backdrop: semi-transparent overlay

## Component Specifications

### BlurWords Component
- Animation: `wordBlurIn`
- Duration: 0.62s
- Timing: `cubic-bezier(0.22, 0.61, 0.36, 1)`
- Effect: `filter: blur(5px) translateY(4px)` → clear
- Applied to: Masthead text, Lead Story headline

### workIn Animation
- Staggered blur-fade for columns
- Duration: 0.62s
- Timing: same cubic-bezier
- Delay: 0.1s between columns

### VectorDivider Component
- Full-width SVG hairline
- `stroke-dashoffset` draw-in animation
- Subtle traveling pulse effect
- `vectorEffect="non-scaling-stroke"`
- Used between major sections

### Paper Grain Texture
- Fixed pseudo-element with SVG fractalNoise
- `opacity: 0.14`
- `mix-blend-mode: overlay`
- `pointer-events: none`

### NewspaperPress Isometric SVG
- 2:1 aspect ratio
- Stacked broadsheet sheets / printing plates
- Fill: `var(--bg)` for occlusion
- Stroke: `--fg` at 0.5px hierarchy
- Creases: `--rule` color
- Bevel lip: `--border` color
- Hover: stack-lift motion `cubic-bezier(.32,.72,0,1)`

## Borderless UI Discipline

### DO
- Separate stories with whitespace
- Use surface elevation steps (`bg-[var(--bg)]` vs `bg-[color-mix(in_srgb,var(--bg),#000_2%)]`)
- 1px hairline column/row rules where guiding the eye
- Solid controls (toggle, buttons) on quiet tracks
- Reader Drawer gets soft shadow

### DON'T
- Boxed cards with 1px outlines
- Drop shadows on everything
- Rounded corners > 4px
- Gradients or neon glows
- Overly decorative elements

## Responsive Breakpoints
- Mobile: < 640px (1 column)
- Tablet: 640px - 1024px (2 columns)
- Desktop: > 1024px (3 columns)

## Animation Respect
- Always respect `prefers-reduced-motion: reduce`
- Disable all animations when true
- Instant transitions only