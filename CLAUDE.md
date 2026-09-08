# TrueAim.ai Website

## Project Context
Building MVP corporate website for TrueAim.ai - a Swiss AI company offering neuro-symbolic decisioning for insurance claims. The website must communicate enterprise credibility and regulatory compliance.

## Tech Stack
- Next.js 14 (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- shadcn/ui components
- Framer Motion for animations
- Lucide React icons

## Design System

### Colors (use CSS variables in globals.css)
- **Color Palette: `/docs/PALETTE_OVERRIDE.md` (overrides PRD Section 7.2)**

### Typography
- Headlines: font-bold, tracking-tight
- Body: text-gray-600, leading-relaxed

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
| staging | `trueaim-website-staging-web` in `trueaim-website-staging` | nonprod | the site's `*.azurestaticapps.net` default hostname (see the Terraform output) | automatically on every push to `main` |
| production | `trueaim-website-production-web` in `trueaim-website-production` | prod | https://trueaim.ai (www redirects to the apex; both terminate on Front Door owned by the infra DNS root) | manually: run the **Deploy static website** workflow with `workflow_dispatch` on `main` after verifying staging |

### Principles
- Never deploy production without verifying the same commit on staging first. The production job is `workflow_dispatch` only for that reason.
- Public URL shape is unchanged from the Vercel era: English pages unprefixed (`/products/mira`), other locales prefixed (`/de/products/mira`), no trailing slashes (Static Web Apps redirects `/x/` to `/x`).
- The browser-language auto-redirect that the old next-intl middleware did no longer exists (static hosting); everything else is identical.
- Static Web Apps behaviour (security headers, redirects, the `/contact-card` rewrite, the 404 page, the Node runtime for the API) lives in `public/staticwebapp.config.json`. `scripts/post-export.mjs` runs after `next build` and moves the English export to the root and every page to `<path>/index.html`; the final config must stay under 16 KB (hard platform limit 20 KB).

### Configuration
| Name | Kind | Where |
|---|---|---|
| `AZURE_STATIC_WEB_APPS_API_TOKEN` | secret, one per site | GitHub environment secret in `staging` / `production`; handed over per the infra token runbook, never committed |
| `GOOGLE_SCRIPT_URL` | sensitive runtime setting for `api/contact` | Static Web Apps application setting per environment (`az staticwebapp appsettings set`), never in git or Terraform |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` | public build-time IDs | GitHub repository variables read by the build job |

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