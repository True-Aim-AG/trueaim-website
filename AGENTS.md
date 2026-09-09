# Deployment rules for the True Aim website

These rules apply to everyone and every agent working in this repository.
The site is a static export on Azure Static Web Apps; the infrastructure is
in `True-Aim-AG/taim-infrastructure` (ADR 0032 there).

## Where things run

| Environment | URL | What it shows |
|---|---|---|
| staging | https://staging.trueaim.ai | whatever was deployed last: the head of `main`, or any branch someone deployed manually |
| production | https://trueaim.ai | the latest published release tag `vX.Y.Z` |

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
7. **Write conventional commit messages** (`feat:`, `fix:`, `chore:`, `docs:`).
   They decide the next version number and the changelog.

## Configuration

8. Secrets and variables live in GitHub only: per-environment
   `AZURE_STATIC_WEB_APPS_API_TOKEN` (the one real secret), and the
   repository variables `GOOGLE_SCRIPT_URL`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`,
   `NEXT_PUBLIC_HUBSPOT_PORTAL_ID`. Nothing is configured by hand in Azure,
   and nothing is committed to git. The full table is in `CLAUDE.md`.
9. Hosting behaviour (headers, redirects, the 404 page) is
   `public/staticwebapp.config.json`; keep it under 16 KB.
10. Do not change website copy as part of an infrastructure or deployment
    change.
