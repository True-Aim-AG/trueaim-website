# True Aim Website

## Project Context
Building MVP corporate website for True Aim - a Swiss AI company offering neuro-symbolic decisioning for insurance claims. The website must communicate enterprise credibility and regulatory compliance.

## Tech Stack
- Next.js 14 (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- shadcn/ui components
- Framer Motion for animations
- Lucide React icons

## Design System

### Colors
- Tokens and rules: docs/DESIGN_SYSTEM.md (True Aim Design System v4). Light theme default; True Aim Blue #5151DB; Inter Tight titles, IBM Plex Sans body; pills r40 for filled containers; cards without borders.

### Typography
- Headlines: font-display font-bold (no tracking-tight)
- Body: text-body leading-[1.6]

### Spacing
- Section padding: py-24 px-6
- Max width: max-w-7xl mx-auto
- Card gaps: gap-6 or gap-8

## File Structure
```
src/
├── app/
│   ├── page.tsx (home)
│   ├── products/
│   │   ├── mira/page.tsx
│   │   ├── contextbuilder/page.tsx
│   │   └── claimeval/page.tsx
│   ├── technology/page.tsx
│   ├── company/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── ValueProps.tsx
│   │   ├── ProductsGrid.tsx
│   │   └── CTA.tsx
│   └── ui/ (shadcn components)
└── lib/
    └── utils.ts
```

## Key URLs for Demo Embeds
- MIRA: https://mira-travel-demo.vercel.app/products
- ClaimEval: https://claimeval.vercel.app/claims
- ContextBuilder: https://github.com/Fr3nn3r/AgenticContextBuilder

## Content Source
All copy is in /docs/TrueAim_Website_Copy.md

## Quality Standards
- Lighthouse Performance > 90
- Mobile-first responsive
- WCAG 2.1 AA accessible
- No placeholder images - use gradients/illustrations

## Copy Guidelines
- **No dashes for rhythm**: Avoid using em-dashes (—), en-dashes (–), or spaced hyphens ( - ) for rhythmic pauses or clause separation in website copy. Rewrite sentences to avoid dash-based phrasing. Legitimate uses (compound words like "real-time", technical terms, URLs) are acceptable.
- **Brand name in text is always True Aim (two words).**

## Commands
- `npm run dev` - Start dev server
- `npm run build` - Production build
- `npm run lint` - Run ESLint
- `npx playwright test` - Run E2E tests

## Deployment
- **Platform**: Azure Static Web Apps, owned by Terraform in the `taim-infrastructure` repo (ADR 0032 there). The site is a fully static export (`output: "export"`); the contact form runs as a Static Web Apps managed Azure Function in `api/`.
- **GitHub repo**: `True-Aim-AG/trueaim-website`
- **Workflow**: `.github/workflows/deploy.yml`

| Environment | Azure resource | Subscription | URL | How it deploys |
|---|---|---|---|---|
| staging | `trueaim-website-staging-web` in `trueaim-website-staging` | nonprod | https://staging.trueaim.ai (the site's `*.azurestaticapps.net` default hostname also works) | automatically on every push to `main`, and manually from **any branch** by running the workflow from that branch |
| production | `trueaim-website-production-web` in `trueaim-website-production` | prod | https://trueaim.ai and https://www.trueaim.ai, both registered on the site; www redirects to the apex client-side and every page declares the apex as canonical | by publishing a GitHub release: release-please keeps a release PR open on `main`; merging it tags `vX.Y.Z`, publishes the release, and starts the production deployment for that tag. To redeploy an existing release, run the workflow manually **from that tag** (branches deploy staging, anything else is refused). |

### Principles
- The deployment rules everyone follows are in `AGENTS.md` (staging is where work is shown, any branch can be deployed there, production only from a release tag).
- Never release to production without verifying staging first. Staging shows the last deployment, which is `main` unless someone deployed a branch since, so check which commit is on staging (the last "Deploy static website" run) and redeploy `main` if needed before merging the release PR. Use conventional commit messages (`feat:`, `fix:`, `chore:`) so release-please computes the version and changelog.
- The site is served by Azure Static Web Apps directly, no CDN or edge in front. Static hosting has no host-based redirect, hence the tiny `www` redirect script in the locale layout head.
- Public URL shape is unchanged from the Vercel era: English pages unprefixed (`/products/mira`), other locales prefixed (`/de/products/mira`), no trailing slashes (Static Web Apps redirects `/x/` to `/x`).
- Differences from the Vercel era, all deliberate: no browser-language auto-redirect on first visit (the middleware is gone); `/en/...` links land on tiny redirect stubs instead of a middleware redirect; images are served unoptimized; the `/dpa` redirects are 301 rather than 308; API responses carry their own security headers; the contact rate limiter is per function instance; `npm run dev` has no contact API (the function lives in `api/`, run it with the SWA CLI) and `npm start` does not apply to a static export.
- Static Web Apps behaviour (security headers, redirects, the `/contact-card` rewrite, the 404 page, the Node runtime for the API) lives in `public/staticwebapp.config.json`. `scripts/post-export.mjs` runs after `next build` and moves the English export to the root and every page to `<path>/index.html`; the final config must stay under 16 KB (hard platform limit 20 KB).

### Configuration
| Name | Kind | Where |
|---|---|---|
| `AZURE_STATIC_WEB_APPS_API_TOKEN` | secret, one per site | GitHub **environment** secret in `staging` and `production`; value from `az staticwebapp secrets list` once Terraform has created the site, never committed |
| `GOOGLE_SCRIPT_URL` | Apps Script endpoint URL for `api/contact` (not a credential) | GitHub **repository** variable, one value for both environments; the deploy job writes it into `api/src/generated-config.js` right before upload. Unset means the form answers "not configured". |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` | public build-time IDs, both optional | GitHub **repository** variables read by the build job; when one is unset that tracker is simply not loaded |

### Local checks
```bash
npm run lint && npm test && npm run build      # export lands in out/
cd api && npm ci && npm test                    # contact function contract tests
npx -y @azure/static-web-apps-cli@latest start out --swa-config-location out --port 4280   # emulator
```

## Reference Files
- `/docs/TrueAim_Website_PRD.md` - Full PRD
- `/docs/TrueAim_Website_Copy.md` - All copy
- `/docs/website-review-v4-requirements.md` - Latest website review requirements
- `/tests/e2e/website-review-v4.spec.ts` - E2E test suite for website requirements