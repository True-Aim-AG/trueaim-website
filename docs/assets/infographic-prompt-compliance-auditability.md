# Infographic Prompt: ClaimPilot Compliance & Auditability Architecture

**Model:** Gemini 3 Pro Image (Nano Banana Pro) | **Aspect ratio:** 16:9 | **Resolution:** 2K

---

## Prompt

A detailed horizontal architecture infographic titled "ClaimPilot: Compliance & Auditability Architecture" for a corporate enterprise architecture audience. Dark navy background (#0A1628) with a clean, Swiss-precision aesthetic inspired by enterprise monitoring dashboards. Glassmorphism card style with frosted semi-transparent panels, subtle rounded corners, and thin white borders.

The central concept is a simplified claims processing pipeline running horizontally through the middle of the canvas, with five compliance pillars arranged around it like a protective framework. The visual story is that compliance is woven into every stage, not bolted on afterward.

The central pipeline is a simple horizontal flow of four small connected nodes labeled "Intake," "Extract," "Decide," and "Output," linked by thin blue (#2563EB) arrows. Each node is a small rounded blue square. This backbone is intentionally minimal to let the five pillars take visual prominence.

Pillar 1, positioned above and to the left, is labeled "Tamper-Evident Decision Ledger." It shows a horizontal chain of five linked rectangular blocks running parallel to the pipeline, with a small chain-link icon connecting each block to the next via a hash symbol. One block is expanded to show its fields: "decision_id," "claim_id," "actor_type," "record_hash." A green (#16A34A) checkmark icon at the end of the chain is labeled "Single API call verifies integrity." A tag reads "Append-only JSONL | Hash-chained."

Pillar 2, positioned above and to the right, is labeled "Version Bundles." It shows a single snapshot card with dotted lines connecting to every stage of the central pipeline. Inside the card, five stacked fields read: "Git commit SHA," "LLM model name," "Prompt template hashes," "Extraction spec hashes," "Runtime configuration." A rewind clock icon is labeled "Reconstruct any historical decision." A tag reads "Immutable | Per-pipeline-run."

Pillar 3, positioned below and to the left, is labeled "LLM Audit Trail." It shows a dotted wrapper box around the Extract and Decide stages of the pipeline labeled "Audited Client." Inside, a compact log record shows: "System + User prompts (input)," "Model parameters," "Response + tokens + latency (output)," "Linked to decision record." An eye icon in amber (#F59E0B) represents observability. A tag reads "Every LLM call captured."

Pillar 4, positioned at the bottom center, is labeled "PII Vault & Crypto-Shredding." It shows a vault icon with a lock and encryption shield. A flow diagram shows raw PII (name, ID, financial details) entering from the left, passing through an "AES-256-GCM" encryption boundary, and exiting as anonymized tokens reading "[PII:vault_C001:entry_42]" on the right. A separate key-delete icon shows that destroying the encryption key makes the vault permanently unreadable. A small badge reads "GDPR Art. 17." A tag reads "Per-claim encryption | Crypto-shredding."

Pillar 5, positioned below and to the right, is labeled "Role-Based Access Control." Five role badges are arranged horizontally, each a small colored circle with a label: "Admin," "Auditor," "Reviewer," "Operator," "Adjuster." Thin lines connect each role to the specific pipeline stages or pillars they can access. A crossed-out line from Auditor to the Decide node shows what they cannot modify. A tag reads "5 roles | Per-endpoint enforcement."

Along the right edge, a narrow vertical strip shows three regulatory alignment badges stacked vertically: "EU AI Act (Annex VIII)," "GDPR Article 22," and "Swiss FADP." Small text reads "Compliance by design, not by export."

In the top-right corner, five key metrics in monospace numerals: "50+ governance docs," "160+ PII fields classified," "12 deterministic checks," "5 access roles," "1 API call to verify."

The True Aim logo (a geometric owl icon in navy-to-blue gradient) sits in the top-left corner. The company name "True Aim" appears next to it in white sans-serif with "AI" highlighted in blue (#2563EB). A footer line reads "ClaimPilot by True Aim AG | Zug, Switzerland."

Typography is clean sans-serif for labels, bold for headlines, monospace for all numbers, metrics, and code tokens like "decision_id" and "[PII:vault_C001:entry_42]." Color coding groups related elements: green (#16A34A) for verification and integrity, blue (#2563EB) for infrastructure and pipeline, amber (#F59E0B) for data protection and audit observability. All text is white or 70% white on the dark background. No 3D effects, no stock imagery. Generous whitespace. The five pillars should be visually prominent and clearly connected to the central pipeline. The overall feel is a premium dark-mode enterprise compliance dashboard.
