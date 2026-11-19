# True Aim website: rules for every contributor and agent

These rules apply to everyone and every agent working in this repository. This
file is the single contract: it covers the code (stack, design system,
conventions) and how the site is built, served and shipped. `CLAUDE.md` only
imports it.

The site is a fully static Next.js export (`output: "export"`) on Azure Static
Web Apps. The contact form runs as a Static Web Apps managed Azure Function in
`api/`. The infrastructure is Terraform in a separate, private infrastructure
repository; nothing is configured by hand in the Azure portal.

## Project context
The corporate website for True Aim, a Swiss AI company offering neuro-symbolic decisioning for insurance claims. It is live at https://trueaim.ai and must communicate enterprise credibility and regulatory compliance.

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

See "Local checks" below for the full sequence, including the Static Web Apps emulator.

## Reference Files
- `docs/DESIGN_SYSTEM.md` — design system v4, the brand source of truth
- `tests/e2e/website-review-v7.spec.ts` — E2E suite for the latest website review requirements

This repository is public. The PRD, the website review documents and other internal working papers are kept in a private repository; do not add internal documents, customer material, local paths or personal settings here (`.claude/settings.local.json` is ignored).

## Layout

- `CONTEXT.md`: the glossary of product and site terms. Read it before you name a page, product, component or message key.
- `docs/adr/`: architecture decision records, `NNNN-the-decision-as-a-sentence.md`. Do not re-open a decision that an ADR records without a new ADR that supersedes it.
- `handoffs/`: session handoff notes as `YYYY-MM-DD-topic.md`. This repository is public, so a handoff holds no internal or customer material.

## Where things run

Workflow: `.github/workflows/deploy.yml`. Its first step prints which
environment the run will deploy to.

| Environment | URL | Azure resource (subscription) | What it shows |
|---|---|---|---|
| staging | https://staging.trueaim.ai (the site's `*.azurestaticapps.net` default hostname also works) | `trueaim-website-staging-web` in `trueaim-website-staging` (nonprod) | whatever was deployed last: the head of `main`, or any branch someone deployed manually |
| production | https://trueaim.ai (www.trueaim.ai and the site's `*.azurestaticapps.net` hostname answer a 301 to it) | `trueaim-website-production-web` in `trueaim-website-production` (prod) | the latest published release tag `vX.Y.Z` |

## Showing work to someone

1. **Anything shown to a colleague, a customer, or a partner is shown on
   staging.trueaim.ai.** Never from a laptop, never from a screenshot of a
   local build, never from a temporary host.
2. **Any branch can go to staging, and it does not have to be merged.** Open
   Actions, pick "Deploy static website", press "Run workflow", choose the
   branch. The run says in its first step where it will deploy.
3. **Staging has one slot.** Deploying a branch replaces what was there, and
   the next merge to `main` replaces it again. Say in the PR or in Slack
   which branch and commit you put on staging and for whom. If you need it
   back, run the workflow again.
4. **Every push to `main` deploys staging automatically**, so `main` is what
   staging shows unless someone deployed a branch since.
5. **Staging is never indexed.** The staging job adds `X-Robots-Tag: noindex,
   nofollow` to the exported `staticwebapp.config.json`
   (`scripts/staging-noindex.mjs`) after the shared build, and the production
   job refuses an export that carries that header, closes `robots.txt` or marks
   the home page noindex (`scripts/check-production-export.mjs`). Staging keeps
   an open `robots.txt` so crawlers can see the header.

## Releasing to production

6. **Production deploys only from a release tag.** release-please keeps a
   release PR open on `main`; merging it tags `vX.Y.Z`, publishes the
   release, and starts the production deployment. Do not merge the release
   PR before checking staging.
7. **Never deploy a branch or an arbitrary commit to production.** The
   workflow refuses anything that is not a `v*` tag. To redeploy an existing
   release, run the workflow from that tag.
8. **Check what is actually on staging before releasing.** Staging shows the
   last deployment, which is `main` only if nobody has deployed a branch
   since. Look at the last "Deploy static website" run, and redeploy `main`
   if needed, before merging the release PR.
9. **Write conventional commit messages** (`feat:`, `fix:`, `chore:`, `docs:`).
   They decide the next version number and the changelog.

## Configuration

10. Secrets and variables live in GitHub only, never in Azure by hand and
   never in git:

| Name | Kind | Where |
|---|---|---|
| `AZURE_STATIC_WEB_APPS_API_TOKEN` | secret, one per site | GitHub **environment** secret in `staging` and `production`; value from `az staticwebapp secrets list` once Terraform has created the site |
| `GOOGLE_SCRIPT_URL` | Apps Script endpoint for `api/contact` (a URL, not a credential); the sheet also emails the team | GitHub **repository** variable, one value for both environments; `scripts/configure-contact-function.mjs` writes it into `api/src/generated-config.js` right before upload. |
| `HUBSPOT_FORM_GUID` | HubSpot form that `api/contact` submits leads to through the Forms API (an ID, not a credential) | GitHub **repository** variable, written into the function package like `GOOGLE_SCRIPT_URL`, together with `NEXT_PUBLIC_HUBSPOT_PORTAL_ID`. The HubSpot form must contain every property in `HUBSPOT_FIELDS` in `api/src/functions/contact.js` (hidden fields are fine). Unset means leads go to the sheet only; with neither set the form answers "not configured". |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container, loaded only after analytics consent | GitHub **repository** variable read by the build job. Once set, GA4 runs from the container and the direct GA4 tag is never loaded. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` | public build-time IDs, both optional | GitHub **repository** variables read by the build job; when one is unset that tracker is simply not loaded. The GA4 ID is only a fallback while `NEXT_PUBLIC_GTM_ID` is unset; delete it once GA4 runs from GTM. |

11. Hosting behaviour (security headers, redirects, the `/contact-card`
    rewrite, the 404 page, the Node runtime for the API) is
    `public/staticwebapp.config.json`; keep it under 16 KB (hard platform
    limit 20 KB).
12. **Do not change website copy as part of an infrastructure or deployment
    change.**

## How the site is built and served

- `npm run build` runs `next build`, `scripts/post-export.mjs`,
  `scripts/build-sitemap.mjs` and `scripts/check-html.mjs`, in that order.
  The sitemap is built from the exported pages: every indexable page that is
  canonical to itself, in every locale, with the hreflang alternates the page
  declares and a `lastmod` from the git history of its route folder, sections
  and messages, so the build needs a full clone (the workflow checks out with
  `fetch-depth: 0`). The HTML check fails the build on a page without exactly
  one H1, a skipped heading level, an unsized image, JSON-LD that does not
  parse, or a wrong `<html lang>`.
- `scripts/post-export.mjs` puts every page at
  `<path>/index.html`, renames the Open Graph images to `.png`, adds one
  route per row of `redirects/redirects.csv` (see "Redirects" below), and
  writes a root `index.html` placeholder because the deploy action refuses an
  app folder without one (the `/` route answers first with the 301). The
  export lands in `out/`.
- URL shape: every locale is prefixed, English included (`/en/products/mira/`,
  `/de/products/mira/`), with a trailing slash on every page (Static Web Apps
  `trailingSlash: auto` redirects `/x` to `/x/` for folders and leaves files such
  as `/favicon.ico` alone; `always` would redirect every file too, which broke
  every asset on staging on 13 Oct). `/` redirects to `/en/`. Old unprefixed English
  URLs and renamed or retired pages 301 to their final page in one hop; every
  such redirect is a row of `redirects/redirects.csv`.
- Azure Static Web Apps serves the site directly, with no CDN or edge in
  front. `trueaim.ai` is the production site's default domain, so
  `www.trueaim.ai` and the `*.azurestaticapps.net` hostname answer a 301 to
  the apex with path and query kept. The setting exists only in the Azure
  portal (Custom domains, `trueaim.ai`, Set default; set on 15 Oct 2026). It
  survives deploys, but removing and re-adding the apex domain clears it.
- There is no middleware and no Next.js API route, so: no browser-language
  auto-redirect on first visit; images are served unoptimized; the contact
  rate limiter is per function instance; `npm run dev` has no contact API
  (the function lives in `api/`, run it with the SWA CLI); and `npm start`
  does not apply to a static export.
- Every unmatched path is rewritten to the single `/404.html` built from
  `src/app/not-found.tsx`, which is `lang="en"`. A locale-scoped 404 is not
  possible: `responseOverrides` cannot vary by path prefix, and Next rejects
  a catch-all route under `output: "export"`. Three tests in
  `tests/e2e/i18n.spec.ts` still assert a locale-specific `<html lang>` on
  404 and fail for this reason.

## Redirects

`redirects/redirects.csv` is the only source of redirects: one row per old
URL (`old_url,new_url,status,note`), and `scripts/build-redirects.mjs` writes
the matching Static Web Apps routes into the exported config during
`npm run build`. To add a redirect, open a pull request that adds a row to the
CSV and nothing else; never edit `public/staticwebapp.config.json` for a
redirect. Write `old_url` as the URL was served (pages with their trailing
slash), `new_url` as the final page with its trailing slash, `status` 301
(410 or 404 with an empty `new_url` for a page that is gone), and a short
note without quotes. The build fails on a duplicate `old_url` (with or
without the slash), a chain (a `new_url` that is itself redirected), a status
outside 301, 410 and 404, a `new_url` missing from the export, an `old_url`
that still exists as a page, or a config over 16 KB, and it prints the config
size. The platform drops query strings on every 301, so campaign links must
use the final URL. `scripts/launch-check.sh` proves every row on a live host
in one hop.

## Local checks

```bash
npm run lint && npm test && npm run build      # export lands in out/
cd api && npm ci && npm test                   # contact function contract tests

# Serve the built export the way Static Web Apps does:
npx -y @azure/static-web-apps-cli@latest start out --swa-config-location out --port 4280
```

The emulator applies the same `staticwebapp.config.json` as Static Web Apps,
including `trailingSlash: auto`, with one difference: the platform treats
`/x` and `/x/` as the same route pattern (and rejects a config that lists
both), while the CLI matches routes exactly, so a `/dpa/` request redirects on
staging but is 404 on the emulator. Checks worth running against it:

```bash
curl -sI localhost:4280/ | grep -i location              # /en/
curl -sI localhost:4280/technology | grep -i location    # /en/technology/, one hop
curl -so /dev/null -w '%{http_code}' localhost:4280/en/nope/   # 404
```

Against a live host, `scripts/launch-check.sh` runs the scriptable part of
Firon's launch checklist (redirects, 404, files, noindex, robots.txt,
sitemap, and every row of `redirects/redirects.csv`):

```bash
scripts/launch-check.sh https://staging.trueaim.ai --staging
scripts/launch-check.sh                                  # production
```
