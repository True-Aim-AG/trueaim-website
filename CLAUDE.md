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
- Primary/CTA: #E91E8C (pink-500)
- Secondary: #1B5E20 (green-800)
- Trust: #0077B6 (blue-600)
- Text: #1A1A2E
- Background: #FFFFFF, #F7FAFC

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

## Commands
- `npm run dev` - Start dev server
- `npm run build` - Production build
- `npm run lint` - Run ESLint
```

## 3. Add Reference Files

Create a `/docs` folder in your project root:
```
docs/
├── TrueAim_Website_PRD.md      # Full PRD
├── TrueAim_Website_Copy.md     # All copy
└── assets/
    ├── contextbuilder-infographic.png
    ├── claimeval-infographic.png
    └── product-screenshots/