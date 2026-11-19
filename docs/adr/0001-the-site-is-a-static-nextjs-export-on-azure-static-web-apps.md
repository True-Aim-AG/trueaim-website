# 0001. The site is a static Next.js export on Azure Static Web Apps

Status: Accepted
Date: 2026-09-08

## Context
The site ran on Vercel with next-intl middleware and a Next.js API route for the contact form. True Aim moved its hosting into its own Azure estate, managed by Terraform in a separate infrastructure repository.

## Decision
The site builds with `output: "export"` and deploys to Azure Static Web Apps. Headers, redirects and rewrites live in `public/staticwebapp.config.json`. The contact form runs as a Static Web Apps managed Azure Function in `api/`.

## Consequences
There is no middleware and no Next.js API route: no browser-language redirect, unoptimized images, a per-instance rate limiter, and no contact API under `npm run dev`. The hosting config must stay under 16 KB. Nothing is configured by hand in the Azure portal.

Source: commit 92cb5cc, "feat(hosting): static export for Azure Static Web Apps, replacing Vercel" (2026-09-08).
