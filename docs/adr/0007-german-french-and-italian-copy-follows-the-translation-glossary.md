# 0007. German, French and Italian copy follows the translation glossary

Status: Accepted
Date: 2026-11-05

## Context
The old de, fr and it files mixed retired product names, Swiss and German variants, stripped accents and two forms of Italian address.

## Decision
English is the source. Every German, French and Italian string in `messages/` follows `docs/TRANSLATION_GLOSSARY.md` v1.0, approved on 5 November 2026. Product names stay English. A claim is never strengthened in translation. Changes to the glossary go through a PR.

## Consequences
When English copy changes, the three translations change with it. The old translation files are a reference for term choices only. The legal page bodies stay English until Fred decides otherwise (glossary decision 9).

Source: commit 7a61456, "docs: add the translation glossary for German, French and Italian" (2026-11-05), the glossary header and its section 11; the four-language site shipped in a96d27f, PR #32 (2026-11-09).
