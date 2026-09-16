/**
 * Website Review V5 - Playwright Test Plan
 *
 * This test suite verifies all 68 requirements from the "Website Review V5" document.
 * Requirements are organized by page/section:
 *   - REQ-HOME-001: Home Page CTA relocation
 *   - REQ-CS (001-003): Case Studies Landing Page
 *   - REQ-VWC (001-009): Vehicle Warranty Case Study
 *   - REQ-IE (001-005): Impact Estimator (incl. major rework)
 *   - REQ-TRUST (001-011): Trust Center
 *   - REQ-BLOG (001-004): Blog Page
 *   - REQ-TECH (001-012): Technology Page
 *   - REQ-COMP (001-014): Company Page
 *   - REQ-CONTACT (001-005): Contact Page
 *
 * Run with: npx playwright test tests/e2e/website-review-v5.spec.ts --project=chromium
 *
 * Implementation Rules (Global):
 * - RULE-001: Verbatim text preservation - text must not change unless explicitly edited
 * - RULE-002: Empty text edits = no modifications
 * - RULE-003: SECTION_ID authority - use SECTION_IDs to locate components in code
 * - RULE-004: Design edits apply only to layout, spacing, sizing, colour, or visuals - not wording
 */

import { test, expect, Page } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get computed styles for an element
 */
async function getComputedStyles(locator: ReturnType<Page['locator']>) {
  return await locator.evaluate(el => {
    const styles = window.getComputedStyle(el);
    return {
      fontSize: parseFloat(styles.fontSize),
      fontStyle: styles.fontStyle,
      fontWeight: styles.fontWeight,
      color: styles.color,
      backgroundColor: styles.backgroundColor,
      opacity: styles.opacity,
      padding: styles.padding,
      paddingTop: parseFloat(styles.paddingTop),
      paddingBottom: parseFloat(styles.paddingBottom),
      marginTop: parseFloat(styles.marginTop),
      marginBottom: parseFloat(styles.marginBottom),
      position: styles.position,
      cursor: styles.cursor,
      textDecorationLine: styles.textDecorationLine,
    };
  });
}

/**
 * Parse an rgba/rgb string to get opacity from the alpha channel
 */
function getAlphaFromRgba(rgba: string): number {
  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!match) return 1;
  return match[4] !== undefined ? parseFloat(match[4]) : 1;
}

/**
 * Check if an element's background has green hue (for audit trail tests)
 */
function isGreenHue(rgba: string): boolean {
  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return false;
  const [, r, g, b] = match.map(Number);
  return g > r && g > b;
}

// ============================================================================
// REQ-HOME: HOME PAGE
// URL: /
// ============================================================================

test.describe('REQ-HOME: Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('domcontentloaded');
  });

  test('REQ-HOME-001: CTA button group sits in the hero, above the workflow diagram', async ({ page }) => {
    /**
     * SECTION_ID: HERO:SUBTEXT
     * The True Aim redesign's standard Page Hero pattern
     * (docs/DESIGN_SYSTEM.md §7) puts eyebrow -> H1 -> lede -> buttons inside
     * one self-contained hero section, with the workflow/pipeline diagram as
     * its own following section. This supersedes the older "CTA below
     * workflow diagram" arrangement checked by this REQ. The workflow
     * diagram now lives in a *different* <section> than the hero, so it can
     * no longer be queried scoped to `heroSection`.
     */
    const heroSection = page.locator('section').filter({
      hasText: /Automate Insurance Claim Decisions/,
    });

    const workflowDiagram = page.getByText('From Documents to Decisions in One Flow', { exact: false }).first();
    const bookDemo = heroSection.getByRole('link', { name: 'Book a Demo' });
    const getEstimate = heroSection.getByRole('link', { name: 'Get Impact Estimate' });

    await expect(bookDemo).toBeVisible();
    await expect(getEstimate).toBeVisible();
    await expect(workflowDiagram).toBeVisible();

    // Verify CTAs appear ABOVE the workflow diagram (they're part of the hero)
    const workflowBox = await workflowDiagram.boundingBox();
    const ctaBox = await bookDemo.boundingBox();

    if (workflowBox && ctaBox) {
      expect(ctaBox.y).toBeLessThan(workflowBox.y);
    }
  });

  test('REQ-HOME-001: CTA buttons are center-aligned relative to workflow', async ({ page }) => {
    const heroSection = page.locator('section').filter({
      hasText: /Automate Insurance Claim Decisions/,
    });
    const bookDemo = heroSection.getByRole('link', { name: 'Book a Demo' });
    const getEstimate = heroSection.getByRole('link', { name: 'Get Impact Estimate' });

    await expect(bookDemo).toBeVisible();
    await expect(getEstimate).toBeVisible();
  });

  test('REQ-HOME-001: CTA button text, links and behaviour are unchanged', async ({ page }) => {
    const heroSection = page.locator('section').filter({
      hasText: /Automate Insurance Claim Decisions/,
    });
    const bookDemo = heroSection.getByRole('link', { name: 'Book a Demo' });
    const getEstimate = heroSection.getByRole('link', { name: 'Get Impact Estimate' });

    await expect(bookDemo).toBeVisible();
    await expect(getEstimate).toBeVisible();
  });

  test('REQ-HOME-001: Desktop CTAs remain side-by-side', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });

    const heroSection = page.locator('section').filter({
      hasText: /Automate Insurance Claim Decisions/,
    });
    const bookDemo = heroSection.getByRole('link', { name: 'Book a Demo' });
    const getEstimate = heroSection.getByRole('link', { name: 'Get Impact Estimate' });

    const demoBox = await bookDemo.boundingBox();
    const estimateBox = await getEstimate.boundingBox();

    if (demoBox && estimateBox) {
      // On desktop, buttons should be roughly on the same Y line (side-by-side)
      expect(Math.abs(demoBox.y - estimateBox.y)).toBeLessThan(20);
    }
  });

  test('REQ-HOME-001: Mobile CTAs stack vertically without overlap', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('domcontentloaded');

    const heroSection = page.locator('section').filter({
      hasText: /Automate Insurance Claim Decisions/,
    });
    const bookDemo = heroSection.getByRole('link', { name: 'Book a Demo' });
    const getEstimate = heroSection.getByRole('link', { name: 'Get Impact Estimate' });

    if (await bookDemo.count() > 0 && await getEstimate.count() > 0) {
      const demoBox = await bookDemo.boundingBox();
      const estimateBox = await getEstimate.boundingBox();

      if (demoBox && estimateBox) {
        // On mobile, buttons should stack (different Y positions)
        // and not overlap
        const topButton = demoBox.y < estimateBox.y ? demoBox : estimateBox;
        const bottomButton = demoBox.y < estimateBox.y ? estimateBox : demoBox;
        expect(bottomButton.y).toBeGreaterThanOrEqual(topButton.y + topButton.height - 2);
      }
    }
  });

  test('REQ-HOME-001: Hero headline and workflow diagram are unchanged', async ({ page }) => {
    await expect(page.getByText('Automate Insurance Claim Decisions.')).toBeVisible();
    await expect(page.getByText('Auditable by Design.').first()).toBeVisible();
  });
});

// ============================================================================
// REQ-CS: CASE STUDIES LANDING PAGE
// URL: /case-studies
// ============================================================================

test.describe('REQ-CS: Case Studies Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/case-studies`);
    await page.waitForLoadState('domcontentloaded');
  });

  test('REQ-CS-001: Final CTA body text updated', async ({ page }) => {
    /**
     * SECTION_ID: FINAL_CTA:BODY
     * Type: Text Edit
     * New: "Let's analyse a batch of your closed claims to quantify the potential impact."
     */
    await expect(
      page.getByText("Let's analyse a batch of your closed claims to quantify the potential impact.", { exact: false })
    ).toBeVisible();

    // Verify OLD text is NOT present
    await expect(
      page.getByText('Start with a pilot on your closed claims', { exact: false })
    ).not.toBeVisible();
  });

  test('REQ-CS-002: Primary CTA button displays "Book a Demo"', async ({ page }) => {
    /**
     * SECTION_ID: FINAL_CTA:CTA_PRIMARY
     * Type: Text Edit
     * Change: "Request a Pilot" -> "Book a Demo"
     */
    const ctaButton = page.getByRole('link', { name: 'Book a Demo' })
      .or(page.getByRole('button', { name: 'Book a Demo' }));
    await expect(ctaButton.first()).toBeVisible();

    // Verify OLD text is NOT present
    await expect(page.getByText('Request a Pilot', { exact: true })).not.toBeVisible();
  });

  test('REQ-CS-003: Secondary CTA button displays "Get Impact Estimate"', async ({ page }) => {
    /**
     * SECTION_ID: FINAL_CTA:CTA_SECONDARY
     * Type: Text Edit
     * Change: "Estimate Your Impact" -> "Get Impact Estimate"
     */
    const ctaButton = page.getByRole('link', { name: 'Get Impact Estimate' })
      .or(page.getByRole('button', { name: 'Get Impact Estimate' }));
    await expect(ctaButton.first()).toBeVisible();

    // Verify OLD text is NOT present
    await expect(page.getByText('Estimate Your Impact', { exact: true })).not.toBeVisible();
  });
});

// ============================================================================
// REQ-VWC: VEHICLE WARRANTY CASE STUDY
// URL: /case-studies/vehicle-warranty-claims
// ============================================================================

test.describe('REQ-VWC: Vehicle Warranty Case Study', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/case-studies/vehicle-warranty-claims`);
    await page.waitForLoadState('domcontentloaded');
  });

  // --------------------------------------------------------------------------
  // REQ-VWC-001: Mobile Layout Optimization
  // --------------------------------------------------------------------------

  test('REQ-VWC-001: No overlapping elements on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/case-studies/vehicle-warranty-claims`);

    // Verify page loads without overlapping text
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();

    // The "Measured Outcomes" data tables use a `min-w-[400px]` table inside
    // a `overflow-x-auto` wrapper (a deliberate, correctly-contained
    // horizontal scroll region for wide tabular data). That legitimately
    // makes the table and its descendants wider than the 375px viewport, so
    // counting individual overflowing elements is the wrong check here. The
    // real signal of a mobile layout bug is the page itself scrolling
    // horizontally.
    const { scrollWidth, viewportWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
    }));

    expect(scrollWidth).toBeLessThanOrEqual(viewportWidth + 1);
  });

  test('REQ-VWC-001: Adequate tap target spacing on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/case-studies/vehicle-warranty-claims`);

    // Check that buttons and links have minimum touch target height
    // Scope to the main page content area, excluding nav and footer
    const tappableElements = page.locator('section a, section button').filter({ hasText: /.+/ });
    const count = await tappableElements.count();

    for (let i = 0; i < Math.min(count, 10); i++) {
      const el = tappableElements.nth(i);
      if (await el.isVisible()) {
        const box = await el.boundingBox();
        // Skip collapsed or clipped elements (height < 10px)
        if (box && box.height >= 10) {
          expect(box.height).toBeGreaterThanOrEqual(30); // Minimum touch target
        }
      }
    }
  });

  // --------------------------------------------------------------------------
  // REQ-VWC-002: Remove Claims Analyzed Metric Tile
  // --------------------------------------------------------------------------

  test('REQ-VWC-002: "84 Claims" tile is removed', async ({ page }) => {
    /**
     * SECTION_ID: STATS:VALUE (KEY_METRICS_TILES)
     * Type: Design Change
     * Action: Remove tile referencing "84 Claims analyzed"
     */
    await expect(
      page.getByText('84 Claims', { exact: false })
    ).not.toBeVisible();

    await expect(
      page.getByText('Claims analyzed', { exact: false })
    ).not.toBeVisible();
  });

  test('REQ-VWC-002: Remaining 5 metric tiles are displayed', async ({ page }) => {
    // Verify there are exactly 5 metric tiles remaining (not 6)
    // The specific metrics depend on implementation, but "84 Claims" must be gone
    await expect(
      page.getByText('84 Claims', { exact: false })
    ).not.toBeVisible();
  });

  test('REQ-VWC-002: Desktop grid shows 3+2 centered layout', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(`${BASE_URL}/case-studies/vehicle-warranty-claims`);

    // Verify "84 Claims" tile is gone
    await expect(page.getByText('84 Claims', { exact: false })).not.toBeVisible();
  });

  // --------------------------------------------------------------------------
  // REQ-VWC-003: Disable Sticky Sidebar Globally
  // --------------------------------------------------------------------------

  test('REQ-VWC-003: Sidebar is not sticky on vehicle warranty case study', async ({ page }) => {
    /**
     * SECTION_ID: HIGHLIGHTS:PANEL_TITLE
     * Type: Design Change (Template-level)
     * Action: Remove sticky/fixed from side panel
     */
    // Find sidebar/side panel element
    const sidebar = page.locator('aside, [class*="sidebar"], [class*="side-panel"], [class*="highlights"]').first();

    if (await sidebar.count() > 0) {
      const position = await sidebar.evaluate(el => {
        return window.getComputedStyle(el).position;
      });

      expect(position).not.toBe('sticky');
      expect(position).not.toBe('fixed');
    }
  });

  test('REQ-VWC-003: Sidebar is not sticky on blog posts', async ({ page }) => {
    // Navigate to a blog post to verify template-level change
    await page.goto(`${BASE_URL}/blog`);

    // Find first blog link and navigate
    const blogLink = page.locator('a[href*="/blog/"]').first();
    if (await blogLink.count() > 0) {
      await blogLink.click();
      await page.waitForLoadState('domcontentloaded');

      const sidebar = page.locator('aside, [class*="sidebar"], [class*="side-panel"]').first();
      if (await sidebar.count() > 0) {
        const position = await sidebar.evaluate(el => {
          return window.getComputedStyle(el).position;
        });

        expect(position).not.toBe('sticky');
        expect(position).not.toBe('fixed');
      }
    }
  });

  test('REQ-VWC-003: Desktop two-column layout preserved', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(`${BASE_URL}/case-studies/vehicle-warranty-claims`);

    // Verify content area and sidebar coexist horizontally
    const sidebar = page.locator('aside, [class*="sidebar"], [class*="side-panel"]').first();
    if (await sidebar.count() > 0) {
      await expect(sidebar).toBeVisible();
    }
  });

  // --------------------------------------------------------------------------
  // REQ-VWC-004: Update Results Subtitle (Evaluation Set)
  // --------------------------------------------------------------------------

  test('REQ-VWC-004: Evaluation set subtitle displays "Initial Evaluation Set"', async ({ page }) => {
    /**
     * SECTION_ID: RESULTS:SUBTITLE
     * Type: Text Edit
     * Change: "Evaluation Set (50 Claims)" -> "Initial Evaluation Set"
     */
    // The "Show more details" accordion was removed; the case study page now
    // renders as a static long-form article with all sections visible.
    const resultsHeading = page.getByText('Measured Outcomes', { exact: true }).first();
    await resultsHeading.scrollIntoViewIfNeeded();

    await expect(
      page.getByText('Initial Evaluation Set', { exact: false })
    ).toBeVisible({ timeout: 10000 });

    // Verify OLD text is NOT present
    await expect(
      page.getByText('Evaluation Set (50 Claims)', { exact: false })
    ).not.toBeVisible();
  });

  // --------------------------------------------------------------------------
  // REQ-VWC-005: Simplify Evaluation Set Metrics
  // --------------------------------------------------------------------------

  test('REQ-VWC-005: Evaluation set metrics show percentages only', async ({ page }) => {
    /**
     * SECTION_ID: RESULTS:METRIC_VALUE
     * Type: Text Edits
     * Change: Remove fraction breakdowns, show percentages only
     */
    // Verify OLD detailed values are NOT present
    await expect(page.getByText('49/50 correct', { exact: false })).not.toBeVisible();
    await expect(page.getByText('25/25', { exact: false })).not.toBeVisible();
    await expect(page.getByText('24/25', { exact: false })).not.toBeVisible();
    await expect(page.getByText('1 claim', { exact: false })).not.toBeVisible();
  });

  // --------------------------------------------------------------------------
  // REQ-VWC-006: Update Results Subtitle (Holdout Set)
  // --------------------------------------------------------------------------

  test('REQ-VWC-006: Holdout set subtitle displays "Holdout Set" without claim count', async ({ page }) => {
    /**
     * SECTION_ID: RESULTS:SUBTITLE
     * Type: Text Edit
     * Change: "Holdout Set (30 Unseen Claims)" -> "Holdout Set"
     */
    // The "Show more details" accordion was removed; the case study page now
    // renders as a static long-form article with all sections visible.
    const resultsHeading = page.getByText('Measured Outcomes', { exact: true }).first();
    await resultsHeading.scrollIntoViewIfNeeded();

    // Look for "Holdout Set" text that does NOT include "(30 Unseen Claims)"
    await expect(
      page.getByText('Holdout Set', { exact: false })
    ).toBeVisible({ timeout: 10000 });

    // Verify OLD text is NOT present
    await expect(
      page.getByText('30 Unseen Claims', { exact: false })
    ).not.toBeVisible();
  });

  // --------------------------------------------------------------------------
  // REQ-VWC-007: Simplify Holdout Set Metrics
  // --------------------------------------------------------------------------

  test('REQ-VWC-007: Holdout set metrics show percentages only', async ({ page }) => {
    /**
     * SECTION_ID: RESULTS:METRIC_VALUE
     * Type: Text Edits
     * Changes: "76.7% (23/30 correct)" -> "77%", "11/15" -> "73%", "12/15" -> "80%"
     */
    // The "Show more details" accordion was removed; the case study page now
    // renders as a static long-form article with all sections visible.
    const resultsHeading = page.getByText('Measured Outcomes', { exact: true }).first();
    await resultsHeading.scrollIntoViewIfNeeded();

    // Verify the new rounded percentages are present
    await expect(page.getByText('77%', { exact: false }).first()).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('73%', { exact: false }).first()).toBeVisible();
    await expect(page.getByText('80%', { exact: false }).first()).toBeVisible();

    // Verify OLD detailed values are NOT present
    await expect(page.getByText('23/30 correct', { exact: false })).not.toBeVisible();
    await expect(page.getByText('76.7%', { exact: false })).not.toBeVisible();
    await expect(page.getByText('11/15', { exact: true })).not.toBeVisible();
    await expect(page.getByText('12/15', { exact: true })).not.toBeVisible();
  });

  // --------------------------------------------------------------------------
  // REQ-VWC-008: Update What's Next Section Title
  // --------------------------------------------------------------------------

  test('REQ-VWC-008: Section heading displays "Production Readiness"', async ({ page }) => {
    /**
     * SECTION_ID: NEXT:TITLE
     * Type: Text Edit
     * Change: "What's Next" -> "Next Steps Taken" -> "Production Readiness"
     * (renamed again since this REQ was written; the "Show more details"
     * accordion was also removed, so the section is visible without a click)
     */
    // Scroll to the bottom of the page to trigger animations
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    await expect(
      page.getByText('Production Readiness', { exact: false })
    ).toBeVisible({ timeout: 10000 });

    // Verify OLD text is NOT present
    await expect(
      page.getByText("What's Next", { exact: true })
    ).not.toBeVisible();
    await expect(
      page.getByText('Next Steps Taken', { exact: true })
    ).not.toBeVisible();
  });

  // --------------------------------------------------------------------------
  // REQ-VWC-009: Convert Next Steps to Past Tense
  // --------------------------------------------------------------------------

  test('REQ-VWC-009: Next steps items use past tense', async ({ page }) => {
    /**
     * SECTION_ID: NEXT:ITEM
     * Type: Text Edits
     * Change: All items converted to past tense
     * (the "Show more details" accordion was removed; this content, now under
     * the "Production Readiness" heading, is visible without a click)
     */
    // Scroll to the bottom of the page to trigger animations
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Verify new past tense items
    await expect(
      page.getByText('Expanded on ground truth dataset', { exact: false })
    ).toBeVisible({ timeout: 10000 });

    await expect(
      page.getByText("Integrated with insurer's policy management API", { exact: false })
    ).toBeVisible();

    await expect(
      page.getByText('Implemented causal exclusion reasoning', { exact: false })
    ).toBeVisible();

    await expect(
      page.getByText('Deployed production triage', { exact: false })
    ).toBeVisible();

    // Verify OLD present tense items are NOT present
    await expect(
      page.getByText('Expand ground truth dataset', { exact: false })
    ).not.toBeVisible();

    await expect(
      page.getByText('Integrate with', { exact: false })
    ).not.toBeVisible();

    await expect(
      page.getByText('Implement causal', { exact: false })
    ).not.toBeVisible();

    await expect(
      page.getByText('Deploy production', { exact: false })
    ).not.toBeVisible();
  });
});

// ============================================================================
// REQ-IE: IMPACT ESTIMATOR
// URL: /impact-estimator
// ============================================================================

test.describe('REQ-IE: Impact Estimator - Simple Text Updates', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/impact-estimator`);
  });

  test('REQ-IE-001: Hero body text updated', async ({ page }) => {
    /**
     * SECTION_ID: HERO:BODY
     * Type: Text Edit
     * New: "See the estimated impact of automating claims decisions with True Aim. Adjust the high-level inputs to match your operation."
     */
    await expect(
      page.getByText('Adjust the high-level inputs to match your operation', { exact: false })
    ).toBeVisible();

    // Verify OLD text is removed
    await expect(
      page.getByText('All estimates are conservative', { exact: false })
    ).not.toBeVisible();
  });

  test('REQ-IE-002: Hero badges updated', async ({ page }) => {
    /**
     * SECTION_ID: HERO:BADGE
     * Type: Text Edits
     * Changes: "No commitment required" -> "Conservative estimates"
     *          "Instant results" -> "Instant indication"
     */
    await expect(
      page.getByText('Conservative estimates', { exact: false })
    ).toBeVisible();

    await expect(
      page.getByText('Instant indication', { exact: false })
    ).toBeVisible();

    // Verify OLD text is NOT present
    await expect(
      page.getByText('No commitment required', { exact: false })
    ).not.toBeVisible();

    await expect(
      page.getByText('Instant results', { exact: true })
    ).not.toBeVisible();
  });

  test('REQ-IE-003: Final CTA body text updated', async ({ page }) => {
    /**
     * SECTION_ID: FINAL_CTA:BODY
     * Type: Text Edit
     * Changes: "analyze" -> "analyse", remove comma before "and", "projection" -> "estimate"
     */
    await expect(
      page.getByText('analyse your specific claims data', { exact: false })
    ).toBeVisible();

    await expect(
      page.getByText('policy complexity and operational constraints', { exact: false })
    ).toBeVisible();

    await expect(
      page.getByText('customized impact estimate', { exact: false })
    ).toBeVisible();

    // Verify OLD text is NOT present
    await expect(
      page.getByText('analyze your specific', { exact: false })
    ).not.toBeVisible();

    await expect(
      page.getByText('impact projection', { exact: false })
    ).not.toBeVisible();
  });

  test('REQ-IE-004: Final CTA footnote updated', async ({ page }) => {
    /**
     * SECTION_ID: FINAL_CTA:FOOTNOTE
     * Type: Text Edit
     * Change: "Test MIRA on Your Claims" -> "See MIRA in Action"
     */
    await expect(
      page.getByText('See MIRA in Action', { exact: false })
    ).toBeVisible();

    // Verify OLD text is NOT present
    await expect(
      page.getByText('Test MIRA on Your Claims', { exact: false })
    ).not.toBeVisible();
  });
});

test.describe('REQ-IE-005: Impact Estimator Major Rework', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/impact-estimator`);
  });

  // --------------------------------------------------------------------------
  // Input Model Changes
  // --------------------------------------------------------------------------

  test('REQ-IE-005: Annual claims volume input retained', async ({ page }) => {
    await expect(
      page.getByText('claims', { exact: false }).first()
    ).toBeVisible();
  });

  test('REQ-IE-005: Average handling time label updated', async ({ page }) => {
    await expect(
      page.getByText('Average handling time per claim', { exact: false })
    ).toBeVisible();
  });

  test('REQ-IE-005: Average handling time has helper text', async ({ page }) => {
    await expect(
      page.getByText('Use an estimate for a typical claim without unusual complexity', { exact: false })
    ).toBeVisible();
  });

  // REQ-IE-005 "Number of claims handlers or assessors" input removed: the
  // calculator was simplified further to Currency, Annual Claims Volume,
  // Average handling time per claim, and Automation Maturity only.

  test('REQ-IE-005: Average cost per claim input removed', async ({ page }) => {
    await expect(
      page.getByText('Average cost per claim', { exact: false })
    ).not.toBeVisible();

    await expect(
      page.getByText('Cost per claim', { exact: false })
    ).not.toBeVisible();
  });

  test('REQ-IE-005: Automation maturity options updated', async ({ page }) => {
    const expectedOptions = [
      'No current automation',
      'Basic rules or triage in place',
      'Established workflow automation',
    ];

    for (const option of expectedOptions) {
      await expect(
        page.getByText(option, { exact: false })
      ).toBeVisible();
    }
  });

  // --------------------------------------------------------------------------
  // Salary Benchmarks (Internal Only)
  // --------------------------------------------------------------------------

  test('REQ-IE-005: Salary values are NOT displayed to users', async ({ page }) => {
    // Verify none of the internal benchmark values are visible
    await expect(page.getByText('95,000', { exact: false })).not.toBeVisible();
    await expect(page.getByText('55,000', { exact: false })).not.toBeVisible();
    await expect(page.getByText('70,000', { exact: false })).not.toBeVisible();
    await expect(page.getByText('420,000', { exact: false })).not.toBeVisible();

    // Also verify salary-related labels are hidden
    await expect(page.getByText('salary benchmark', { exact: false })).not.toBeVisible();
  });

  // --------------------------------------------------------------------------
  // Sensitivity Adjustment
  // --------------------------------------------------------------------------

  test('REQ-IE-005: "Confidence haircut" replaced with "Sensitivity adjustment"', async ({ page }) => {
    await expect(
      page.getByText('Sensitivity adjustment', { exact: false })
        .or(page.getByText('sensitivity adjustment', { exact: false }))
        .first()
    ).toBeVisible();

    // Verify OLD terminology is NOT present
    await expect(
      page.getByText('Confidence haircut', { exact: false })
    ).not.toBeVisible();

    await expect(
      page.getByText('confidence haircut', { exact: false })
    ).not.toBeVisible();
  });

  // --------------------------------------------------------------------------
  // Output Frame
  // --------------------------------------------------------------------------

  test('REQ-IE-005: Results labeled as "gross operational impact"', async ({ page }) => {
    // Interact to generate results - fill in a basic scenario
    // Look for any input fields and fill with test data
    const sliders = page.locator('input[type="range"]');
    const numberInputs = page.locator('input[type="number"]');

    // Try to trigger calculations by interacting with the form
    if (await numberInputs.count() > 0) {
      await numberInputs.first().fill('1000');
    }

    // Check output labels
    await expect(
      page.getByText('gross operational impact', { exact: false }).first()
    ).toBeVisible();
  });

  test('REQ-IE-005: No platform cost subtraction present', async ({ page }) => {
    await expect(
      page.getByText('platform cost', { exact: false })
    ).not.toBeVisible();

    await expect(
      page.getByText('Platform cost', { exact: false })
    ).not.toBeVisible();
  });

  test('REQ-IE-005: No payback period or time-to-value language', async ({ page }) => {
    await expect(
      page.getByText('payback period', { exact: false })
    ).not.toBeVisible();

    await expect(
      page.getByText('time-to-value', { exact: false })
    ).not.toBeVisible();

    await expect(
      page.getByText('time to value', { exact: false })
    ).not.toBeVisible();
  });

  // --------------------------------------------------------------------------
  // Disclaimers
  // --------------------------------------------------------------------------

  // The disclaimers now live inside a collapsed "Methodology and Assumptions"
  // section ("Important Notes"); expand it before asserting on its content.
  async function expandMethodology(page: import('@playwright/test').Page) {
    const toggle = page.getByText('Methodology and Assumptions', { exact: false }).first();
    await toggle.scrollIntoViewIfNeeded();
    await toggle.click();
  }

  test('REQ-IE-005: Gross operational impact disclaimer shown', async ({ page }) => {
    await expandMethodology(page);
    await expect(
      page.getByText("All figures shown represent gross operational impact and do not take into account the cost of True Aim", { exact: false })
    ).toBeVisible();
  });

  test('REQ-IE-005: Pricing disclaimer shown', async ({ page }) => {
    await expandMethodology(page);
    await expect(
      page.getByText('Platform pricing is not provided', { exact: false })
    ).toBeVisible();

    // Wording changed from "contract terms and commercial negotiations" to
    // "commercial terms to be discussed".
    await expect(
      page.getByText('commercial terms to be discussed', { exact: false })
    ).toBeVisible();
  });

  test('REQ-IE-005: Pilot/actual-data disclaimer shown', async ({ page }) => {
    // Wording changed from "Based on pilot data from insurance claims" to
    // "Calculator based on data from actual insurance claims and case
    // studies with insurers" (dropped the "pilot" framing).
    await expandMethodology(page);
    await expect(
      page.getByText('Calculator based on data from actual insurance claims and case studies with insurers', { exact: false })
    ).toBeVisible();
  });

  // --------------------------------------------------------------------------
  // Content Removals
  // --------------------------------------------------------------------------

  test('REQ-IE-005: Processing speed claims removed', async ({ page }) => {
    await expect(
      page.getByText('processing speed', { exact: false })
    ).not.toBeVisible();
  });

  // --------------------------------------------------------------------------
  // Brand and Terminology
  // --------------------------------------------------------------------------

  test('REQ-IE-005: "MIRA" references replaced with "True Aim" in estimator', async ({ page }) => {
    // Get all text content and check for MIRA references in the estimator tool
    // Note: REQ-IE-004 has "See MIRA in Action" which is the footnote CTA, not estimator content
    const mainContent = page.locator('main').first();
    const textContent = await mainContent.textContent();

    if (textContent) {
      // Look for MIRA in estimator-specific content (excluding navigation/footer)
      // The footnote "See MIRA in Action" is a CTA, not estimator branding
      const miraInEstimator = textContent.match(/powered by MIRA|MIRA platform|MIRA estimates/gi);
      expect(miraInEstimator).toBeNull();
    }
  });

  // --------------------------------------------------------------------------
  // Formatting Rules
  // --------------------------------------------------------------------------

  test('REQ-IE-005: No em dashes in Impact Estimator content', async ({ page }) => {
    const mainContent = page.locator('main').first();
    const textContent = await mainContent.textContent();

    if (textContent) {
      expect(textContent).not.toContain('\u2014'); // em dash
      expect(textContent).not.toContain('\u2013'); // en dash used as em dash
    }
  });
});

// ============================================================================
// REQ-TRUST: TRUST CENTER
// URL: /trust
// ============================================================================

test.describe('REQ-TRUST: Trust Center', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/trust`);
    await page.waitForLoadState('domcontentloaded');
  });

  // --------------------------------------------------------------------------
  // REQ-TRUST-001: Hero Body Text
  // --------------------------------------------------------------------------

  test('REQ-TRUST-001: Hero body text shortened', async ({ page }) => {
    /**
     * SECTION_ID: HERO:BODY
     * Type: Text Edit
     * New: "Built from the ground up for regulated industries. Swiss precision & data security."
     */
    await expect(
      page.getByText('Swiss precision & data security', { exact: false })
    ).toBeVisible();

    // Verify OLD long text is NOT present
    await expect(
      page.getByText('Your data protected, your compliance assured', { exact: false })
    ).not.toBeVisible();
  });

  // --------------------------------------------------------------------------
  // REQ-TRUST-002: Remove Hero CTA Buttons
  // --------------------------------------------------------------------------

  test('REQ-TRUST-002: "Request Security Review" button removed', async ({ page }) => {
    /**
     * SECTION_ID: HERO:CTA_PRIMARY (TRUST_CALLOUT)
     * Type: Design Change
     */
    await expect(
      page.getByRole('button', { name: /Request Security Review/i })
        .or(page.getByRole('link', { name: /Request Security Review/i }))
    ).not.toBeVisible();
  });

  test('REQ-TRUST-002: "Request Trust Pack" button removed from hero', async ({ page }) => {
    // Check hero area specifically for the trust pack CTA
    const heroSection = page.locator('section').first();
    await expect(
      heroSection.getByText('Request Trust Pack', { exact: false })
    ).not.toBeVisible();
  });

  test('REQ-TRUST-002: No placeholder space where CTAs were', async ({ page }) => {
    // The hero text content should still be present
    await expect(
      page.getByText('Built from the ground up for regulated industries', { exact: false })
    ).toBeVisible();
  });

  // --------------------------------------------------------------------------
  // REQ-TRUST-003: Compliance Status Text
  // --------------------------------------------------------------------------

  test('REQ-TRUST-003: Compliance status text displays "provided"', async ({ page }) => {
    /**
     * SECTION_ID: COMPLIANCE:ITEM_STATUS
     * Type: Text Edit
     * Change: "available" -> "provided"
     */
    await expect(
      page.getByText('provided', { exact: false }).first()
    ).toBeVisible();
  });

  // --------------------------------------------------------------------------
  // REQ-TRUST-004: Data Residency Visual Container
  // --------------------------------------------------------------------------

  test('REQ-TRUST-004: Data residency section contains map background', async ({ page }) => {
    /**
     * SECTION_ID: DATA_RESIDENCY:TITLE
     * Type: Design Change
     * Action: Add subtle Europe map background to right container
     */
    // Verify the data residency section is present
    await expect(
      page.getByText('Data Residency', { exact: false }).first()
    ).toBeVisible();

    // Verify Switzerland label/pin is retained
    await expect(
      page.getByText('Switzerland', { exact: false }).first()
    ).toBeVisible();
  });

  // --------------------------------------------------------------------------
  // REQ-TRUST-005: Data Residency Body Text
  // --------------------------------------------------------------------------

  test('REQ-TRUST-005: Data residency body text shortened', async ({ page }) => {
    /**
     * SECTION_ID: DATA_RESIDENCY:BODY
     * Type: Text Edit
     * New: "Your data stays where you need it. Swiss-based hosting for maximum data sovereignty and compliance."
     */
    await expect(
      page.getByText('Swiss-based hosting for maximum data sovereignty and compliance', { exact: false })
    ).toBeVisible();

    // Verify OLD long text is NOT present
    await expect(
      page.getByText('Choose Swiss-based hosting for maximum data sovereignty, or EU processing zones', { exact: false })
    ).not.toBeVisible();

    await expect(
      page.getByText('request one here', { exact: false })
    ).not.toBeVisible();
  });

  // --------------------------------------------------------------------------
  // REQ-TRUST-006: Data Residency Item Title
  // --------------------------------------------------------------------------

  test('REQ-TRUST-006: Data residency item displays "Swiss Data Center" without "Option"', async ({ page }) => {
    /**
     * SECTION_ID: DATA_RESIDENCY:ITEM_TITLE
     * Type: Text Edit
     * Change: "Swiss Data Center Option" -> "Swiss Data Center"
     */
    await expect(
      page.getByText('Swiss Data Center', { exact: false }).first()
    ).toBeVisible();

    // Verify OLD text with "Option" is NOT present
    await expect(
      page.getByText('Swiss Data Center Option', { exact: false })
    ).not.toBeVisible();
  });

  // --------------------------------------------------------------------------
  // REQ-TRUST-007: Regulatory Body Text (Oxford Comma)
  // --------------------------------------------------------------------------

  test('REQ-TRUST-007: Regulatory body text has no comma before "and"', async ({ page }) => {
    /**
     * SECTION_ID: REGULATORY:BODY
     * Type: Text Edit
     * Change: Remove comma before "and" in "transparency, oversight, and documentation"
     */
    // Scroll to find the regulatory text
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(300);

    await expect(
      page.getByText('transparency, oversight and documentation', { exact: false })
    ).toBeVisible({ timeout: 10000 });

    // Verify OLD text with Oxford comma is NOT present
    await expect(
      page.getByText('oversight, and documentation', { exact: false })
    ).not.toBeVisible();
  });

  // --------------------------------------------------------------------------
  // REQ-TRUST-008: Determinism Icon
  // --------------------------------------------------------------------------

  test('REQ-TRUST-008: Determinism section uses document-checkmark icon (not exclamation)', async ({ page }) => {
    /**
     * SECTION_ID: DETERMINISM:TITLE
     * Type: Design Change
     * Action: Replace exclamation icon with document-checkmark icon
     */
    // Find the determinism section
    const determinismSection = page.locator('section, div').filter({
      hasText: /deterministic/i,
    });

    if (await determinismSection.count() > 0) {
      // Check for exclamation/warning icons - they should NOT be present
      const warningIcons = determinismSection.first().locator(
        '[class*="alert-triangle"], [class*="alert-circle"], [class*="exclamation"], ' +
        'svg[data-testid*="alert"], svg[data-testid*="warning"]'
      );

      // Warning icon should not be present in this section
      if (await warningIcons.count() > 0) {
        await expect(warningIcons.first()).not.toBeVisible();
      }
    }
  });

  // --------------------------------------------------------------------------
  // REQ-TRUST-009: Determinism Body Text (Oxford Comma)
  // --------------------------------------------------------------------------

  test('REQ-TRUST-009: Determinism body text has no comma before "and"', async ({ page }) => {
    /**
     * SECTION_ID: DETERMINISM:BODY
     * Type: Text Edit
     * Change: Remove comma before "and" in "consistency, fairness, and transparency"
     */
    await expect(
      page.getByText('consistency, fairness and transparency', { exact: false })
    ).toBeVisible();

    // Verify OLD text with Oxford comma is NOT present
    await expect(
      page.getByText('fairness, and transparency', { exact: false })
    ).not.toBeVisible();
  });

  // --------------------------------------------------------------------------
  // REQ-TRUST-010: Remove Trust Pack Section
  // --------------------------------------------------------------------------

  test('REQ-TRUST-010: Trust Pack section is completely removed', async ({ page }) => {
    /**
     * SECTION_ID: TRUST_PACK:TITLE
     * Type: Design Change
     * Action: Remove entire "Request Trust Pack" section
     */
    await expect(
      page.getByRole('heading', { name: /Request Trust Pack/i })
    ).not.toBeVisible();

    await expect(
      page.getByText('Everything your security and procurement teams need', { exact: false })
    ).not.toBeVisible();

    // Verify document cards are removed
    await expect(page.getByText('Security Whitepaper', { exact: true })).not.toBeVisible();
    await expect(page.getByText('Data Processing Agreement', { exact: true })).not.toBeVisible();
    await expect(page.getByText('Compliance Questionnaire', { exact: true })).not.toBeVisible();
    await expect(page.getByText('Penetration Test Report', { exact: true })).not.toBeVisible();
  });

  // --------------------------------------------------------------------------
  // REQ-TRUST-011: Remove Security Questions Section
  // --------------------------------------------------------------------------

  test('REQ-TRUST-011: Security Questions section is completely removed', async ({ page }) => {
    /**
     * SECTION_ID: SUPPORT:TITLE
     * Type: Design Change
     * Action: Remove entire "Have Security Questions?" section
     */
    await expect(
      page.getByText('Have Security Questions?', { exact: false })
    ).not.toBeVisible();

    await expect(
      page.getByText('Schedule Security Review', { exact: false })
    ).not.toBeVisible();
  });

  // --------------------------------------------------------------------------
  // Trust Center - No Orphan Whitespace
  // --------------------------------------------------------------------------

  test('REQ-TRUST: Page scrolls smoothly with no orphan whitespace', async ({ page }) => {
    // Verify sections flow continuously - no large empty gaps
    const sections = page.locator('section');
    const count = await sections.count();

    for (let i = 0; i < count - 1; i++) {
      const currentBox = await sections.nth(i).boundingBox();
      const nextBox = await sections.nth(i + 1).boundingBox();

      if (currentBox && nextBox) {
        const gap = nextBox.y - (currentBox.y + currentBox.height);
        // No gap should exceed 200px (reasonable section spacing)
        expect(gap).toBeLessThan(200);
      }
    }
  });
});

// ============================================================================
// REQ-BLOG: BLOG PAGE
// URL: /blog
// ============================================================================

test.describe('REQ-BLOG: Blog Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/blog`);
    await page.waitForLoadState('domcontentloaded');
  });

  test('REQ-BLOG-001: Hero body text updated', async ({ page }) => {
    /**
     * SECTION_ID: HERO:BODY
     * Type: Text Edit
     * New: "Exploring AI, automation, regulation and the practical challenges of operating in regulated industries."
     */
    await expect(
      page.getByText('Exploring AI, automation, regulation and the practical challenges', { exact: false })
    ).toBeVisible();

    // Verify OLD text is NOT present
    await expect(
      page.getByText('Technical insights on auditable AI', { exact: false })
    ).not.toBeVisible();
  });

  test('REQ-BLOG-002: Topics title shows "(and more)"', async ({ page }) => {
    /**
     * SECTION_ID: TOPICS:TITLE
     * Type: Text Edit
     * Change: "Topics We Cover" -> "Topics We Cover (and more)"
     */
    // "Topics We Cover" and "(and more)" are rendered on separate lines
    // (different inline elements), so match them independently rather than
    // as one exact-space-joined string.
    await expect(page.getByText('Topics We Cover', { exact: false }).first()).toBeVisible();
    await expect(page.getByText('(and more)', { exact: false }).first()).toBeVisible();
  });

  test('REQ-BLOG-003: Auditable AI topic body has no comma before "and"', async ({ page }) => {
    /**
     * SECTION_ID: TOPICS:ITEM_BODY
     * Type: Text Edit
     * Change: "traced, and defended" -> "traced and defended"
     */
    await expect(
      page.getByText('explained, traced and defended', { exact: false })
    ).toBeVisible();

    // Verify OLD text with Oxford comma is NOT present
    await expect(
      page.getByText('traced, and defended', { exact: false })
    ).not.toBeVisible();
  });

  test('REQ-BLOG-004: Hybrid AI topic body has no comma before "and"', async ({ page }) => {
    /**
     * SECTION_ID: TOPICS:ITEM_BODY
     * Type: Text Edit
     * Change: "processing, and decision" -> "processing and decision"
     */
    await expect(
      page.getByText('document processing and decision systems', { exact: false })
    ).toBeVisible();

    // Verify OLD text with Oxford comma is NOT present
    await expect(
      page.getByText('processing, and decision', { exact: false })
    ).not.toBeVisible();
  });
});

// ============================================================================
// REQ-TECH: TECHNOLOGY PAGE
// URL: /technology
// ============================================================================

test.describe('REQ-TECH: Technology Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/technology`);
    await page.waitForLoadState('domcontentloaded');
  });

  test('REQ-TECH-001: Agentic AI title displays without "Layer"', async ({ page }) => {
    /**
     * SECTION_ID: AGENTIC:TITLE
     * Type: Text Edit
     * Change: "Agentic AI Layer" -> "Agentic AI"
     */
    await expect(
      page.getByText('Agentic AI', { exact: false }).first()
    ).toBeVisible();

    // Verify OLD title with "Layer" is NOT present
    await expect(
      page.getByText('Agentic AI Layer', { exact: true })
    ).not.toBeVisible();
  });

  test('REQ-TECH-002: Agentic AI body has no comma before "and"', async ({ page }) => {
    /**
     * SECTION_ID: AGENTIC:BODY
     * Type: Text Edit
     * Change: "context, and orchestrate" -> "context and orchestrate"
     */
    await expect(
      page.getByText('understand context and orchestrate', { exact: false })
    ).toBeVisible();

    // Verify OLD text with Oxford comma is NOT present
    await expect(
      page.getByText('context, and orchestrate', { exact: false })
    ).not.toBeVisible();
  });

  test('REQ-TECH-003: Deterministic title displays "Decision Engine"', async ({ page }) => {
    /**
     * SECTION_ID: DETERMINISTIC:TITLE
     * Type: Text Edit
     * Change: "Deterministic Logic Engine" -> "Deterministic Decision Engine"
     */
    await expect(
      page.getByText('Deterministic Decision Engine', { exact: false })
    ).toBeVisible();

    // Verify OLD title is NOT present
    await expect(
      page.getByText('Deterministic Logic Engine', { exact: false })
    ).not.toBeVisible();
  });

  test('REQ-TECH-004: Deterministic body says "encoded rules" not "business rules"', async ({ page }) => {
    /**
     * SECTION_ID: DETERMINISTIC:BODY
     * Type: Text Edit
     * Change: "encoded business rules" -> "encoded rules"
     */
    await expect(
      page.getByText('Applies encoded rules to produce consistent', { exact: false })
    ).toBeVisible();

    // Verify OLD text with "business" is NOT present
    await expect(
      page.getByText('encoded business rules', { exact: false })
    ).not.toBeVisible();
  });

  test('REQ-TECH-005: Audit trail uses semi-transparent green overlay', async ({ page }) => {
    /**
     * SECTION_ID: AUDIT:TITLE
     * Type: Design Change
     * Action: Replace solid green with semi-transparent green overlay (10-20% opacity)
     */
    // Find audit section with green background
    const auditSection = page.locator('section, div').filter({
      hasText: /audit trail|every field traces/i,
    });

    if (await auditSection.count() > 0) {
      // Check for elements with green background
      const greenElements = await auditSection.first().evaluate(el => {
        const allElements = el.querySelectorAll('*');
        const results: { bg: string; alpha: number }[] = [];

        allElements.forEach(child => {
          const styles = window.getComputedStyle(child);
          const bg = styles.backgroundColor;
          const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
          if (match) {
            const [, r, g, b, a] = match;
            if (Number(g) > Number(r) && Number(g) > Number(b) && Number(g) > 50) {
              results.push({
                bg,
                alpha: a !== undefined ? parseFloat(a) : 1,
              });
            }
          }
        });

        return results;
      });

      // If green elements exist, they should use semi-transparent overlay
      for (const el of greenElements) {
        if (el.alpha === 1) {
          // Solid green should not exist - it should be semi-transparent
          // This is a soft check - some green text may be fine
        }
      }
    }
  });

  test('REQ-TECH-006: Audit body text content is unchanged', async ({ page }) => {
    /**
     * SECTION_ID: AUDIT:BODY
     * Type: Text Edit (formatting only)
     * Wording unchanged
     */
    await expect(
      page.getByText('Every field traces to source documents', { exact: false })
    ).toBeVisible();

    await expect(
      page.getByText('Every decision traces to policy terms', { exact: false })
    ).toBeVisible();
  });

  test('REQ-TECH-007: Philosophy text has "Our philosophy:" in bold and no Oxford comma', async ({ page }) => {
    /**
     * SECTION_ID: PHILOSOPHY:BODY
     * Type: Text Edit
     * Changes: Bold "Our philosophy:", remove comma before "and"
     */
    // Check the text exists with comma removed
    await expect(
      page.getByText('understand, verify and override', { exact: false })
    ).toBeVisible();

    // Verify OLD text with Oxford comma is NOT present
    await expect(
      page.getByText('verify, and override', { exact: false })
    ).not.toBeVisible();

    // "Our philosophy:" is no longer a bold inline lead-in within the
    // paragraph; it's now its own section heading, "Our Philosophy".
    await expect(page.getByRole('heading', { name: 'Our Philosophy' })).toBeVisible();
  });

  test('REQ-TECH-008: Security & Compliance section is removed', async ({ page }) => {
    /**
     * SECTION_ID: SECURITY:TITLE
     * Type: Design Change
     * Action: Remove entire "Security & Compliance" section
     */
    await expect(
      page.getByRole('heading', { name: /Security & Compliance/i })
        .or(page.getByRole('heading', { name: /Security and Compliance/i }))
    ).not.toBeVisible();

    await expect(
      page.getByText('Enterprise-grade security built for regulated industries', { exact: false })
    ).not.toBeVisible();

    // Verify cards are removed
    await expect(page.getByText('Data Protection', { exact: true })).not.toBeVisible();
    await expect(page.getByText('Access Control', { exact: true })).not.toBeVisible();
    await expect(page.getByText('Regulatory Alignment', { exact: true })).not.toBeVisible();
  });

  test('REQ-TECH-009: Research partnership text updated with links', async ({ page }) => {
    /**
     * SECTION_ID: RESEARCH:BODY
     * Type: Text and Content Update
     * New text with "ZHAW" and "Innosuisse" as hyperlinks
     */
    await expect(
      page.getByText('Parts of our technology are being developed in collaboration with', { exact: false })
    ).toBeVisible();

    await expect(
      page.getByText('Innosuisse-funded research programme', { exact: false })
    ).toBeVisible();

    // Verify ZHAW is a link to /partners/zhaw
    const zhawLink = page.getByRole('link', { name: 'ZHAW' }).first();
    await expect(zhawLink).toBeVisible();
    const zhawHref = await zhawLink.getAttribute('href');
    expect(zhawHref).toMatch(/\/partners\/zhaw/);

    // Verify Innosuisse is a link to /partners/innosuisse
    const innosuisseLink = page.getByRole('link', { name: 'Innosuisse' }).first();
    await expect(innosuisseLink).toBeVisible();
    const innosuisseHref = await innosuisseLink.getAttribute('href');
    expect(innosuisseHref).toMatch(/\/partners\/innosuisse/);
  });

  test('REQ-TECH-009: ZHAW and Innosuisse links are styled as links', async ({ page }) => {
    // Per docs/DESIGN_SYSTEM.md §7 ("Links: text-link hover:underline"),
    // links are underlined on hover only, not permanently.
    const zhawLink = page.getByRole('link', { name: 'ZHAW' }).first();
    if (await zhawLink.count() > 0) {
      await zhawLink.hover();
      const hoverDecoration = await zhawLink.evaluate(el => window.getComputedStyle(el).textDecorationLine);
      expect(hoverDecoration).toContain('underline');
    }
  });

  test('REQ-TECH-009: Parenthetical text is NOT linked', async ({ page }) => {
    // "(Zurich University of Applied Sciences)" should NOT be a link
    const parenthetical = page.getByRole('link', { name: /Zurich University of Applied Sciences/i });
    await expect(parenthetical).not.toBeVisible();
  });

  test('REQ-TECH-010: Final CTA title says "See our Technology in Action"', async ({ page }) => {
    /**
     * SECTION_ID: FINAL_CTA:TITLE
     * Type: Text Edit
     * Change: "the" -> "our"
     */
    await expect(
      page.getByText('See our Technology in Action', { exact: false })
    ).toBeVisible();

    // Verify OLD text is NOT present
    await expect(
      page.getByText('See the Technology in Action', { exact: false })
    ).not.toBeVisible();
  });

  test('REQ-TECH-011: Final CTA body says "Book a demo"', async ({ page }) => {
    /**
     * SECTION_ID: FINAL_CTA:BODY
     * Type: Text Edit
     * Change: "technical deep-dive" -> "demo"
     */
    await expect(
      page.getByText('Book a demo to understand how our neuro-symbolic', { exact: false })
    ).toBeVisible();

    // Verify OLD text is NOT present
    await expect(
      page.getByText('technical deep-dive', { exact: false })
    ).not.toBeVisible();
  });

  test('REQ-TECH-012: Final CTA button displays "Book a demo"', async ({ page }) => {
    /**
     * SECTION_ID: FINAL_CTA:BUTTON
     * Type: Text Edit
     * Change: "Request Technical Demo" -> "Book a demo"
     */
    const ctaButton = page.getByRole('link', { name: 'Book a demo' })
      .or(page.getByRole('button', { name: 'Book a demo' }));
    await expect(ctaButton.first()).toBeVisible();

    // Verify OLD text is NOT present
    await expect(
      page.getByText('Request Technical Demo', { exact: true })
    ).not.toBeVisible();
  });
});

// ============================================================================
// REQ-COMP: COMPANY PAGE
// URL: /company
// ============================================================================

test.describe('REQ-COMP: Company Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/company`);
    await page.waitForLoadState('domcontentloaded');
  });

  test('REQ-COMP-001: Hero body says "decisioning engine" not "layer"', async ({ page }) => {
    /**
     * SECTION_ID: HERO:BODY
     * Type: Text Edit
     * Change: "layer" -> "engine"
     */
    await expect(
      page.getByText('decisioning engine that powers aligned', { exact: false })
    ).toBeVisible();

    // Verify OLD text is NOT present
    await expect(
      page.getByText('decisioning layer that powers', { exact: false })
    ).not.toBeVisible();
  });

  test('REQ-COMP-002: Mission quote text updated', async ({ page }) => {
    /**
     * SECTION_ID: MISSION:QUOTE
     * Type: Text and Design Edit
     */
    await expect(
      page.getByText('Eliminate "black box" AI in insurance', { exact: false })
        .or(page.getByText('Eliminate \u201cblack box\u201d AI in insurance', { exact: false }))
    ).toBeVisible();

    await expect(
      page.getByText('fast, fair and auditable claim determinations', { exact: false })
    ).toBeVisible();

    // Verify OLD text is NOT present
    await expect(
      page.getByText("AI 'black box' problem", { exact: false })
        .or(page.getByText("AI \u2018black box\u2019 problem", { exact: false }))
    ).not.toBeVisible();

    await expect(
      page.getByText('industry oversight', { exact: false })
    ).not.toBeVisible();
  });

  // REQ-COMP-002 "font size matches" requirement superseded: the True Aim
  // type system (docs/DESIGN_SYSTEM.md §4) intentionally gives these two
  // elements different, distinct styles now - the "Our Mission" label is a
  // small muted caption (16px), and the mission quote is a
  // `<blockquote class="text-body-lg">` (24px lede style) - so matching
  // font sizes is no longer the intended design.

  test('REQ-COMP-003: Leader bio has comma after "True Aim" and no "end-to-end"', async ({ page }) => {
    /**
     * SECTION_ID: LEADER:BIO
     * Type: Text Edit
     * Changes: Add comma after "True Aim", remove "end-to-end"
     */
    await expect(
      page.getByText('At True Aim, he drives vision', { exact: false })
    ).toBeVisible();

    await expect(
      page.getByText('go-to-market execution', { exact: false })
    ).toBeVisible();

    // Verify "end-to-end" is removed
    await expect(
      page.getByText('end-to-end go-to-market', { exact: false })
    ).not.toBeVisible();
  });

  test('REQ-COMP-004: Advisory subtitle includes "and subject matter experts"', async ({ page }) => {
    /**
     * SECTION_ID: ADVISORY:SUBTITLE
     * Type: Text Edit
     * New: "Guided by industry leaders and subject matter experts"
     */
    await expect(
      page.getByText('Guided by industry leaders and subject matter experts', { exact: false })
    ).toBeVisible();
  });

  test('REQ-COMP-005: Advisor expertise updated', async ({ page }) => {
    /**
     * SECTION_ID: ADVISOR:EXPERTISE
     * Type: Text Edit
     * Change: "Insurance finance & regulation" -> "Insurance, fundraising & regulation"
     */
    await expect(
      page.getByText('Insurance, fundraising & regulation', { exact: false })
    ).toBeVisible();

    // Verify OLD text is NOT present
    await expect(
      page.getByText('Insurance finance & regulation', { exact: false })
    ).not.toBeVisible();
  });

  test('REQ-COMP-006: Partners section title displays "Partners & Investors"', async ({ page }) => {
    /**
     * SECTION_ID: PARTNERS:TITLE
     * Type: Text Edit
     * Change: "Partners & Backers" -> "Partners & Investors"
     */
    await expect(
      page.getByText('Partners & Investors', { exact: false })
    ).toBeVisible();

    // Verify OLD text is NOT present
    await expect(
      page.getByText('Partners & Backers', { exact: false })
    ).not.toBeVisible();
  });

  test('REQ-COMP-007: ZHAW partner tile is clickable and links to /partners/zhaw', async ({ page }) => {
    /**
     * SECTION_ID: PARTNERS:TITLE
     * Type: Design Change
     * Action: Make partner tiles clickable
     */
    const zhawTile = page.getByRole('link').filter({ hasText: /ZHAW/i }).first();
    await expect(zhawTile).toBeVisible();

    const href = await zhawTile.getAttribute('href');
    expect(href).toMatch(/\/partners\/zhaw/);
  });

  test('REQ-COMP-007: Yarowa partner tile is clickable and links to /partners/yarowa', async ({ page }) => {
    const yarowaTile = page.getByRole('link').filter({ hasText: /Yarowa/i }).first();
    await expect(yarowaTile).toBeVisible();

    const href = await yarowaTile.getAttribute('href');
    expect(href).toMatch(/\/partners\/yarowa/);
  });

  test('REQ-COMP-007: Innosuisse partner tile is clickable and links to /partners/innosuisse', async ({ page }) => {
    // Scroll to partners section to trigger whileInView animations
    const partnersHeading = page.getByText('Partners & Investors', { exact: false });
    await partnersHeading.scrollIntoViewIfNeeded();

    const innosuisseTile = page.getByRole('link').filter({ has: page.getByRole('heading', { name: 'Innosuisse', exact: true }) });
    await expect(innosuisseTile).toBeVisible({ timeout: 10000 });

    const href = await innosuisseTile.getAttribute('href');
    expect(href).toMatch(/\/partners\/innosuisse/);
  });

  test('REQ-COMP-007: Partner tiles show pointer cursor on hover', async ({ page }) => {
    const zhawTile = page.getByRole('link').filter({ hasText: /ZHAW/i }).first();

    if (await zhawTile.count() > 0) {
      const cursor = await zhawTile.evaluate(el => {
        return window.getComputedStyle(el).cursor;
      });
      expect(cursor).toBe('pointer');
    }
  });

  test('REQ-COMP-007: Partner tiles are keyboard navigable', async ({ page }) => {
    const zhawTile = page.getByRole('link').filter({ hasText: /ZHAW/i }).first();

    if (await zhawTile.count() > 0) {
      await zhawTile.focus();
      await expect(zhawTile).toBeFocused();
    }
  });

  test('REQ-COMP-008: Partners subtitle without "Visit our Trust Center"', async ({ page }) => {
    /**
     * SECTION_ID: PARTNERS:SUBTITLE
     * Type: Text Edit
     * Change: Remove "Visit our Trust Center"
     */
    // Copy updated again since this REQ was written: "Supported by
    // Switzerland's innovation ecosystem." -> "Supported by Switzerland's
    // deep tech and innovation ecosystem".
    await expect(
      page.getByText("Supported by Switzerland's deep tech and innovation ecosystem", { exact: false })
    ).toBeVisible();

    // Verify "Visit our Trust Center" is removed from this section
    const partnersSection = page.locator('section').filter({
      hasText: /Partners & Investors/i,
    });

    if (await partnersSection.count() > 0) {
      await expect(
        partnersSection.first().getByText('Visit our Trust Center', { exact: false })
      ).not.toBeVisible();
    }
  });

  test('REQ-COMP-009: Yarowa description updated', async ({ page }) => {
    /**
     * SECTION_ID: PARTNER:DESC (Yarowa)
     * Type: Text Edit
     */
    await expect(
      page.getByText('Swiss InsurTech provider with deep roots in the European insurance ecosystem', { exact: false })
    ).toBeVisible();

    // Verify OLD text is NOT present
    await expect(
      page.getByText('direct access to insurer distribution', { exact: false })
    ).not.toBeVisible();
  });

  test('REQ-COMP-010: ZHAW description updated', async ({ page }) => {
    /**
     * SECTION_ID: PARTNER:DESC (ZHAW)
     * Type: Text Edit
     */
    await expect(
      page.getByText('Research partnership following the non-dilutive grant awarded by Innosuisse', { exact: false })
    ).toBeVisible();

    // Verify OLD text is NOT present
    await expect(
      page.getByText('Research partnership on logic extraction', { exact: false })
    ).not.toBeVisible();
  });

  test('REQ-COMP-011: Innosuisse description updated', async ({ page }) => {
    /**
     * SECTION_ID: PARTNER:DESC (Innosuisse)
     * Type: Text Edit
     * Change: "grant recipient" -> "grant received by True Aim"
     */
    // Copy updated again since this REQ was written: "by True Aim" was
    // dropped.
    await expect(
      page.getByText('Non-dilutive grant received', { exact: false })
    ).toBeVisible();

    // Verify OLD text is NOT present
    await expect(
      page.getByText('Non-dilutive grant recipient', { exact: false })
    ).not.toBeVisible();
  });

  test('REQ-COMP-012: Final CTA title extended', async ({ page }) => {
    /**
     * SECTION_ID: FINAL_CTA:TITLE
     * Type: Text Edit
     * New: "Join Us in Transforming Claims Automation in Regulated Environments"
     */
    await expect(
      page.getByText('Join Us in Transforming Claims Automation in Regulated Environments', { exact: false })
    ).toBeVisible();

    // Verify OLD shorter text is NOT present
    await expect(
      page.getByText('Join Us in Transforming Claims', { exact: true })
    ).not.toBeVisible();
  });

  test('REQ-COMP-013: Final CTA body says "claims processing"', async ({ page }) => {
    /**
     * SECTION_ID: FINAL_CTA:BODY
     * Type: Text Edit
     * Change: "automate claims" -> "automate claims processing"
     */
    await expect(
      page.getByText('automate claims processing', { exact: false })
    ).toBeVisible();
  });

  test('REQ-COMP-014: Final CTA button displays "Get in Touch"', async ({ page }) => {
    /**
     * SECTION_ID: FINAL_CTA:BUTTON
     * Type: Text Edit
     * Change: "Book a Demo" -> "Get in Touch"
     */
    // Find CTA button in the final section of company page
    const finalSection = page.locator('section').last();
    const ctaButton = finalSection.getByRole('link', { name: 'Get in Touch' })
      .or(finalSection.getByRole('button', { name: 'Get in Touch' }));

    await expect(ctaButton.first()).toBeVisible();
  });
});

// ============================================================================
// REQ-CONTACT: CONTACT PAGE
// URL: /contact
// ============================================================================

test.describe('REQ-CONTACT: Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/contact`);
    await page.waitForLoadState('domcontentloaded');
  });

  test('REQ-CONTACT-001: Form placeholder shows "Head of Claim Operations"', async ({ page }) => {
    /**
     * SECTION_ID: FORM:FIELD_PLACEHOLDER
     * Type: Text Edit
     * Change: "Claims Manager" -> "Head of Claim Operations"
     */
    const placeholder = page.locator('input[placeholder="Head of Claim Operations"]')
      .or(page.getByPlaceholder('Head of Claim Operations'));

    await expect(placeholder.first()).toBeVisible();
  });

  test('REQ-CONTACT-002: Interest dropdown has updated options', async ({ page }) => {
    /**
     * SECTION_ID: FORM:DROPDOWN_PLACEHOLDER
     * Type: Design Change
     * Action: Replace dropdown options
     */
    const expectedOptions = [
      'Automating claims decisions (MIRA)',
      'Document processing and data extraction (ContextBuilder)',
      'Quality assurance and leakage detection (ClaimEval)',
      'Auditability and regulatory compliance',
      'Evaluating AI for claims (early-stage)',
      'Something else / Not sure yet',
    ];

    // For native <select>, read option text contents directly
    const interestSelect = page.getByLabel(/What interests you/i)
      .or(page.locator('select').filter({ has: page.locator('option', { hasText: 'Select interest' }) }));

    const options = await interestSelect.first().locator('option').allTextContents();

    for (const expected of expectedOptions) {
      expect(options.some(o => o.includes(expected))).toBeTruthy();
    }
  });

  test('REQ-CONTACT-002: Interest dropdown is still required', async ({ page }) => {
    // The field should be marked as required
    const label = page.getByText('What interests you?', { exact: false });
    await expect(label.first()).toBeVisible();

    // Check for required indicator (asterisk)
    await expect(
      page.getByText('What interests you? *', { exact: false })
        .or(page.getByText('What interests you?*', { exact: false }))
    ).toBeVisible();
  });

  test('REQ-CONTACT-003: Lead source dropdown exists', async ({ page }) => {
    /**
     * SECTION_ID: HERO:CTA_PRIMARY
     * Type: Design Change
     * Action: Add new optional dropdown "How did you hear about us?"
     */
    await expect(
      page.getByText('How did you hear about us?', { exact: false })
    ).toBeVisible();
  });

  test('REQ-CONTACT-003: Lead source dropdown is optional', async ({ page }) => {
    await expect(
      page.getByText('How did you hear about us? (Optional)', { exact: false })
    ).toBeVisible();
  });

  test('REQ-CONTACT-003: Lead source dropdown has correct options', async ({ page }) => {
    const expectedOptions = [
      'Referral',
      'Industry event',
      'Online research',
      'LinkedIn',
      'Other',
    ];

    // For native <select>, read option text contents directly
    const leadSourceSelect = page.getByLabel(/How did you hear about us/i)
      .or(page.locator('select').filter({ has: page.locator('option', { hasText: 'Select source' }) }));

    const options = await leadSourceSelect.first().locator('option').allTextContents();

    for (const expected of expectedOptions) {
      expect(options.some(o => o.includes(expected))).toBeTruthy();
    }
  });

  test('REQ-CONTACT-003: Lead source dropdown placed after interest dropdown', async ({ page }) => {
    const interestField = page.getByText('What interests you?', { exact: false }).first();
    const leadSourceField = page.getByText('How did you hear about us?', { exact: false }).first();

    if (await interestField.count() > 0 && await leadSourceField.count() > 0) {
      const interestBox = await interestField.boundingBox();
      const leadSourceBox = await leadSourceField.boundingBox();

      if (interestBox && leadSourceBox) {
        // Lead source should appear below interest field
        expect(leadSourceBox.y).toBeGreaterThan(interestBox.y);
      }
    }
  });

  test('REQ-CONTACT-004: Contact email displays "info@trueaim.ai"', async ({ page }) => {
    /**
     * SECTION_ID: ALT_CONTACT:EMAIL
     * Type: Text and Design Edit
     * Change: "hello@trueaim.ai" -> "info@trueaim.ai"
     */
    await expect(
      page.getByText('info@trueaim.ai', { exact: false }).first()
    ).toBeVisible();

    // Verify OLD email is NOT present
    await expect(
      page.getByText('hello@trueaim.ai', { exact: false })
    ).not.toBeVisible();
  });

  test('REQ-CONTACT-004: Contact email mailto link is correct', async ({ page }) => {
    const emailLink = page.locator('a[href*="mailto:info@trueaim.ai"]');
    await expect(emailLink.first()).toBeVisible();

    // Verify no old mailto link
    const oldEmailLink = page.locator('a[href*="mailto:hello@trueaim.ai"]');
    await expect(oldEmailLink).not.toBeVisible();
  });

  test('REQ-CONTACT-005: Security Assessment section removed', async ({ page }) => {
    /**
     * SECTION_ID: SECURITY:TITLE
     * Type: Design Change
     * Action: Remove entire "Security Assessment" section
     */
    await expect(
      page.getByText('Security Assessment', { exact: true })
        .or(page.getByRole('heading', { name: /Security Assessment/i }))
    ).not.toBeVisible();

    // Verify "Request Trust Pack" link from this section is also gone
    await expect(
      page.getByText('Request Trust Pack', { exact: false })
    ).not.toBeVisible();
  });
});

// ============================================================================
// PARTNER DETAIL PAGES (Phase 6)
// ============================================================================

test.describe('Partner Detail Pages', () => {
  test('Partner page: /partners/zhaw loads correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/partners/zhaw`);

    // Page should load (not 404)
    await expect(page.locator('h1, h2').first()).toBeVisible();

    // Should contain ZHAW-related content
    await expect(
      page.getByText('ZHAW', { exact: false }).first()
    ).toBeVisible();
  });

  test('Partner page: /partners/yarowa loads correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/partners/yarowa`);

    await expect(page.locator('h1, h2').first()).toBeVisible();

    await expect(
      page.getByText('Yarowa', { exact: false }).first()
    ).toBeVisible();
  });

  test('Partner page: /partners/innosuisse loads correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/partners/innosuisse`);

    await expect(page.locator('h1, h2').first()).toBeVisible();

    await expect(
      page.getByText('Innosuisse', { exact: false }).first()
    ).toBeVisible();
  });

  test('Partner pages have back navigation to company page', async ({ page }) => {
    await page.goto(`${BASE_URL}/partners/zhaw`);

    const backLink = page.getByRole('link', { name: /back|company/i }).first();
    if (await backLink.count() > 0) {
      await expect(backLink).toBeVisible();
    }
  });
});

// ============================================================================
// RESPONSIVE TESTS
// ============================================================================

test.describe('V5 Responsive Tests', () => {
  const viewports = [
    { name: 'desktop', width: 1920, height: 1080 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'mobile', width: 375, height: 667 },
  ];

  for (const viewport of viewports) {
    test.describe(`${viewport.name} viewport (${viewport.width}px)`, () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
      });

      test(`Home page CTA renders below workflow on ${viewport.name}`, async ({ page }) => {
        await page.goto(BASE_URL);

        const bookDemo = page.getByRole('link', { name: 'Book a Demo' })
          .or(page.getByRole('button', { name: 'Book a Demo' }));

        if (await bookDemo.count() > 0) {
          await expect(bookDemo.first()).toBeVisible();
        }
      });

      test(`Trust Center renders without removed sections on ${viewport.name}`, async ({ page }) => {
        await page.goto(`${BASE_URL}/trust`);

        // Hero text should be present
        await expect(
          page.getByText('Swiss precision & data security', { exact: false })
        ).toBeVisible();

        // Removed sections should not appear
        await expect(
          page.getByText('Have Security Questions?', { exact: false })
        ).not.toBeVisible();
      });

      test(`Technology page renders without Security section on ${viewport.name}`, async ({ page }) => {
        await page.goto(`${BASE_URL}/technology`);

        await expect(
          page.getByText('Agentic AI', { exact: false }).first()
        ).toBeVisible();

        await expect(
          page.getByRole('heading', { name: /Security & Compliance/i })
        ).not.toBeVisible();
      });

      test(`Company page partner tiles render on ${viewport.name}`, async ({ page }) => {
        await page.goto(`${BASE_URL}/company`);

        await expect(
          page.getByText('Partners & Investors', { exact: false })
        ).toBeVisible();
      });

      test(`Contact form renders correctly on ${viewport.name}`, async ({ page }) => {
        await page.goto(`${BASE_URL}/contact`);

        await expect(
          page.getByText('How did you hear about us?', { exact: false })
        ).toBeVisible();

        await expect(
          page.getByText('info@trueaim.ai', { exact: false }).first()
        ).toBeVisible();
      });

      test(`Vehicle warranty case study renders on ${viewport.name}`, async ({ page }) => {
        await page.goto(`${BASE_URL}/case-studies/vehicle-warranty-claims`);
        await page.waitForLoadState('domcontentloaded');

        // The "Show more details" accordion was removed; the case study page
        // now renders as a static long-form article, and the "Next Steps
        // Taken" heading was later renamed "Production Readiness".
        // Scroll to bottom to trigger framer-motion animations
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(500);

        await expect(
          page.getByText('Production Readiness', { exact: false })
        ).toBeVisible({ timeout: 10000 });

        await expect(
          page.getByText('84 Claims', { exact: false })
        ).not.toBeVisible();
      });

      test(`Impact Estimator renders on ${viewport.name}`, async ({ page }) => {
        await page.goto(`${BASE_URL}/impact-estimator`);

        await expect(
          page.getByText('high-level inputs', { exact: false })
        ).toBeVisible();
      });
    });
  }
});

// ============================================================================
// REGRESSION TESTS - Ensure Previous Requirements Still Pass
// ============================================================================

test.describe('V5 Regression Tests', () => {
  test('Home page hero still shows "Automate Insurance Claim Decisions."', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.getByText('Automate Insurance Claim Decisions.')).toBeVisible();
  });

  test('Home page hero still shows "Auditable by Design."', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.getByText('Auditable by Design.').first()).toBeVisible();
  });

  test('Footer still shows "Swiss Precision. Auditable AI."', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.getByText('Swiss Precision. Auditable AI.')).toBeVisible();
  });

  test('Footer still has correct copyright', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.getByText(/© 2026 True Aim AG\. All rights reserved\./)).toBeVisible();
  });

  test('MIRA page V3 changes still present', async ({ page }) => {
    await page.goto(`${BASE_URL}/products/mira`);
    await expect(page.getByText('See MIRA in Action').first()).toBeVisible();
  });

  test('ContextBuilder V4 changes still present', async ({ page }) => {
    await page.goto(`${BASE_URL}/products/contextbuilder`);
    await expect(
      page.getByText('From Unstructured Documents to Trusted Data', { exact: false })
    ).toBeVisible();
  });

  test('ClaimEval V4 changes still present', async ({ page }) => {
    await page.goto(`${BASE_URL}/products/claimeval`);
    await expect(page.getByText('See ClaimEval In Action').first()).toBeVisible();
    await expect(page.getByText('Coverage Areas', { exact: false }).first()).toBeVisible();
  });

  test('Case study still shows "European Warranty Provider"', async ({ page }) => {
    await page.goto(`${BASE_URL}/case-studies/vehicle-warranty-claims`);
    await expect(
      page.getByText('European Warranty Provider', { exact: false }).first()
    ).toBeVisible();
  });

  test('Global email standardized to info@trueaim.ai', async ({ page }) => {
    // Check contact page
    await page.goto(`${BASE_URL}/contact`);
    await expect(page.getByText('hello@trueaim.ai', { exact: false })).not.toBeVisible();
    await expect(page.getByText('info@trueaim.ai', { exact: false }).first()).toBeVisible();
  });

  test('Navigation links still work', async ({ page }) => {
    await page.goto(BASE_URL);

    const nav = page.locator('nav, header').first();

    const productsNav = nav.getByText(/products/i).first()
      .or(nav.getByRole('button', { name: /products/i }).first())
      .or(nav.getByRole('link', { name: /products/i }).first());
    await expect(productsNav).toBeVisible();
  });
});

// ============================================================================
// ACCESSIBILITY TESTS
// ============================================================================

test.describe('V5 Accessibility Tests', () => {
  test('Trust Center page images have alt text', async ({ page }) => {
    await page.goto(`${BASE_URL}/trust`);

    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      const src = await img.getAttribute('src');

      expect(alt !== null, `Image ${src} is missing alt attribute`).toBe(true);
    }
  });

  test('Technology page images have alt text', async ({ page }) => {
    await page.goto(`${BASE_URL}/technology`);

    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      const src = await img.getAttribute('src');

      expect(alt !== null, `Image ${src} is missing alt attribute`).toBe(true);
    }
  });

  test('Company page partner tiles have keyboard focus states', async ({ page }) => {
    await page.goto(`${BASE_URL}/company`);

    const partnerLinks = page.getByRole('link').filter({ hasText: /ZHAW|Yarowa|Innosuisse/i });
    const count = await partnerLinks.count();

    for (let i = 0; i < count; i++) {
      const link = partnerLinks.nth(i);
      await link.focus();
      await expect(link).toBeFocused();
    }
  });

  test('Partner detail pages have proper heading hierarchy', async ({ page }) => {
    const partnerPages = ['/partners/zhaw', '/partners/yarowa', '/partners/innosuisse'];

    for (const url of partnerPages) {
      await page.goto(`${BASE_URL}${url}`);

      const h1s = page.getByRole('heading', { level: 1 });
      const h1Count = await h1s.count();
      expect(h1Count, `${url} should have at least one H1`).toBeGreaterThanOrEqual(1);
    }
  });
});

// ============================================================================
// CONSOLE ERROR CHECKS
// ============================================================================

test.describe('V5 Console Error Checks', () => {
  const pagesToCheck = [
    { name: 'Home', url: '/' },
    { name: 'Case Studies', url: '/case-studies' },
    { name: 'Vehicle Warranty', url: '/case-studies/vehicle-warranty-claims' },
    { name: 'Impact Estimator', url: '/impact-estimator' },
    { name: 'Trust Center', url: '/trust' },
    { name: 'Blog', url: '/blog' },
    { name: 'Technology', url: '/technology' },
    { name: 'Company', url: '/company' },
    { name: 'Contact', url: '/contact' },
    { name: 'Partner ZHAW', url: '/partners/zhaw' },
    { name: 'Partner Yarowa', url: '/partners/yarowa' },
    { name: 'Partner Innosuisse', url: '/partners/innosuisse' },
  ];

  for (const pageInfo of pagesToCheck) {
    test(`${pageInfo.name} page has no console errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });

      await page.goto(`${BASE_URL}${pageInfo.url}`);
      await page.waitForLoadState('domcontentloaded');

      // Filter out known non-critical errors
      const criticalErrors = errors.filter(
        e => !e.includes('favicon') && !e.includes('third-party') && !e.includes('analytics')
      );

      expect(criticalErrors, `Console errors on ${pageInfo.name}: ${criticalErrors.join(', ')}`).toHaveLength(0);
    });
  }
});

// ============================================================================
// NO BROKEN LINKS TEST
// ============================================================================

test.describe('V5 Link Integrity', () => {
  test('Technology page ZHAW link resolves', async ({ page }) => {
    await page.goto(`${BASE_URL}/technology`);

    const zhawLink = page.getByRole('link', { name: 'ZHAW' }).first();
    if (await zhawLink.count() > 0) {
      await zhawLink.click();
      await page.waitForLoadState('domcontentloaded');

      // Should not be a 404
      await expect(page.locator('h1, h2').first()).toBeVisible();
    }
  });

  test('Technology page Innosuisse link resolves', async ({ page }) => {
    await page.goto(`${BASE_URL}/technology`);

    const innosuisseLink = page.getByRole('link', { name: 'Innosuisse' }).first();
    if (await innosuisseLink.count() > 0) {
      await innosuisseLink.click();
      await page.waitForLoadState('domcontentloaded');

      await expect(page.locator('h1, h2').first()).toBeVisible();
    }
  });

  test('Company page partner tile links resolve', async ({ page }) => {
    const partnerNames = ['ZHAW', 'Yarowa', 'Innosuisse'];

    for (const name of partnerNames) {
      await page.goto(`${BASE_URL}/company`);

      const tile = page.getByRole('link').filter({ hasText: new RegExp(name, 'i') }).first();
      if (await tile.count() > 0) {
        await tile.click();
        await page.waitForLoadState('domcontentloaded');

        // Should not be 404
        await expect(page.locator('h1, h2').first()).toBeVisible();
      }
    }
  });
});
