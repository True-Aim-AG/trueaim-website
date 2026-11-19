# 0004. Redirects come only from redirects/redirects.csv

Status: Accepted
Date: 2026-10-20

## Context
Redirects lived in several places: generated legacy English routes, routes in `staticwebapp.config.json`, and URL lists in working papers. Chains and duplicates were hard to see.

## Decision
`redirects/redirects.csv` (`old_url,new_url,status,note`) is the only source of redirects. `scripts/build-redirects.mjs` writes the Static Web Apps routes during `npm run build`. A new redirect is a PR that adds one row and nothing else.

## Consequences
The build fails on a duplicate, a chain, a status other than 301, 410 or 404, a target missing from the export, an old URL that is still a page, or a config over 16 KB. Nobody edits `public/staticwebapp.config.json` for a redirect. A renamed page slug needs a row.

Source: commit 734b618, PR #1, "feat: build every redirect from redirects/redirects.csv" (2026-10-20).
