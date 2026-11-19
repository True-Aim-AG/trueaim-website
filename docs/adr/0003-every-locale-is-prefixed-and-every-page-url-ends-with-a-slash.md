# 0003. Every locale is prefixed and every page URL ends with a slash

Status: Accepted
Date: 2026-10-13

## Context
English was served unprefixed and the other locales prefixed, with no trailing slash. One URL shape for every locale makes hreflang, canonicals and the sitemap uniform.

## Decision
Every locale is prefixed, English included (`/en/platform/otus/`, `/de/platform/otus/`), and every page URL has a trailing slash. `/` answers a 301 to `/en/`. Static Web Apps uses `trailingSlash: auto`, so files such as `/favicon.ico` keep their URLs.

## Consequences
Every old unprefixed English URL needs a one-hop 301, which ADR 0004 governs. `trailingSlash: always` is ruled out: it broke every asset on staging on 13 October 2026.

Source: commits 9c868c5, "feat: prefix every locale and enforce trailing slashes" (2026-10-13), and 3129c5e, "fix: use trailingSlash auto so files keep their URLs" (2026-10-14).
