# True Aim website glossary

When a term you are about to use conflicts with this file, this file wins, and the usage gets challenged rather than quietly widened.

Seeded on 2026-11-19 from five sources: `AGENTS.md`, `docs/TRANSLATION_GLOSSARY.md` v1.0 (approved 2026-11-05), `src/data/products.ts`, `src/data/solutions.ts` and `messages/en/`. The German, French and Italian renderings of every term live in `docs/TRANSLATION_GLOSSARY.md`, not here.

**True Aim**:
The company and the brand, **always two words** in every language. In German the genitive is "von True Aim".
_Avoid_: TrueAim, True AIm, True Aims, "the platform" as a name for the company

**Platform**:
The set of True Aim products, one page each under `/<locale>/platform/<slug>/`. A platform page describes **what a product does**.
_Avoid_: solution (a solution is a customer type)

**Solution**:
One page per **customer type** under `/<locale>/solutions/<segment>/`: insurers, brokers, third-party administrators, warranty providers. The code calls the URL part a segment.
_Avoid_: product

**Automated Coverage Check**:
The product that checks a claim against the policy wording. **The name is never translated**; descriptive use in a sentence is.
_Avoid_: Claims Decisioning (retired name; the message key `claimsDecisioning` keeps it only as an identifier)

**Invoice Benchmarking**:
The product that compares repair invoice lines to **reference prices**.
_Avoid_: none recorded yet

**AI Damage Assessment & Reporting**:
The product that prepares a damage report from photographs and documents. Renamed on 2026-11-09; the slug is `ai-damage-assessment-and-reporting`.
_Avoid_: Damage Reporting (old name), appraisal

**Data Extraction**:
The product that turns claim documents into structured data. It is listed **first** on the platform.
_Avoid_: none recorded yet

**Otus**:
True Aim's **AI claims specialist**, a product with its own platform page.
_Avoid_: none recorded yet

**Decision Dossier**:
The **complete, reproducible audit record** that every claim decision produces. A feature name, never translated, with the native article in other languages.
_Avoid_: none recorded yet

**Adjuster**:
The **in-house person who decides** the claim. The adjuster makes the final decision; the AI never does.
_Avoid_: expert, assessor (both mean an external party)

**Damage report**:
A report **prepared for the adjuster**. It is **not a signed expert appraisal**.
_Avoid_: appraisal, expert report, Gutachten, perizia

**Claim**:
One insured loss case as the insurer handles it.
_Avoid_: Anspruch, Forderung, réclamation, reclamo in translation (a legal demand or a complaint)

**Glass box**:
A decision **you can audit**, as in "Not a black box. A glass box you can audit."
_Avoid_: black box, except in direct contrast

**Trust Centre**:
The section that holds security, compliance and legal pages. **British spelling in English**, Trust Center in German, French and Italian.
_Avoid_: Trust Center in English

**Impact Estimator**:
The page that estimates the value True Aim can unlock for a claims operation.
_Avoid_: ROI calculator (the earlier name)

**Dark band**:
A section with `data-theme="dark"` inside the light page. **Light is the only site theme**; a dark band is a per-section device.
_Avoid_: dark mode, dark theme (there is no theme switcher)

**Staging**:
https://staging.trueaim.ai, **one slot** that shows whatever was deployed last. Never indexed.
_Avoid_: none recorded yet

**Production**:
https://trueaim.ai, which shows **only the latest release tag** `vX.Y.Z`.
_Avoid_: none recorded yet
