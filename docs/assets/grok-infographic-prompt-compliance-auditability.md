```markdown
**Infographic Generation Prompt: Compliance & Auditability Architecture Diagram**

**Canvas Setup:**
- Dimensions: 1920x1080px (horizontal)
- Background Color: Deep Navy (#0A1628)
- Style: Clean, Swiss design with a dark-mode enterprise dashboard aesthetic
- Spacing: Generous margins and padding (60px on all sides for main content boundary)
- No heavy shadows or 3D effects; use subtle opacity for depth

**Header Section (Top, 1920x120px):**
- Left Corner (60px from left, 30px from top): Logo - Geometric owl icon with navy-to-blue gradient (#0A1628 to #2563EB), 60x60px
- Right of Logo (20px spacing): Wordmark - "True Aim" in white (#FFFFFF, 100% opacity), "AI" in primary blue (#2563EB), font Inter sans-serif, 36px, vertically centered to logo
- Right-Aligned (60px from right edge): Title - "Compliance & Auditability Architecture" in white (#FFFFFF, 100% opacity), Inter sans-serif, 28px, bold

**Footer Section (Bottom, 1920x60px):**
- Centered Text: "ClaimPilot by True Aim AG | Zug, Switzerland" in white (#FFFFFF, 70% opacity), Inter sans-serif, 14px
- Border Top: Thin line in white at 12% opacity, 1px thickness, spanning full width

**Main Content Area (1800x840px, centered between header and footer):**
- **Layout Structure:** Horizontal flow divided into 5 vertical "pillars" representing compliance components. Each pillar is a card with a glassmorphism effect (background: white at 8-10% opacity), equal width (320px), height (760px), 40px spacing between cards. Total width of pillars + spacing = 1680px, centered horizontally.
- **Pillar Flow:** Left-to-right visual progression with directional arrows (white, 70% opacity, 20px thickness) between pillars at mid-height (380px from top of content area), indicating data/processing flow.
- **Top Section per Pillar (80px height):** Icon (48x48px, centered, primary blue #2563EB) and Title (below icon, white #FFFFFF 100% opacity, Inter sans-serif 20px bold).
- **Body Section per Pillar (600px height):** Visual elements + minimal text. Use icons and color-coded highlights for key concepts. Text in white (#FFFFFF, 70% opacity), Inter sans-serif 14px for labels, monospace 14px for metrics/numbers.
- **Bottom Section per Pillar (80px height):** Regulatory alignment badges (small rounded rectangles, 80x24px, primary blue #2563EB background, white text 12px) listing relevant laws (e.g., "EU AI Act", "GDPR Art. 22", "Swiss FADP"), centered, max 3 per pillar.

**Pillar Details (Left to Right):**
1. **Tamper-Evident Decision Ledger**
   - Icon: Lock with chain (symbolizing security and linkage)
   - Body: 
     - Top: Append-only ledger graphic (stacked horizontal bars, 280x120px, success green #16A34A for bars, labeled "JSONL Records")
     - Middle: Hash chain visualization (4 small circles connected by lines, 280x80px, each circle labeled "Hash" in monospace, amber #F59E0B)
     - Bottom: API call badge (rounded rectangle, 200x40px, primary blue #2563EB, text "1 API Call - Verify Integrity")
     - Metrics: "Hash-Chained Records" (monospace)
   - Flow Arrow to Pillar 2: Right-pointing, mid-height

2. **Version Bundles**
   - Icon: Folder with timestamp (symbolizing snapshots)
   - Body:
     - Top: Snapshot stack (3 overlapping rectangles, 280x120px, amber #F59E0B outline, labeled "Immutable Snapshots")
     - Middle: List icons (5 small bullet dots with labels like "Git SHA", "LLM Model", "Prompt SHA", etc., primary blue #2563EB dots, 280x200px)
     - Bottom: Reconstruction badge (rounded rectangle, 200x40px, success green #16A34A, text "Exact Reconstruction")
   - Flow Arrow to Pillar 3: Right-pointing, mid-height

3. **LLM Audit Trail**
   - Icon: Magnifying glass over text (symbolizing audit)
   - Body:
     - Top: Call wrapper graphic (nested rectangles, 280x120px, outer primary blue #2563EB, inner white 10% opacity, labeled "Client Wrapper")
     - Middle: Data points (5 small icons: prompt, parameters, response, tokens, latency; each with label, success green #16A34A icons, 280x200px)
     - Bottom: Link badge (rounded rectangle, 200x40px, amber #F59E0B, text "Linked to Decisions")
   - Flow Arrow to Pillar 4: Right-pointing, mid-height

4. **PII Vault & Crypto-Shredding**
   - Icon: Safe with key (symbolizing encryption)
   - Body:
     - Top: Encryption graphic (lock over data bars, 280x120px, error red #EF4444 for lock, labeled "AES-256-GCM")
     - Middle: Tokenization example (text box, 280x80px, primary blue #2563EB outline, text "[PII:vault_C001:entry_42]" in monospace)
     - Bottom: Erasure badge (rounded rectangle, 200x40px, error red #EF4444, text "Crypto-Shredding (GDPR Art. 17)")
   - Flow Arrow to Pillar 5: Right-pointing, mid-height

5. **Role-Based Access Control**
   - Icon: User profiles with shield (symbolizing access control)
   - Body:
     - Top: Role icons (5 small user silhouettes, 280x120px, each in primary blue #2563EB, labeled "Admin", "Auditor", "Reviewer", "Operator", "Adjuster")
     - Middle: Separation graphic (vertical lines splitting roles, 280x80px, amber #F59E0B lines, labeled "Separation of Duties")
     - Bottom: Enforcement badge (rounded rectangle, 200x40px, success green #16A34A, text "Per-Endpoint Enforcement")

**Sidebar Metrics Panel (Right Edge, 200x760px, 60px from right margin):**
- Background: Glassmorphism (white at 8% opacity)
- Title: "Case Study Results" (top, centered, white #FFFFFF 100% opacity, Inter sans-serif 20px bold)
- Metrics (below title, centered, vertical stack, 40px spacing, white #FFFFFF 70% opacity, monospace 18px):
  - "50+ Governance Docs"
  - "160+ PII Fields Classified"
  - "12 Deterministic Checks"
  - "5 Access Roles"
  - "1 API Call (Ledger Integrity)"
- Icon per metric (left of text, 24x24px, primary blue #2563EB): Document, Shield, Checkmark, User, API symbol respectively

**Customer Callout (Left Edge, 200x100px, below header, 60px from left margin):**
- Background: Glassmorphism (white at 10% opacity)
- Text: "Customer: European Pet Insurance Provider" (centered, white #FFFFFF 70% opacity, Inter sans-serif 16px)
- Icon: Pet paw (top center, 32x32px, primary blue #2563EB)

**Visual Hierarchy & Flow:**
- Primary focus: 5 pillars with left-to-right flow emphasized by arrows
- Secondary focus: Metrics panel on right for quick results glance
- Tertiary focus: Customer callout on left for context
- Color usage: Primary blue (#2563EB) for icons and key elements, success green (#16A34A) for positive outcomes, amber (#F59E0B) for technical details, error red (#EF4444) for security/critical actions
- Borders: White at 12% opacity for card and panel outlines, 1px thickness

**Typography & Icons:**
- Font: Inter sans-serif for all labels/titles, monospace for metrics and code-like text (e.g., "[PII:vault_C001:entry_42]")
- Icons: Flat, minimal line style, consistent stroke width (2px), sourced from enterprise-friendly sets like Material Icons or custom equivalents
- Text Opacity: 100% for titles, 70% for body text and secondary elements

**Final Notes for Generator/Designer:**
- Ensure alignment and symmetry across pillars for a polished, professional look
- Maintain generous spacing to avoid clutter; prioritize visual clarity over text density
- Test glassmorphism opacity (8-10%) for readability against dark background (#0A1628)
- Export as high-resolution PNG or vector format for corporate presentation use
```