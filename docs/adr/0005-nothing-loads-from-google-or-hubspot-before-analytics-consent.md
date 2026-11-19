# 0005. Nothing loads from Google or HubSpot before analytics consent

Status: Accepted
Date: 2026-10-13

## Context
HubSpot tracking was already gated on consent. The Google tag was not, and its Consent Mode v2 defaults left three signals granted.

## Decision
No script, preconnect or request goes to Google or HubSpot until the visitor accepts analytics cookies. All four Consent Mode v2 signals default to denied, and the Google tag runs in basic consent mode. Consent state and helpers live in `src/lib/consent.ts`.

## Consequences
Analytics miss visitors who do not consent. The data layer never carries personal data; the contact form pushes `form_submit_success` only after `/api/contact` answers 2xx.

Source: commits 241bd71, "feat: add consent-gated HubSpot tracking on all pages" (2026-04-20), and 100e745, "fix: Consent Mode v2 defaults and basic consent mode for the Google tag" (2026-10-13).
