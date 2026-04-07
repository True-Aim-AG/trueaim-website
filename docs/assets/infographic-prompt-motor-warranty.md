# Infographic Prompt: ClaimPilot Motor Warranty Claims Pipeline

**Model:** Gemini 3 Pro Image (Nano Banana Pro) | **Aspect ratio:** 16:9 | **Resolution:** 2K

---

## Prompt

A detailed horizontal architecture infographic titled "ClaimPilot: Motor Warranty Claims Decisioning Pipeline" for a corporate enterprise architecture audience. Dark navy background (#0A1628) with a clean, Swiss-precision aesthetic inspired by enterprise monitoring dashboards. Glassmorphism card style with frosted semi-transparent panels, subtle rounded corners, and thin white borders.

The layout has two horizontal swim lanes stacked vertically, clearly separated by a labeled divider.

The upper swim lane is labeled "DOCUMENT LEVEL — parallel per document" in small uppercase tracking. It contains two stages flowing left to right.

The first stage in the upper lane is labeled "Document Ingestion & Extraction." It shows a stack of PDF documents (a repair cost estimate, a warranty certificate, a service history) entering an OCR scanner. Three output signals emerge: structured fields with a small coordinate grid icon labeled "Word-level coordinates," a checkmark badge labeled "Triple-verified financials," and three small language flags for DE, FR, IT. A tag reads "14 document types | 3 languages."

Beside this stage, a side branch shows six small detector nodes in a horizontal row labeled "Fraud Inspection." Each node is a small shield icon representing: PDF signature, Metadata, Source consistency, Error-level analysis, Copy-move detection, and Synthetic detection. Each produces a colored severity signal. A tag reads "6 parallel fraud inspectors."

A vertical fan-in arrow shows multiple document outputs converging downward into the lower swim lane.

The lower swim lane is labeled "CLAIM LEVEL — aggregated across all documents" in small uppercase tracking. It contains three stages flowing left to right.

The first stage in the lower lane is labeled "Reconciliation & Screening." It shows multiple document outputs merging into a single reconciled record. A compact grid of 12 small rule icons (2 rows of 6) represents deterministic screening checks, each with a green pass or red fail indicator. The checks listed are: Policy validity, Mileage, Exclusions, Service compliance, Shop auth, DTC, Coverage, Labor linkage, Hybrid, Damage cause, Policyholder, Damage date. Hard failures route via a red arrow to a "REJECT" output. A tag reads "12 deterministic checks | Zero LLM."

The centerpiece of the infographic is the second stage in the lower lane, labeled "Three-Tier Coverage Matching." It is rendered as a cascading funnel or waterfall with three visually distinct tiers. Tier 1 at the top is the widest, colored green (#16A34A), labeled "Deterministic Rules — 40-50% of line items" with confidence 1.0. Tier 2 in the middle is medium width, colored blue (#2563EB), labeled "Keyword Matching — 30-40%" with umlaut normalization and compound-word decomposition. Tier 3 at the bottom is the narrowest, colored amber (#F59E0B), labeled "LLM Classification — 10-20%" as a calibrated fallback. A thin curved arrow from Tier 3 loops back up to a "Knowledge Graph" node that feeds into Tier 2, showing the learning loop.

The third stage in the lower lane is labeled "Decision Engine." Three diverging output paths emerge: a green path labeled "APPROVE — 52% straight-through," a blue path labeled "REFER — pre-classified with targeted questions," and a red (#EF4444) path labeled "REJECT — deterministic with source evidence."

In the top-right corner, five key metrics in monospace numerals: "52% straight-through," "40+ min saved/claim," "97%+ verdict accuracy," "87% payout match," "3,000 claims/month."

Along the right edge, a narrow vertical strip shows audit infrastructure: a chain-link icon labeled "Hash-chained ledger," a snapshot icon labeled "Version bundles," and a document icon labeled "Source traceability."

The True Aim logo (a geometric owl icon in navy-to-blue gradient) sits in the top-left corner. The company name "True Aim" appears next to it in white sans-serif with "AI" highlighted in blue (#2563EB). A footer line reads "ClaimPilot by True Aim AG | Zug, Switzerland."

Typography is clean sans-serif for labels, bold for headlines, monospace for all numbers and metrics. Primary accent is ocean blue (#2563EB), green (#16A34A) for approvals and positive outcomes, amber (#F59E0B) for warnings and LLM fallback, red (#EF4444) for rejections. All text is white or 70% white on the dark background. No 3D effects, no stock imagery. Generous whitespace. The three-tier coverage cascade should be the largest, most visually prominent element in the composition. The overall feel is a premium dark-mode enterprise architecture dashboard.
