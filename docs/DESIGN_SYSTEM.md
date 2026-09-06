# True Aim Design System — Website Implementation Brief (v4, September 2026)

**This file is the source of truth for brand, colour, type, shape and component rules on trueaim.ai.**
It supersedes `docs/PALETTE_OVERRIDE.md` (v3, retired) and `docs/BRAND_GUIDELINES.md` (old Ocean Blue brand).
Source design system: Claude Design project "True Aim Design System" (`33bc1289-6fcb-4b79-8ab8-0973dbeadb1d`),
which mirrors the Figma file `TrueAim_Brand_System.fig` and the August 2026 brand guidelines PDF.

Tokens live in `src/app/globals.css`. Brand assets live in `public/brand/`. Brand React components live in `src/components/brand/`.

---

## 1. Brand in one paragraph

True Aim automates insurance claim decisions, auditable by design. The brand metaphor is the **Glass Box**: a translucent
isometric cube whose inner logic is visible. "Not a black box. A glass box you can audit." Personality: clear, human,
confident, transparent, reassuring. Calm, declarative, regulatory-grade. Content-first, sparse, generous whitespace.

## 2. Hard rules (non-negotiable)

1. **Brand name in text is always `True Aim`** (two words, capital T and A). Never `TrueAim`, `TrueAIm`, `True AIm`, `trueaim`
   in visible copy. The wordmark image/SVG is the only exception. Legal entity is `True Aim AG`. Domain/URLs (`trueaim.ai`,
   emails, package names, code identifiers, file paths) stay as they are.
2. **Two fonts only.** Titles: `Inter Tight` (`font-display`). Everything else: `IBM Plex Sans` (`font-body`). No Inter, no
   Space Grotesk, no JetBrains Mono, no monospace for numbers. Numbers/KPIs are Inter Tight SemiBold with `tabular-nums`.
3. **One accent colour: True Aim Blue `#5151DB`.** Products (MIRA, ContextBuilder, ClaimEval) no longer have their own accent
   colours. Supporting highlight is Light Blue `#91A7FF`; atmospheric background is Soft Lilac `#F3EEFE`.
4. **Semantic colours (green/amber/red/violet) only as small indicators**: status pills, dots, icons, chart marks, form
   validation. Never as card backgrounds, section backgrounds, gradients or decorative blocks.
5. **Filled containers are pills: `rounded-pill` (40px).** KPI cards, feature cards, status pills, buttons, inputs with fill,
   image/icon plates. **Sections and images are square-cornered** (`rounded-none`). No `rounded-lg`, `rounded-xl`,
   `rounded-2xl`, `rounded-md` anywhere. Tiny chart bars may use 1px.
6. **Cards have no borders.** Card = `bg-card shadow-card rounded-pill`. Dividers are hairlines (`border-hairline`).
7. **No glassmorphism, no backdrop blur, no aurora blobs, no neon glows, no gradient text, no "shine" sweeps.** Delete
   `glass-panel*`, `backdrop-blur-*`, `card-glow`, `btn-shine`, `text-gradient`, `teal-glow-pulse`, `aurora-*`,
   `bg-gradient-to-*` colour washes, `shadow-[var(--primary)]/xx` glows. Atmosphere comes only from the brand components
   (`Glow`, `GridPattern`, `GlassBox`) and the page tint.
8. **Dark theme is the site default** (the design system's dark theme: Primary Dark `#2C2B2A` page, Deep Charcoal `#3F3F42`
   cards, Primary Light text, True Aim Blue fills, Light Blue `#91A7FF` for accent text and outlines, light logo). Heroes and
   bands use the dark gradient (`bg-page-tint`); nested `data-theme="dark"` bands step one level deeper. Light surfaces are
   opt-in per section with `data-theme="light"` (e.g. white plates behind third-party logos). Visitors can switch the whole
   site with the header `ThemeToggle` (persisted in `localStorage.theme`, applied before paint). Always use the semantic
   tokens so both themes stay correct; never hard-code `#0B0C15`, `#060B18`, navy or slate.
9. **No emoji, no exclamation marks, no unicode glyphs as icons.** No hand-drawn illustration, no noise, no stock photos.
10. **Motion is calm.** `ease-brand` (`cubic-bezier(.4,0,.2,1)`), 150–600ms, fades and slow translations. No springs,
    no bounces, no rotate-on-hover, no scale > 1.02, no infinite pulsing glows. Respect `prefers-reduced-motion`.
11. **Icons.** Prefer the 25 brand process icons via `<BrandIcon name="..." />` (40px grid, 1.5px stroke, one blue accent).
    Where a concept is not covered, keep `lucide-react` but always `strokeWidth={1.5}`, colour `text-body` or `text-accent`,
    never inside a coloured square; place it on a lilac pill plate (`bg-lilac rounded-pill`) if it needs a plate.
12. **Never edit** `src/app/globals.css`, `src/app/[locale]/layout.tsx`, `src/components/layout/Navigation.tsx`,
    `src/components/layout/Footer.tsx`, or anything in `src/components/brand/` unless you are the integrator. If you need a
    new token or utility, say so in your report.

## 3. Colour tokens

Use Tailwind utilities (preferred) or `var(--token)`. Both resolve through the same CSS variables and flip in dark bands.

| Purpose | Tailwind class | CSS var | Light (`data-theme="light"`) | Dark (site default) |
|---|---|---|---|---|
| Page background | `bg-page` / `bg-page-tint` | `--surface-page` / `--surface-page-tint` | `#FBFCFD` / 231° `#F6F3FF→#FBFCFD` | `#2C2B2A` / `#2C2B2A→#3F3F42` |
| Card surface | `bg-card` | `--surface-card` | `#FBFCFD` (+ `shadow-card`) | `#3F3F42` |
| Muted surface | `bg-surface-muted` | `--surface-muted` | `#EFEFF0` | `#4D4D51` |
| Lilac surface (atmosphere, icon plates) | `bg-lilac` | `--surface-lilac` | `#F3EEFE` | `rgba(243,238,254,.08)` |
| Brand-filled surface | `bg-accent` | `--accent` | `#5151DB` | `#5151DB` |
| Accent hover / active | `hover:bg-accent-hover` / `active:bg-accent-active` | `--accent-hover` / `--accent-active` | `#4441C1` / `#37379C` | `#6C76E8` / `#5151DB` |
| Accent soft (selected, tint) | `bg-accent-soft` | `--accent-soft` | `#E2EAFD` | `rgba(145,167,255,.14)` |
| Heading text | `text-strong` | `--text-strong` | `#2C2B2A` | `#FBFCFD` |
| Body text | `text-body` | `--text-body` | `#3F3F42` | `rgba(251,252,253,.82)` |
| Muted text | `text-muted` | `--text-muted` | `#696A71` | `rgba(251,252,253,.62)` |
| Subtle text (captions, chart labels) | `text-subtle` | `--text-subtle` | `#84858C` | `rgba(251,252,253,.45)` |
| Text on brand blue | `text-on-brand` | `--text-on-brand` | `#FFFFFF` | `#FFFFFF` |
| Link | `text-link` | `--text-link` | `#5151DB` | `#91A7FF` |
| Accent text | `text-accent` | `--accent` | `#5151DB` | `#91A7FF` (use `text-light-blue` on dark if needed) |
| Divider / hairline | `border-line` / `border-hairline` | `--border-subtle` / `--border-hairline` | `#E4E4E6` / `rgba(0,0,0,.11)` | `rgba(251,252,253,.10)` |
| Focus ring | `ring-focus` | `--focus-ring` | `#ABBCF6` | `#91A7FF` |
| Grid line | — | `--grid-line` | `#E2EAFD` | `rgba(145,167,255,.14)` |

Raw palette (do not use for large surfaces unless listed above): `ta-blue-50…900`, `ta-neutral-0…950`, `ta-dark`, `ta-charcoal`,
`ta-light`, `ta-light-blue`, `ta-lilac`. Blue scale: 50 `#EFF4FE`, 100 `#E2EAFD`, 200 `#CBD7FA`, 300 `#ABBCF6`, 400 `#91A7FF`,
500 `#6C76E8`, 600 `#5151DB` (base), 700 `#4441C1`, 800 `#37379C`, 900 `#33347C`. Neutral: 0 `#FFFFFF`, 50 `#FBFCFD`,
100 `#EFEFF0`, 200 `#E4E4E6`, 300 `#CFCFD2`, 400 `#ADAEB3`, 500 `#84858C`, 600 `#696A71`, 700 `#4D4D51`, 800 `#3F3F42`,
900 `#2C2B2A`, 950 `#222222`.

Semantic triads (light = status background, base = indicator/icon, dark = emphasis text):

| Status | light | base | dark | Tailwind |
|---|---|---|---|---|
| Approved / success | `#7EE791` | `#1BB037` | `#0E6A20` | `approved-light/base/dark` |
| Referred / warning | `#FFCF8B` | `#FFAA36` | `#D37F0D` | `referred-light/base/dark` |
| Denied / error | `#FF8264` | `#E94119` | `#A92100` | `denied-light/base/dark` |
| In progress | `#ABBCF6` | `#5151DB` | `#37379C` | `progress-light/base/dark` |
| Help | `#D79DFF` | `#AA57E1` | `#6C19A4` | `help-light/base/dark` |
| Neutral / disabled | `#CFCFD2` | `#84858C` | `#2C2B2A` | `neutral-status-light/base/dark` |

Outcome vocabulary is exactly **Approved / Referred / Denied**; process states **In progress / Disabled / Help**.

## 4. Typography

| Style | Tailwind | Spec |
|---|---|---|
| H1 hero | `font-display font-bold text-[54px] leading-none` (mobile `text-4xl`) | Inter Tight 700 54/100% (marketing hero); brand H1 is 600 88/110% for very large canvases |
| H2 section | `font-display font-bold text-4xl md:text-[48px] leading-[1.15]` | Inter Tight 700 48/115% |
| H3 | `font-display font-bold text-3xl md:text-[36px] leading-[1.2]` | Inter Tight 700 36/120% |
| H4 card title | `font-display font-semibold text-[28px] leading-[1.3] tracking-[0.01em]` | Inter Tight 600 28/130% +1% |
| Body large / lede | `font-body font-medium text-2xl leading-[1.4] tracking-[0.01em]` or `text-lede` (18/30) | IBM Plex Sans 500 24/140% |
| Body | `font-body text-base leading-[1.6]` (default on `body`) | IBM Plex Sans 400 16/160% |
| Caption / eyebrow | `text-caption` (uppercase, +16% tracking, 500) | IBM Plex Sans 500 16/140% +16% — use `text-sm` variant `text-caption-sm` for 12–14px eyebrows |
| Button | `text-button` | IBM Plex Sans 500 16/110% |
| KPI number | `text-kpi` | Inter Tight 600 36/100%, tabular |

Rules: sentence case for body and UI. Hero headlines may use Title Case. Headings have **no letter-spacing tightening**
(`tracking-tight` is banned; remove it). Body text is Deep Charcoal, headings Primary Dark. Line lengths ≈ 540–640px in heroes.

## 5. Shape, elevation, lines, spacing

- Radii: `rounded-pill` (40px) for filled containers; `rounded-none` for sections and images; `rounded-full` only for
  circular dots/avatars. Small sparkline bars `rounded-[1px]`.
- Shadows: `shadow-card` (`0 9px 14.7px rgba(0,0,0,.04)`) on cards; `shadow-swatch` (`0 4px 7px rgba(0,0,0,.10)`) on
  swatches/floating plates. Nothing else. No coloured shadows.
- Lines: hairline `border-hairline` (0.5px feel, `rgba(0,0,0,.11)`) for dividers and table rules; `border-line` (1px
  `#E4E4E6`) for stronger separation; structured grid 1px `#E2EAFD` at 48px pitch (`<GridPattern />`).
- Spacing scale: 4, 8, 12, 16, 24, 29, 40, 56, 80, 120. Sections `py-20 md:py-[120px]`, container `max-w-7xl mx-auto px-6`.
  Hero copy column ≈ 540px. Generous whitespace; fewer elements per screen.
- Card inner padding: `px-[29px] py-[27px]` (KPI cards) or `p-8`/`p-10` for content cards.

## 6. Components (`src/components/brand/`)

- `<Logo variant="horizontal-dark|horizontal-light|vertical-dark|vertical-light|wordmark-dark|wordmark-light|symbol-blue|symbol-dark|symbol-light|symbol-lightblue|symbol-lilac" height={n} />`
  Horizontal is the default lock-up; use `-light` variants on dark bands and blue surfaces. Never pair the wordmark with a blue
  symbol. Clear space = symbol height. Minimum widths: horizontal 120px, vertical 80px, symbol 24px (32px preferred).
- `<BrandIcon name="claim|classification|conditions|control|data|decision|document|extraction|human-review|ingestion|learning-loop|logic|mira|match|policy|process|processing|quality|rule-applied|rules|structure|structured-data|traceability|upload|workflow" size={40} color? />`
  Two-tone by default (charcoal stroke + blue accent). Pass `color` to flatten (e.g. `color="var(--text-on-dark)"` on dark bands).
- `<GlassBox size state="complete|emerging|open" glow />` dimensional cube; `<HexMark />` flat blue hexagon (structural).
- `<Glow variant="core|soft|rim" size />` violet radial glow discs; `<Sweep />` blue linear sweep.
- `<GridPattern step={48} isometric fade />` structured grid behind heroes (top-right, faded).
- `<StatusPill tone="approved|referred|denied|progress|help|neutral" emphasis="light|solid|dark">` semantic status label.
- `<Button variant="primary|secondary|ghost" size="md|lg" href|onClick>` pill buttons. Primary: blue fill, white text,
  `px-8 py-4`. Secondary: 1.5px True Aim Blue outline, blue text. Hover → Blue 700, active → Blue 800, focus ring Blue 300.
- `<Eyebrow>` caption-style label (uppercase, +16% tracking, `text-subtle`).

Product ↔ icon mapping: MIRA → `mira`; ContextBuilder → `extraction` (alt `structured-data`, `ingestion`); ClaimEval →
`quality` (alt `rule-applied`); Decision Dossier → `traceability`; Technology → `logic`, `rules`, `decision`; Security →
`control`; Human review → `human-review`; Learning loop → `learning-loop`.

## 7. Patterns

- **Page hero**: `bg-page-tint` section, `GridPattern` top-right (`absolute right-0 top-0 w-[746px] h-[700px]`), copy column
  left (eyebrow → H1 → lede → buttons), brand graphic right (`Glow` + `GlassBox` or a `public/brand/3d/*.png` render on
  marketing pages). Square corners, no card around the hero.
- **Feature/KPI card**: `bg-card shadow-card rounded-pill px-[29px] py-[27px]`, KPI in `text-kpi text-body`, label
  `text-muted`. Icon (if any) on a lilac pill plate: `w-14 h-14 rounded-pill bg-lilac grid place-items-center`.
- **Pipeline / process row**: 4 columns, `<BrandIcon size={96..120} />` above a `font-display font-medium text-[28px]` label.
- **Dark band** (CTA, footer, dark hero on product pages): `<section data-theme="dark" className="bg-page-tint text-body">`
  with `<Logo variant="horizontal-light" />` if a logo appears. Buttons stay blue-filled; secondary buttons use
  `border-light-blue text-light-blue`.
- **Status / outcome**: `<StatusPill tone="approved">Approved</StatusPill>`; never coloured card backgrounds.
- **Tables / legal pages**: hairline rules, `text-body`, headings Inter Tight, no zebra fills stronger than `bg-surface-muted`.
- **Forms**: underline text boxes are the brand primitive (hairline at rest, 2px `rgb(105,118,235)` when active). Filled
  inputs, where needed for accessibility, are `bg-neutral-0 border border-line rounded-pill px-6 py-3` with focus ring.
- **Links**: `text-link hover:underline`. No arrow-slide animations, no `group-hover:gap-3`.

## 8. Copy rules for this brand

British spelling is used in the brand source; the site uses US spelling today — keep the site consistent (US) and do not
mass-convert. No dashes for rhythm (see CLAUDE.md). We say: "Auditable by design", "Explainable by default", "Defensible from
day one", "Same inputs. Same decision. Every time.", "Not a black box. A glass box you can audit." We don't say:
revolutionary, game-changing, streamline, optimise/optimize, leverage. Tagline: **"Auditable by design."**

## 9. Assets

- `public/brand/logo/*.svg` — 11 logo files (horizontal/vertical × dark/light, wordmark × dark/light, symbol × blue/dark/light/lightblue/lilac).
- `public/brand/icons/*.svg` — 25 process icons.
- `public/brand/app-avatar.png` — 512px social avatar (blue plate, light symbol).
- `public/favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png` (blue symbol, transparent), `apple-touch-icon.png`, `android-chrome-*.png` (blue symbol on Soft Lilac), `site.webmanifest`.
- Open Graph card: generated at `/[locale]/opengraph-image` (brand-styled `ImageResponse`); product pages ship their own.
- Not vendored (binary exports exceed the design-sync transfer cap): the 9 photoreal 3D renders, the 4 Lottie loops and the static OG PNG. Pull them from the Claude Design project or Figma when needed; `GlassBox`/`Glow`/`GridPattern` cover the web use cases.
- Old assets removed: `public/images/logo.png`, `logo-full.png`, `owl-logo.png`, `wordmark.png`, `wordmark-dark.png`, the holographic owl.
