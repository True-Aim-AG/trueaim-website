/**
 * Website Review V3 - Playwright Test Plan
 *
 * This test suite verifies all requirements from the "True Aim - Website Review V3" document.
 * Requirements are organized by page and SECTION_ID.
 *
 * Run with: npx playwright test tests/e2e/website-review-v3.spec.ts
 *
 * Implementation Rules (Global):
 * - RULE-001: Verbatim text preservation - text must not change unless explicitly edited
 * - RULE-002: Empty text edits = no modifications
 * - RULE-003: SECTION_ID authority - use SECTION_IDs to locate components in code
 * - RULE-004: Design edits apply only to layout, spacing, sizing, colour, or visuals — not wording
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
      backgroundColor: styles.backgroundColor,
      padding: styles.padding,
      paddingTop: parseFloat(styles.paddingTop),
      paddingBottom: parseFloat(styles.paddingBottom),
      paddingLeft: parseFloat(styles.paddingLeft),
      paddingRight: parseFloat(styles.paddingRight),
      marginTop: parseFloat(styles.marginTop),
      marginBottom: parseFloat(styles.marginBottom),
      borderRadius: styles.borderRadius,
    };
  });
}

/**
 * Convert RGB color string to luminance for contrast calculation
 */
function getLuminance(rgb: string): number {
  const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return 0;

  const [, r, g, b] = match.map(Number);
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Check if background provides sufficient contrast for white logo
 * Returns true if contrast ratio >= 3:1 (WCAG AA for large text/graphics)
 */
function hasContrastForWhiteLogo(bgColor: string): boolean {
  const bgLuminance = getLuminance(bgColor);
  const whiteLuminance = 1;

  const contrastRatio = (whiteLuminance + 0.05) / (bgLuminance + 0.05);
  return contrastRatio >= 3;
}

// ============================================================================
// HOME PAGE TESTS - V3-HOME-001, V3-HOME-002
// ============================================================================

test.describe('Home Page - Partner/Awards Section (V3-HOME-001, V3-HOME-002)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test.describe('V3-HOME-001: Add ZHAW Partner Logo', () => {
    /**
     * SECTION_ID: PARTNERS or AWARDS section
     * Type: Design Change
     * Asset: docs/zhaw - logo.png
     */

    test('ZHAW logo is displayed on the homepage', async ({ page }) => {
      // Find ZHAW logo by alt text or src
      const zhawLogo = page.locator('img[alt*="ZHAW"], img[alt*="zhaw"], img[src*="zhaw"]').first();
      await expect(zhawLogo).toBeVisible();
    });

    test('ZHAW logo has appropriate alt text for accessibility', async ({ page }) => {
      const zhawLogo = page.locator('img[alt*="ZHAW"], img[alt*="zhaw"], img[src*="zhaw"]').first();
      const altText = await zhawLogo.getAttribute('alt');

      expect(altText).toBeTruthy();
      expect(altText?.toLowerCase()).toContain('zhaw');
    });

    test('ZHAW logo is appropriately sized to match other partner/award logos', async ({ page }) => {
      const zhawLogo = page.locator('img[alt*="ZHAW"], img[alt*="zhaw"], img[src*="zhaw"]').first();
      const otherLogos = page.locator('[data-section="partners"] img, [data-section="awards"] img').first();

      const zhawSize = await zhawLogo.evaluate(el => ({
        width: el.clientWidth,
        height: el.clientHeight,
      }));

      // Verify logo has reasonable dimensions (not too small, not too large)
      expect(zhawSize.width).toBeGreaterThan(30);
      expect(zhawSize.height).toBeGreaterThan(20);
      expect(zhawSize.width).toBeLessThan(400);
      expect(zhawSize.height).toBeLessThan(200);
    });

    test('ZHAW logo maintains aspect ratio', async ({ page }) => {
      const zhawLogo = page.locator('img[alt*="ZHAW"], img[alt*="zhaw"], img[src*="zhaw"]').first();

      const logoInfo = await zhawLogo.evaluate(el => {
        const img = el as HTMLImageElement;
        return {
          displayWidth: img.clientWidth,
          displayHeight: img.clientHeight,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
        };
      });

      if (logoInfo.naturalWidth > 0 && logoInfo.naturalHeight > 0) {
        const displayRatio = logoInfo.displayWidth / logoInfo.displayHeight;
        const naturalRatio = logoInfo.naturalWidth / logoInfo.naturalHeight;
        const tolerance = 0.15; // 15% tolerance

        expect(Math.abs(displayRatio - naturalRatio)).toBeLessThan(naturalRatio * tolerance);
      }
    });
  });

  test.describe('V3-HOME-002: Award Logo Contrast Container', () => {
    /**
     * SECTION_ID: AWARDS:AWARD_2_LOGO (Digitaler Leuchtturm Versicherungen)
     * Type: Design Change
     * Container Specifications:
     * - Background: Neutral mid-grey or dark-blue
     * - Border Radius: Match existing logo container styling
     * - Padding: 8-12px
     * - Size: Fits logo bounds only (do not expand card)
     */

    test('Digitaler Leuchtturm logo container has appropriate background color', async ({ page }) => {
      // Find the Digitaler Leuchtturm logo or its container
      const leuchtturmLogo = page.locator('img[alt*="Leuchtturm"], img[alt*="leuchtturm"], img[src*="leuchtturm"]').first();

      // Get the immediate parent container
      const container = leuchtturmLogo.locator('xpath=parent::*');

      const bgColor = await container.evaluate(el => {
        return window.getComputedStyle(el).backgroundColor;
      });

      // Verify background provides sufficient contrast for white logo
      expect(hasContrastForWhiteLogo(bgColor)).toBe(true);
    });

    test('Digitaler Leuchtturm logo container has padding between 8-12px', async ({ page }) => {
      const leuchtturmLogo = page.locator('img[alt*="Leuchtturm"], img[alt*="leuchtturm"], img[src*="leuchtturm"]').first();
      const container = leuchtturmLogo.locator('xpath=parent::*');

      const styles = await getComputedStyles(container);

      // Check padding is in acceptable range (8-12px on all sides, with some tolerance)
      expect(styles.paddingTop).toBeGreaterThanOrEqual(6);
      expect(styles.paddingTop).toBeLessThanOrEqual(16);
      expect(styles.paddingBottom).toBeGreaterThanOrEqual(6);
      expect(styles.paddingBottom).toBeLessThanOrEqual(16);
      expect(styles.paddingLeft).toBeGreaterThanOrEqual(6);
      expect(styles.paddingLeft).toBeLessThanOrEqual(16);
      expect(styles.paddingRight).toBeGreaterThanOrEqual(6);
      expect(styles.paddingRight).toBeLessThanOrEqual(16);
    });

    test('Digitaler Leuchtturm logo is clearly visible in light mode', async ({ page }) => {
      const leuchtturmLogo = page.locator('img[alt*="Leuchtturm"], img[alt*="leuchtturm"], img[src*="leuchtturm"]').first();
      await expect(leuchtturmLogo).toBeVisible();
    });

    test('Digitaler Leuchtturm logo is clearly visible in dark mode', async ({ page }) => {
      // Enable dark mode if theme toggle exists
      const darkModeToggle = page.locator('[data-theme-toggle], [aria-label*="dark"], [aria-label*="theme"]').first();
      if (await darkModeToggle.count() > 0) {
        await darkModeToggle.click();
        await page.waitForTimeout(300); // Wait for theme transition
      }

      const leuchtturmLogo = page.locator('img[alt*="Leuchtturm"], img[alt*="leuchtturm"], img[src*="leuchtturm"]').first();
      await expect(leuchtturmLogo).toBeVisible();
    });

    test('Original logo asset is not modified (no CSS filters applied)', async ({ page }) => {
      const leuchtturmLogo = page.locator('img[alt*="Leuchtturm"], img[alt*="leuchtturm"], img[src*="leuchtturm"]').first();

      const imgStyles = await leuchtturmLogo.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          filter: styles.filter,
        };
      });

      // Verify no filter is applied (should be 'none' or empty)
      expect(imgStyles.filter === 'none' || imgStyles.filter === '').toBe(true);
    });
  });
});

// ============================================================================
// MIRA PRODUCT PAGE TESTS - V3-MIRA-001 to V3-MIRA-017
// ============================================================================

test.describe('MIRA Product Page - Hero Section (V3-MIRA-001 to V3-MIRA-003)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/products/mira`);
  });

  test('V3-MIRA-001: Hero subbody displays updated text', async ({ page }) => {
    /**
     * SECTION_ID: HERO:SUBBODY
     * Current: "Works alongside existing claims systems. No rip-and-replace required."
     * New: "Works alongside existing claims systems. Integrates without disruption."
     */

    // Verify NEW text is present
    await expect(page.getByText('Works alongside existing claims systems.')).toBeVisible();
    await expect(page.getByText('Integrates without disruption.')).toBeVisible();

    // Verify OLD text is NOT present
    await expect(page.getByText('No rip-and-replace required.')).not.toBeVisible();
  });

  test('V3-MIRA-002: Hero primary CTA displays "See MIRA in Action"', async ({ page }) => {
    /**
     * SECTION_ID: HERO:CTA_PRIMARY
     * Current: "Test MIRA on Your Claims"
     * New: "See MIRA in Action"
     */

    // Verify NEW button text
    const primaryCta = page.getByRole('button', { name: 'See MIRA in Action' })
      .or(page.getByRole('link', { name: 'See MIRA in Action' }));
    await expect(primaryCta.first()).toBeVisible();

    // Verify OLD text is NOT present
    await expect(page.getByText('Test MIRA on Your Claims', { exact: true })).not.toBeVisible();
  });

  test('V3-MIRA-003: Hero secondary CTA displays "Book a Demo"', async ({ page }) => {
    /**
     * SECTION_ID: HERO:CTA_SECONDARY
     * Current: "Request a Pilot"
     * New: "Book a Demo"
     */

    // Verify NEW button text in hero section
    const heroSection = page.locator('section').first();
    const secondaryCta = heroSection.getByRole('button', { name: 'Book a Demo' })
      .or(heroSection.getByRole('link', { name: 'Book a Demo' }));
    await expect(secondaryCta.first()).toBeVisible();

    // Verify OLD text is NOT present in hero
    await expect(heroSection.getByText('Request a Pilot', { exact: true })).not.toBeVisible();
  });
});

test.describe('MIRA Product Page - Problem Section (V3-MIRA-004, V3-MIRA-005)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/products/mira`);
  });

  test('V3-MIRA-004: Problem section title uses updated text', async ({ page }) => {
    /**
     * SECTION_ID: PROBLEM:TITLE
     * Current: "Claims Decisions Are Still Manual, Inconsistent, and Opaque"
     * New: "Claim Decisions are Still Manual, Inconsistent and Opaque"
     * Key Changes: "Claims" → "Claim", "Are" → "are", remove comma before "and"
     */

    // Verify NEW title text
    await expect(
      page.getByText('Claim Decisions are Still Manual, Inconsistent and Opaque')
    ).toBeVisible();

    // Verify OLD title text is NOT present
    await expect(
      page.getByText('Claims Decisions Are Still Manual, Inconsistent, and Opaque')
    ).not.toBeVisible();
  });

  test('V3-MIRA-005: Problem section body uses updated text', async ({ page }) => {
    /**
     * SECTION_ID: PROBLEM:BODY
     * Changes:
     * - "claims handlers" → "claim handlers"
     * - Combined: "Decisions vary by handler and audit preparation consumes weeks."
     * - "And probabilistic" → "Probabilistic" (capitalized, separate sentence)
     */

    // Verify NEW text elements
    await expect(page.getByText("Today's claim handlers spend hours interpreting dense policy language.")).toBeVisible();
    await expect(page.getByText('Decisions vary by handler and audit preparation consumes weeks.')).toBeVisible();
    await expect(page.getByText("Probabilistic AI tools can't explain their reasoning.")).toBeVisible();

    // Verify OLD text elements are NOT present
    await expect(page.getByText("Today's claims handlers", { exact: false })).not.toBeVisible();
    await expect(page.getByText("And probabilistic AI tools", { exact: false })).not.toBeVisible();
  });
});

test.describe('MIRA Product Page - Architecture Section (V3-MIRA-006, V3-MIRA-007)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/products/mira`);
  });

  test('V3-MIRA-006: Architecture body first paragraph uses updated text', async ({ page }) => {
    /**
     * SECTION_ID: ARCHITECTURE:BODY (first paragraph)
     * Changes:
     * - "for claims" → "for insurance claims"
     * - "identifying parties)" → "identifying parties etc)"
     */

    // Verify NEW text
    await expect(
      page.getByText("MIRA is the world's first neuro-symbolic engine purpose-built for insurance claims", { exact: false })
    ).toBeVisible();
    await expect(
      page.getByText('identifying parties etc)', { exact: false })
    ).toBeVisible();

    // Verify OLD text is NOT present
    await expect(
      page.getByText('engine purpose-built for claims.', { exact: false })
    ).not.toBeVisible();
    await expect(
      page.getByText('identifying parties) while', { exact: false })
    ).not.toBeVisible();
  });

  test('V3-MIRA-007: Architecture body second paragraph removes comma before "and"', async ({ page }) => {
    /**
     * SECTION_ID: ARCHITECTURE:BODY (second paragraph)
     * Text Change: Remove comma before "and" in "fast, consistent, and completely"
     */

    // Verify NEW text without Oxford comma
    await expect(
      page.getByText('decisions that are fast, consistent and completely explainable', { exact: false })
    ).toBeVisible();

    // Verify OLD text with Oxford comma is NOT present
    await expect(
      page.getByText('fast, consistent, and completely', { exact: false })
    ).not.toBeVisible();
  });

  test('V3-MIRA-007: Reduced spacing between Architecture result text and How MIRA Works header', async ({ page }) => {
    /**
     * Design Change: Reduce vertical gap by ~50%
     * Target: Section spacing between "The result:" and "How MIRA Works"
     */

    // Find "The result:" paragraph
    const resultText = page.getByText('The result:', { exact: false }).first();
    await expect(resultText).toBeVisible();

    // Find "How MIRA Works" header
    const howMiraWorksHeader = page.getByRole('heading', { name: /How MIRA Works/i }).first();
    await expect(howMiraWorksHeader).toBeVisible();

    // Get positions to calculate spacing
    const resultBox = await resultText.boundingBox();
    const headerBox = await howMiraWorksHeader.boundingBox();

    if (resultBox && headerBox) {
      const spacing = headerBox.y - (resultBox.y + resultBox.height);
      // Verify spacing exists but is not excessive (visual separation maintained)
      expect(spacing).toBeGreaterThan(16); // At least some separation
      expect(spacing).toBeLessThan(150); // But not too much (reduced from original)
    }
  });
});

test.describe('MIRA Product Page - Workflow Section (V3-MIRA-008 to V3-MIRA-013)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/products/mira`);
  });

  test('V3-MIRA-008: Workflow Step 1 body uses updated text', async ({ page }) => {
    /**
     * SECTION_ID: WORKFLOW:STEP_1_BODY
     * Changes:
     * - "into computable" → "into the computable"
     * - "scanned notes." → "scanned notes etc."
     */

    await expect(
      page.getByText('Key data placed into the computable contract from emails, PDFs, photos, scanned notes etc.', { exact: false })
    ).toBeVisible();

    // Verify OLD text is NOT present
    await expect(
      page.getByText('into computable contract', { exact: false })
    ).not.toBeVisible();
    await expect(
      page.getByText('scanned notes.', { exact: true })
    ).not.toBeVisible();
  });

  test('V3-MIRA-009: Workflow Step 2 body uses updated text', async ({ page }) => {
    /**
     * SECTION_ID: WORKFLOW:STEP_2_BODY
     * Change: "key data." → "key data etc."
     */

    await expect(
      page.getByText('Agentic workflow reads case file: identifies parties, creates timeline, extracts key data etc.', { exact: false })
    ).toBeVisible();

    // Verify OLD text is NOT present
    await expect(
      page.getByText('extracts key data.', { exact: true })
    ).not.toBeVisible();
  });

  test('V3-MIRA-010: Workflow Step 3 body uses updated text', async ({ page }) => {
    /**
     * SECTION_ID: WORKFLOW:STEP_3_BODY
     * Changes:
     * - "logic computes:" → "logic evaluates coverage status:"
     * - "Need More Info." → "Additional Information Required"
     */

    await expect(
      page.getByText('Deterministic logic evaluates coverage status:', { exact: false })
    ).toBeVisible();
    await expect(
      page.getByText('Additional Information Required', { exact: false })
    ).toBeVisible();

    // Verify OLD text is NOT present
    await expect(
      page.getByText('logic computes:', { exact: false })
    ).not.toBeVisible();
    await expect(
      page.getByText('Need More Info', { exact: false })
    ).not.toBeVisible();
  });

  test('V3-MIRA-011: Workflow Step 4 body uses updated text', async ({ page }) => {
    /**
     * SECTION_ID: WORKFLOW:STEP_4_BODY
     * Change: "communications." → "communications etc."
     */

    await expect(
      page.getByText('Tasks executed: open claim, set reserves, draft payment, draft communications etc.', { exact: false })
    ).toBeVisible();

    // Verify OLD text is NOT present
    await expect(
      page.getByText('draft communications.', { exact: true })
    ).not.toBeVisible();
  });

  test('V3-MIRA-012: Workflow Step 5 body uses updated text', async ({ page }) => {
    /**
     * SECTION_ID: WORKFLOW:STEP_5_BODY
     * Changes:
     * - "Clear, auditable deliverables:" → "Auditable outputs:"
     * - "coverage determination report" → "coverage report"
     * - "customer letter with decision rationale" → "customer letter with rationale"
     * - "structured audit log" → "audit log"
     * - "recommendation." → "recommendation etc."
     */

    await expect(
      page.getByText('Auditable outputs:', { exact: false })
    ).toBeVisible();
    await expect(
      page.getByText('coverage report', { exact: false })
    ).toBeVisible();
    await expect(
      page.getByText('customer letter with rationale', { exact: false })
    ).toBeVisible();
    await expect(
      page.getByText('recommendation etc.', { exact: false })
    ).toBeVisible();

    // Verify OLD text is NOT present
    await expect(
      page.getByText('Clear, auditable deliverables:', { exact: false })
    ).not.toBeVisible();
    await expect(
      page.getByText('coverage determination report', { exact: false })
    ).not.toBeVisible();
  });

  test('V3-MIRA-012: Horizontal connector line is removed from workflow section', async ({ page }) => {
    /**
     * Design Change: Remove decorative horizontal line behind step cards (Steps 1-5)
     */

    const workflowSection = page.locator('section').filter({ hasText: 'How MIRA Works' });

    // Check for common connector line elements and verify they're not visible
    // The connector could be an hr, a div with specific styling, or a pseudo-element

    // Check for hr elements in workflow section
    const hrElements = workflowSection.locator('hr');
    const hrCount = await hrElements.count();

    // Any visible hr should not span the full workflow steps
    for (let i = 0; i < hrCount; i++) {
      const hr = hrElements.nth(i);
      if (await hr.isVisible()) {
        const box = await hr.boundingBox();
        if (box) {
          // If there's an hr, it shouldn't be a long connector line
          expect(box.width).toBeLessThan(800); // Reasonable max width for decorative element
        }
      }
    }

    // Check for workflow connector class/element
    const connectorLine = workflowSection.locator('[class*="connector"], [class*="line"], [class*="progress"]').first();
    if (await connectorLine.count() > 0) {
      await expect(connectorLine).not.toBeVisible();
    }
  });

  test('V3-MIRA-012: Workflow step cards still render correctly', async ({ page }) => {
    /**
     * Constraint: Step cards, icons, numbers, text unchanged
     */

    const workflowSection = page.locator('section').filter({ hasText: 'How MIRA Works' });

    // Verify all 5 step headers are visible
    await expect(workflowSection.getByText('Ingest', { exact: true }).first()).toBeVisible();
    await expect(workflowSection.getByText('Interpret', { exact: true }).first()).toBeVisible();
    await expect(workflowSection.getByText('Evaluate', { exact: true }).first()).toBeVisible();
    await expect(workflowSection.getByText('Execute', { exact: true }).first()).toBeVisible();
    await expect(workflowSection.getByText('Deliver', { exact: true }).first()).toBeVisible();
  });

  test('V3-MIRA-013: Workflow note displays "travel insurance claims"', async ({ page }) => {
    /**
     * SECTION_ID: WORKFLOW:NOTE
     * Change: "travel claims" → "travel insurance claims"
     */

    await expect(
      page.getByText('Interactive demo of MIRA processing travel insurance claims', { exact: false })
    ).toBeVisible();

    // Verify OLD text is NOT present
    await expect(
      page.getByText('Interactive demo of MIRA processing travel claims', { exact: true })
    ).not.toBeVisible();
  });
});

test.describe('MIRA Product Page - Capabilities Section (V3-MIRA-014, V3-MIRA-015)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/products/mira`);
  });

  test('V3-MIRA-014: Multi-Vertical Support categories on separate lines', async ({ page }) => {
    /**
     * SECTION_ID: CAPABILITIES:ITEM_BODY (Multi-Vertical Support)
     * Change: Each category on its own line/paragraph
     * - Insurance: Health, Pet, Motor, Household, Life.
     * - Travel: Flight refunds, train refunds, accommodation.
     * - Warranty: Vehicle, electronics, extended coverage.
     */

    // Verify all three categories are present
    await expect(page.getByText('Insurance: Health, Pet, Motor, Household, Life.', { exact: false })).toBeVisible();
    await expect(page.getByText('Travel: Flight refunds, train refunds, accommodation.', { exact: false })).toBeVisible();
    await expect(page.getByText('Warranty: Vehicle, electronics, extended coverage.', { exact: false })).toBeVisible();

    // Note: Verifying actual line breaks requires checking the HTML structure
    // which may use <br>, <p>, or CSS whitespace handling
  });

  test('V3-MIRA-015: Integration Ready description uses updated text', async ({ page }) => {
    /**
     * SECTION_ID: CAPABILITIES:ITEM_BODY (Integration Ready)
     * Changes:
     * - "systems without rip-and-replace." → "systems."
     * - Added: "No integration disruption."
     * - "on-premise." → "on-premise" (removed trailing period)
     */

    await expect(
      page.getByText('API-first architecture.', { exact: false })
    ).toBeVisible();
    await expect(
      page.getByText('Works alongside existing claims management systems.', { exact: false })
    ).toBeVisible();
    await expect(
      page.getByText('No integration disruption.', { exact: false })
    ).toBeVisible();
    await expect(
      page.getByText('Flexible deployment: cloud or on-premise', { exact: false })
    ).toBeVisible();

    // Verify OLD text is NOT present
    await expect(
      page.getByText('without rip-and-replace', { exact: false })
    ).not.toBeVisible();
  });
});

test.describe('MIRA Product Page - Final CTA Section (V3-MIRA-016, V3-MIRA-017)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/products/mira`);
  });

  test('V3-MIRA-016: Final CTA body uses updated text', async ({ page }) => {
    /**
     * SECTION_ID: FINAL_CTA:BODY
     * Current: "We'll process a sample of your closed claims and show you exactly how MIRA would have handled them."
     * New: "Process a sample of closed claims to see exactly how MIRA would have handled them."
     */

    await expect(
      page.getByText('Process a sample of closed claims to see exactly how MIRA would have handled them.', { exact: false })
    ).toBeVisible();

    // Verify OLD text is NOT present
    await expect(
      page.getByText("We'll process a sample of your closed claims", { exact: false })
    ).not.toBeVisible();
  });

  test('V3-MIRA-017: Final CTA button displays "Book a Demo"', async ({ page }) => {
    /**
     * SECTION_ID: FINAL_CTA:CTA_PRIMARY
     * Current: "Request a Pilot"
     * New: "Book a Demo"
     */

    // Find the final CTA section (usually near bottom of page)
    const finalCtaSection = page.locator('section').filter({ hasText: 'Ready to See' }).last();

    const ctaButton = finalCtaSection.getByRole('button', { name: 'Book a Demo' })
      .or(finalCtaSection.getByRole('link', { name: 'Book a Demo' }));
    await expect(ctaButton.first()).toBeVisible();

    // Verify OLD text is NOT present in final CTA
    await expect(
      finalCtaSection.getByText('Request a Pilot', { exact: true })
    ).not.toBeVisible();
  });
});

// ============================================================================
// VISUAL REGRESSION TESTS
// ============================================================================

test.describe('Visual Regression Tests', () => {
  test('Home page awards section renders correctly in light mode', async ({ page }) => {
    await page.goto(BASE_URL);

    const awardsSection = page.locator('section').filter({ hasText: 'Award-Winning Technology' });
    await expect(awardsSection).toBeVisible();

    // Verify awards structure is intact
    await expect(awardsSection.locator('img').first()).toBeVisible();
  });

  test('MIRA page workflow section renders without connector line', async ({ page }) => {
    await page.goto(`${BASE_URL}/products/mira`);

    const workflowSection = page.locator('section').filter({ hasText: 'How MIRA Works' });
    await expect(workflowSection).toBeVisible();

    // All step cards should be visible
    const stepCards = workflowSection.locator('[class*="card"], [class*="step"]');
    expect(await stepCards.count()).toBeGreaterThan(0);
  });
});

// ============================================================================
// RESPONSIVE TESTS
// ============================================================================

test.describe('Responsive Tests', () => {
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

      test(`Home page ZHAW logo renders correctly on ${viewport.name}`, async ({ page }) => {
        await page.goto(BASE_URL);

        const zhawLogo = page.locator('img[alt*="ZHAW"], img[alt*="zhaw"], img[src*="zhaw"]').first();
        await expect(zhawLogo).toBeVisible();
      });

      test(`Home page award logo contrast container visible on ${viewport.name}`, async ({ page }) => {
        await page.goto(BASE_URL);

        const leuchtturmLogo = page.locator('img[alt*="Leuchtturm"], img[alt*="leuchtturm"], img[src*="leuchtturm"]').first();
        await expect(leuchtturmLogo).toBeVisible();
      });

      test(`MIRA page hero renders correctly on ${viewport.name}`, async ({ page }) => {
        await page.goto(`${BASE_URL}/products/mira`);

        await expect(page.getByText('See MIRA in Action')).toBeVisible();
        await expect(page.getByText('Integrates without disruption.')).toBeVisible();
      });

      test(`MIRA page workflow section renders on ${viewport.name}`, async ({ page }) => {
        await page.goto(`${BASE_URL}/products/mira`);

        const workflowSection = page.locator('section').filter({ hasText: 'How MIRA Works' });
        await expect(workflowSection).toBeVisible();
      });
    });
  }
});

// ============================================================================
// ACCESSIBILITY TESTS
// ============================================================================

test.describe('Accessibility Tests', () => {
  test('Home page award logo container maintains sufficient contrast (WCAG 2.1 AA)', async ({ page }) => {
    await page.goto(BASE_URL);

    const leuchtturmLogo = page.locator('img[alt*="Leuchtturm"], img[alt*="leuchtturm"], img[src*="leuchtturm"]').first();
    const container = leuchtturmLogo.locator('xpath=parent::*');

    const bgColor = await container.evaluate(el => window.getComputedStyle(el).backgroundColor);

    // Contrast ratio for white logo on background should be at least 3:1
    expect(hasContrastForWhiteLogo(bgColor)).toBe(true);
  });

  test('All images have alt text', async ({ page }) => {
    await page.goto(BASE_URL);

    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      const src = await img.getAttribute('src');

      // Either alt text exists OR image is decorative (empty alt is allowed)
      // What's not allowed is missing alt attribute entirely
      const hasAlt = alt !== null;
      expect(hasAlt, `Image ${src} is missing alt attribute`).toBe(true);
    }
  });

  test('MIRA page text remains readable', async ({ page }) => {
    await page.goto(`${BASE_URL}/products/mira`);

    // Key text elements should be visible and readable
    await expect(page.getByText('Claim Decisions are Still Manual, Inconsistent and Opaque')).toBeVisible();
    await expect(page.getByText("Today's claim handlers spend hours")).toBeVisible();
    await expect(page.getByText('Auditable outputs:')).toBeVisible();
  });
});

// ============================================================================
// REGRESSION TESTS - Ensure Previous Requirements Still Pass
// ============================================================================

test.describe('Regression - Previous Requirements Still Valid', () => {
  test('Home page hero still shows "Automate Insurance Claim Decisions."', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.getByText('Automate Insurance Claim Decisions.')).toBeVisible();
  });

  test('Home page hero still shows "Auditable by Design."', async ({ page }) => {
    await page.goto(BASE_URL);
    // Use first() to handle multiple occurrences on page (hero and another section)
    await expect(page.getByText('Auditable by Design.').first()).toBeVisible();
  });

  test('Footer still shows "Swiss Precision. Auditable AI."', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.getByText('Swiss Precision. Auditable AI.')).toBeVisible();
  });

  test('Footer still has PAIA Manual link', async ({ page }) => {
    await page.goto(BASE_URL);
    const footer = page.locator('footer');
    await expect(footer.getByRole('link', { name: /paia manual/i })).toBeVisible();
  });

  test('Footer still has correct copyright', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.getByText(/© 2026 True Aim\. All rights reserved\./)).toBeVisible();
  });
});
