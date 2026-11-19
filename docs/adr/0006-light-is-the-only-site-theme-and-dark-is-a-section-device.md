# 0006. Light is the only site theme, and dark is a section device

Status: Accepted. Supersedes the dark-only lock of commit 725bdad (2026-04-10).
Date: 2026-09-16

## Context
The site had a light and dark switcher, then a dark-only lock. The True Aim Design System makes light the site theme.

## Decision
`data-theme="light"` sits on `<html>` and bare `:root` resolves to light. There is no theme switcher and no `prefers-color-scheme` handling. A section that needs dark carries `data-theme="dark"`.

## Consequences
Every component must render on light first. Dark exists only inside a band. `docs/DESIGN_SYSTEM.md` holds the tokens for both.

Source: commit 1204324, PR #4, "feat(design): apply the True Aim Design System across the website" (2026-09-16), squashed item "make light the only site theme, keep dark as a section device".
