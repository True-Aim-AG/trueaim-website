# Deployment and hosting rules for the True Aim website

These rules apply to everyone and every agent working in this repository, and
they are the source of truth for how this site is built, served and shipped.
`CLAUDE.md` covers the code itself (stack, design system, conventions) and
points here for anything about deployment.

The site is a fully static Next.js export (`output: "export"`) on Azure Static
Web Apps. The contact form runs as a Static Web Apps managed Azure Function in
`api/`. The infrastructure is Terraform in a separate, private infrastructure
repository; nothing is configured by hand in the Azure portal.

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
