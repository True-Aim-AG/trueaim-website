# Deployment and hosting rules for the True Aim website

These rules apply to everyone and every agent working in this repository, and
they are the source of truth for how this site is built, served and shipped.
`CLAUDE.md` covers the code itself (stack, design system, conventions) and
points here for anything about deployment.

The site is a fully static Next.js export (`output: "export"`) on Azure Static
Web Apps. The contact form runs as a Static Web Apps managed Azure Function in
`api/`. The infrastructure is Terraform in `True-Aim-AG/taim-infrastructure`
(ADR 0032 there); nothing is configured by hand in the Azure portal.

## Where things run

Workflow: `.github/workflows/deploy.yml`. Its first step prints which
environment the run will deploy to.

| Environment | URL | Azure resource (subscription) | What it shows |
|---|---|---|---|
| staging | https://staging.trueaim.ai (the site's `*.azurestaticapps.net` default hostname also works) | `trueaim-website-staging-web` in `trueaim-website-staging` (nonprod) | whatever was deployed last: the head of `main`, or any branch someone deployed manually |
| production | https://trueaim.ai and https://www.trueaim.ai | `trueaim-website-production-web` in `trueaim-website-production` (prod) | the latest published release tag `vX.Y.Z` |

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

## Releasing to production

5. **Production deploys only from a release tag.** release-please keeps a
   release PR open on `main`; merging it tags `vX.Y.Z`, publishes the
   release, and starts the production deployment. Do not merge the release
   PR before checking staging.
6. **Never deploy a branch or an arbitrary commit to production.** The
   workflow refuses anything that is not a `v*` tag. To redeploy an existing
   release, run the workflow from that tag.
7. **Check what is actually on staging before releasing.** Staging shows the
   last deployment, which is `main` only if nobody has deployed a branch
   since. Look at the last "Deploy static website" run, and redeploy `main`
   if needed, before merging the release PR.
8. **Write conventional commit messages** (`feat:`, `fix:`, `chore:`, `docs:`).
   They decide the next version number and the changelog.

## Configuration

9. Secrets and variables live in GitHub only, never in Azure by hand and
   never in git:

| Name | Kind | Where |
|---|---|---|
| `AZURE_STATIC_WEB_APPS_API_TOKEN` | secret, one per site | GitHub **environment** secret in `staging` and `production`; value from `az staticwebapp secrets list` once Terraform has created the site |
| `GOOGLE_SCRIPT_URL` | Apps Script endpoint for `api/contact` (a URL, not a credential) | GitHub **repository** variable, one value for both environments; the deploy job writes it into `api/src/generated-config.js` right before upload. Unset means the form answers "not configured". |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` | public build-time IDs, both optional | GitHub **repository** variables read by the build job; when one is unset that tracker is simply not loaded |

10. Hosting behaviour (security headers, redirects, the `/contact-card`
    rewrite, the 404 page, the Node runtime for the API) is
    `public/staticwebapp.config.json`; keep it under 16 KB (hard platform
    limit 20 KB).
11. **Do not change website copy as part of an infrastructure or deployment
    change.**

## How the site is built and served

- `npm run build` runs `next build` and then `scripts/post-export.mjs`, which
  puts every page at
  `<path>/index.html`, renames the Open Graph images to `.png`, and adds a
  301 route for every old unprefixed English URL. The export lands in `out/`.
- URL shape: every locale is prefixed, English included (`/en/products/mira/`,
  `/de/products/mira/`), with a trailing slash on every page (Static Web Apps
  redirects `/x` to `/x/`). `/` redirects to `/en/`. Old unprefixed English
  URLs 301 to their `/en/` page; renamed pages belong in the redirect map.
- Azure Static Web Apps serves the site directly, with no CDN or edge in
  front. Static hosting has no host-based redirect, so the `www`-to-apex
  redirect is a small script in the locale layout head.
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

## Local checks

```bash
npm run lint && npm test && npm run build      # export lands in out/
cd api && npm ci && npm test                   # contact function contract tests

# Serve the built export the way Static Web Apps does:
npx -y @azure/static-web-apps-cli@latest start out --swa-config-location out --port 4280
```

The emulator applies the same `staticwebapp.config.json` as Static Web Apps,
including `trailingSlash: always`. Checks worth running against it:

```bash
curl -sI localhost:4280/ | grep -i location              # /en/
curl -sI localhost:4280/technology | grep -i location    # /en/technology/, one hop
curl -sI localhost:4280/dpa/ | head -1                   # 301, not 404
curl -so /dev/null -w '%{http_code}' localhost:4280/en/nope/   # 404
```
