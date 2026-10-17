# True Aim Website

## Project Context
The corporate website for True Aim, a Swiss AI company offering neuro-symbolic decisioning for insurance claims. It is live at https://trueaim.ai and must communicate enterprise credibility and regulatory compliance.

**Deployment, hosting and release rules live in `AGENTS.md`.** That file is the source of truth for how the site is built, served and shipped; do not restate any of it here.

## Tech Stack
- Next.js 16 (App Router), static export (`output: "export"`)
- React 19, TypeScript (strict mode)
- Tailwind CSS v4, with the design tokens in `src/app/globals.css`
- next-intl for i18n (locales: en, de, fr, it)
- Framer Motion for animations, Lucide React for icons where a brand icon does not exist
- No component library: `src/components/brand/` holds the house components (Logo, Button, BrandIcon, StatusPill, GlassBox, Glow, GridPattern)

## Design System
`docs/DESIGN_SYSTEM.md` is the source of truth for brand, colour, type, shape and component rules (True Aim Design System v4). Highlights:

- **Light is the only site theme.** `data-theme="light"` on `<html>`, and bare `:root` resolves to light. There is no theme switcher and no `prefers-color-scheme` handling. Dark is a per-section device: put `data-theme="dark"` on a band to render it dark inside the light page.
- One accent colour: True Aim Blue `#5151DB`.
- Headlines: `font-display font-bold` (`tracking-tight` is banned).
- Body: `text-body leading-[1.6]`.
- Pills (`rounded-pill`, r40) for filled containers; sections and images are square-cornered; cards have no borders (`bg-card shadow-card`).
- Section padding `py-24 px-6`, max width `max-w-7xl mx-auto`, card gaps `gap-6` or `gap-8`.

`docs/DESIGN_SYSTEM.md` §2.12 lists files only the integrator should edit (`globals.css`, the locale layout, Navigation, Footer, and `src/components/brand/`).

## Repository Layout
```
src/
├── app/
│   ├── [locale]/          all pages; every locale is prefixed (/en/, /de/, ...), trailing slashes on
│   ├── globals.css        design tokens and theme blocks
│   ├── not-found.tsx      built to out/404.html, served for every unmatched path
│   └── feed.xml/          (the sitemap is built from the export, see AGENTS.md)
├── components/            brand, calculator, contact, content, diagrams,
│                          layout, partners, products, sections, seo, ui
├── data/  i18n/  lib/
api/                       Static Web Apps managed Azure Function (contact form)
messages/{en,de,fr,it}/    all site copy, 12 JSON namespaces per locale
scripts/                   export, sitemap, HTML checks and deploy helpers; see AGENTS.md
tests/e2e/                 Playwright specs
docs/                      PRD, design system, review requirements
```

## Content and Copy
- **All copy lives in `messages/<locale>/*.json`** (caseStudies, claimEvalB, common, company, contact, home, impact, metadata, partners, products, technology, trust). English is the reference; de, fr and it are translations.
- **No dashes for rhythm**: avoid em-dashes (—), en-dashes (–) and spaced hyphens ( - ) for pauses or clause separation. Rewrite instead. Compound words ("real-time"), technical terms and URLs are fine.
- **The brand name in text is always True Aim (two words).**
- Copy is ICU-parsed by next-intl. An apostrophe immediately before a tag or brace (`l'<init>`) is read as an ICU escape and breaks the message; double it (`l''<init>`).

## Tracking and Consent
- Strict consent: nothing is requested from Google or HubSpot (no script, no preconnect) before the visitor accepts analytics cookies. Consent state and helpers live in `src/lib/consent.ts`.
- GTM loads from `NEXT_PUBLIC_GTM_ID` after consent; the contact form pushes `form_submit_success` (form_name, page_locale, heard_about) only after `/api/contact` answers 2xx. Never put personal data in the data layer.
- Page building blocks for Firon's templates (FAQ, summary, breadcrumbs, comparison table, related links, article meta, and their JSON-LD builders) live in `src/components/content/`.

## Quality Standards
- Lighthouse Performance > 90
- Mobile-first responsive
- WCAG 2.1 AA accessible
- No placeholder images; use gradients and the brand components

## Commands
- `npm run dev` — dev server (no contact API; that function lives in `api/`)
- `npm run build` — production build and static export into `out/`
- `npm run lint` — ESLint
- `npm test` — Vitest unit tests
- `npx playwright test` — E2E; the config starts `npm run dev` on :3000 and reuses anything already listening there, so point it at a built export by serving that on :3000 instead

See `AGENTS.md` for the full local check sequence, including the Static Web Apps emulator.

## Reference Files
- `docs/DESIGN_SYSTEM.md` — design system v4, the brand source of truth
- `tests/e2e/website-review-v7.spec.ts` — E2E suite for the latest website review requirements

This repository is public. The PRD, the website review documents and other internal working papers are kept in a private repository; do not add internal documents, customer material, local paths or personal settings here (`.claude/settings.local.json` is ignored).
