# 0008. The repository is public, and internal papers live elsewhere

Status: Accepted
Date: 2026-10-15

## Context
The repository held reviews, test plans, the PRD, investor and meeting PDFs, photo originals and local paths. It was prepared to become public.

## Decision
The repository is public. Internal working papers live in a private repository. Nobody adds internal documents, customer material, local paths or personal settings here; `.claude/settings.local.json` is ignored.

## Consequences
Every file, commit message and handoff note in this repository is public. Secrets and configuration values live in GitHub settings, never in git.

Source: commit f7d9025, "chore: prepare the repository to become public" (2026-10-15).
