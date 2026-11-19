# 0002. Production deploys only from a release-please tag

Status: Accepted
Date: 2026-09-09

## Context
The team needs to show work in progress without the risk that it reaches https://trueaim.ai.

## Decision
release-please keeps a release PR open on `main`. Merging it tags `vX.Y.Z`, publishes the release and starts the production deployment. The workflow refuses to deploy anything but a `v*` tag to production. Every push to `main` deploys staging, and a manual run deploys any branch to staging.

## Consequences
Commit messages must be conventional (`feat:`, `fix:`, `chore:`, `docs:`) because they set the version and the changelog. Staging has one slot, so the person who deploys a branch says so. Check staging before merging the release PR.

Source: commits 2df9b80, "feat(release): release-please drives production" (2026-09-08), and e45ce4c, "feat(ci): staging from any branch, production dispatched by release-please, no PAT" (2026-09-09).
