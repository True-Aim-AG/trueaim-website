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
- **Platform**: Vercel
- **GitHub repo**: `True-Aim-AG/trueaim-website` (redirected from `Fr3nn3r/TrueAIm.ai`)
- **Team**: `fred-brunners-projects` (org ID `team_L7CF6FpMAykgkUtgD710Muuj`)

### Vercel Projects

| Project | Canonical URL | Purpose | Project ID |
|---------|-----|---------|------------|
| `trueaim` | https://trueaim.ai / https://www.trueaim.ai | **Production** | `prj_LPsEqV6syPd3AfA4Lq0j94ZLjbuj` |
| `trueaim-staging` | https://trueaim-staging-fred-brunners-projects.vercel.app | **Staging** (manual review before promoting) | `prj_HZTYPi5GKNtnDVxMW1UOzHiXOCbe` |

### Auto-deploy status (neither project auto-deploys in practice)
- **`trueaim` (prod)**: no GitHub integration. Nothing fires on push. Only manual CLI deploys.
- **`trueaim-staging`**: has a stale GitHub integration pointing at the old `Fr3nn3r/TrueAIm.ai` repo. Because the repo was renamed to `True-Aim-AG/trueaim-website`, the webhook is orphaned and no longer fires on pushes to `main`. Still manual in practice. If you want to revive auto-deploy, reconnect the integration to the new repo path in the Vercel dashboard; otherwise leave it — manual is the intentional flow.
- **Principle**: never push code directly to production without a manual verification step on staging first.

### Deploy commands

**Production** (`trueaim.ai`) — uses the linked `.vercel/project.json`:
```bash
npx vercel --prod
```

**Staging** (`trueaim-staging-fred-brunners-projects.vercel.app`) — override the linked project via env vars so the prod link is not clobbered, then alias the unique deployment URL to the stable staging URL (the `--prod` flag alone does not reliably move the stable alias):
```bash
# 1. Deploy
VERCEL_ORG_ID=team_L7CF6FpMAykgkUtgD710Muuj \
VERCEL_PROJECT_ID=prj_HZTYPi5GKNtnDVxMW1UOzHiXOCbe \
npx vercel deploy --prod --yes
# → prints a unique URL like trueaim-staging-<hash>-fred-brunners-projects.vercel.app

# 2. Alias it to the stable staging URL
VERCEL_ORG_ID=team_L7CF6FpMAykgkUtgD710Muuj \
VERCEL_PROJECT_ID=prj_HZTYPi5GKNtnDVxMW1UOzHiXOCbe \
npx vercel alias set <unique-deployment-url> trueaim-staging-fred-brunners-projects.vercel.app
```

### Important
- `.vercel/project.json` must point to the **production** project (`trueaim`). Do not change this — it is what makes bare `vercel --prod` target production.
- Always deploy to staging first, verify, then deploy to production.

## Reference Files
- `/docs/TrueAim_Website_PRD.md` - Full PRD
- `/docs/TrueAim_Website_Copy.md` - All copy
- `/docs/website-review-v4-requirements.md` - Latest website review requirements
- `/tests/e2e/website-review-v4.spec.ts` - E2E test suite for website requirements