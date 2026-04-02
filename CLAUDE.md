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
- **Platform**: Vercel
- **GitHub repo**: True-Aim-AG/trueaim-website (redirected from Fr3nn3r/TrueAIm.ai)

### Vercel Projects

| Project | URL | Purpose | Project ID |
|---------|-----|---------|------------|
| `trueaim` | https://trueaim.ai / https://www.trueaim.ai | **Production** | `prj_LPsEqV6syPd3AfA4Lq0j94ZLjbuj` |
| `trueaim-staging` | https://trueaim-staging.vercel.app | **Staging** (preview before production) | `prj_HZTYPi5GKNtnDVxMW1UOzHiXOCbe` |

### Deploy Commands
- **Staging**: `npx vercel --prod --project trueaim-staging` (deploy to staging for review)
- **Production**: `npx vercel --prod` (deploys to trueaim.ai via `.vercel/project.json`)

### Important
- `.vercel/project.json` must point to the **production** project (`trueaim`). Do not change this.
- Auto-deploy via GitHub integration is not available (Hobby plan). Use CLI deploys.
- Always deploy to staging first, verify, then deploy to production.

## Reference Files
- `/docs/TrueAim_Website_PRD.md` - Full PRD
- `/docs/TrueAim_Website_Copy.md` - All copy
- `/docs/website-review-v4-requirements.md` - Latest website review requirements
- `/tests/e2e/website-review-v4.spec.ts` - E2E test suite for website requirements