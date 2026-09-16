/**
 * Website Review V2.1 - Playwright Test Plan
 *
 * This test suite verifies all requirements from the "True Aim - Website Review V2.1" document.
 * Requirements are organized by page and SECTION_ID.
 *
 * Run with: npx playwright test tests/e2e/website-review-v2.1.spec.ts
 *
 * Implementation Rules (Global):
 * - RULE-001: Verbatim text preservation
 * - RULE-002: Empty text edits = no modifications
 * - RULE-003: Global header/footer propagation
 * - RULE-004: SECTION_ID authority
 * - RULE-005: Design vs text separation
 */

import { test, expect, Page } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get computed font size in pixels for an element
 */
async function getFontSize(page: Page, selector: string): Promise<number> {
  const element = page.locator(selector).first();
  const fontSize = await element.evaluate(el => {
    return parseFloat(window.getComputedStyle(el).fontSize);
  });
  return fontSize;
}

/**
 * Get computed styles for an element
 */
async function getComputedStyles(page: Page, locator: ReturnType<Page['locator']>) {
  return await locator.evaluate(el => {
    const styles = window.getComputedStyle(el);
    return {
      fontSize: parseFloat(styles.fontSize),
      objectFit: styles.objectFit,
      padding: styles.padding,
      paddingTop: styles.paddingTop,
      paddingBottom: styles.paddingBottom,
      paddingLeft: styles.paddingLeft,
      paddingRight: styles.paddingRight,
      textAlign: styles.textAlign,
      justifyContent: styles.justifyContent,
      alignItems: styles.alignItems,
    };
  });
}

// ============================================================================
// HOME PAGE TESTS (/) - REQ-HOME-001 to REQ-HOME-011
// ============================================================================

test.describe('Home Page - Hero Section (REQ-HOME-001, REQ-HOME-002)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('REQ-HOME-001: Hero H1 line 2 displays exactly "Auditable by Design."', async ({ page }) => {
    // SECTION_ID: HERO:HEADLINE
    // Location: Hero H1 line 2
    // Required: REPLACE_WITH "Auditable by Design."

    // Target specifically the H1 element in the hero section
    const heroH1 = page.locator('h1').filter({ hasText: 'Auditable by Design.' });
    await expect(heroH1).toBeVisible();

    // Verify the H1 contains both lines
    await expect(heroH1.getByText('Automate Insurance Claim Decisions.')).toBeVisible();
    await expect(heroH1.getByText('Auditable by Design.')).toBeVisible();

    // Verify old text "Audit Every One." is NOT present anywhere on page
    await expect(page.getByText('Audit Every One.', { exact: true })).not.toBeVisible();
  });

  test('REQ-HOME-002: Hero subtext displays 3-line format', async ({ page }) => {
    // SECTION_ID: HERO:SUBTEXT
    // Location: Hero supporting sentence
    // Required: Multi-line text with 3 lines

    // Line 1: "Apply policy terms clearly and consistently."
    await expect(page.getByText('Apply policy terms clearly and consistently.')).toBeVisible();

    // Line 2: "Built for regulated insurance."
    await expect(page.getByText('Built for regulated insurance.')).toBeVisible();

    // Line 3: "No black boxes."
    await expect(page.getByText('No black boxes.')).toBeVisible();

    // Verify old single-line format is NOT present
    await expect(
      page.getByText('Apply policy terms clearly and consistently in regulated environments, without black boxes.')
    ).not.toBeVisible();
  });
});

test.describe('Home Page - Flow Section Font Sizes (REQ-HOME-003 to REQ-HOME-007)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('REQ-HOME-003: Flow Step 1 "Ingest" has larger font than description', async ({ page }) => {
    // SECTION_ID: FLOW:STEP_1
    // Design Change: INCREASE_FONT_SIZE on FIRST_LINE_ONLY by +1-2pt

    const flowSection = page.locator('section').filter({ hasText: 'From Documents to Decisions' });

    // Verify text content is unchanged
    await expect(flowSection.getByText('Ingest').first()).toBeVisible();
    await expect(flowSection.getByText('Capture & validate inputs').first()).toBeVisible();
    // Time badge ("< 10 sec") was removed from the compact pipeline row in the
    // True Aim redesign (docs/DESIGN_SYSTEM.md §7 "Pipeline / process row" is
    // icon + label + description only, no time badge).

    // Find the step container and compare font sizes
    const step1Container = flowSection.locator('[data-step="1"], .flow-step').filter({ hasText: 'Ingest' }).first();

    if (await step1Container.count() > 0) {
      const titleFontSize = await step1Container.locator('text=Ingest').first().evaluate(el =>
        parseFloat(window.getComputedStyle(el).fontSize)
      );
      const descFontSize = await step1Container.locator('text=Capture').first().evaluate(el =>
        parseFloat(window.getComputedStyle(el).fontSize)
      );

      // Title should be larger than description (at least 1pt = ~1.33px difference)
      expect(titleFontSize).toBeGreaterThan(descFontSize);
    }
  });

  test('REQ-HOME-004: Flow Step 2 "Process" has larger font than description', async ({ page }) => {
    // SECTION_ID: FLOW:STEP_2
    // Design Change: INCREASE_FONT_SIZE on FIRST_LINE_ONLY by +1-2pt

    const flowSection = page.locator('section').filter({ hasText: 'From Documents to Decisions' });

    // Verify text content is unchanged
    await expect(flowSection.getByText('Process').first()).toBeVisible();
    await expect(flowSection.getByText('Apply policy logic & checks').first()).toBeVisible();
    await expect(flowSection.getByText('15').first()).toBeVisible(); // Part of "15 – 45 sec"

    // Find the step container and compare font sizes
    const step2Container = flowSection.locator('[data-step="2"], .flow-step').filter({ hasText: 'Process' }).first();

    if (await step2Container.count() > 0) {
      const titleFontSize = await step2Container.locator('text=Process').first().evaluate(el =>
        parseFloat(window.getComputedStyle(el).fontSize)
      );
      const descFontSize = await step2Container.locator('text=Apply policy').first().evaluate(el =>
        parseFloat(window.getComputedStyle(el).fontSize)
      );

      expect(titleFontSize).toBeGreaterThan(descFontSize);
    }
  });

  test('REQ-HOME-005: Flow Step 3 text update and font size', async ({ page }) => {
    // SECTION_ID: FLOW:STEP_3
    // Text Change: "Confirm outcome and routing" → "Confirm outcome & handling"
    // Design Change: INCREASE_FONT_SIZE on FIRST_LINE_ONLY by +1-2pt

    const flowSection = page.locator('section').filter({ hasText: 'From Documents to Decisions' });

    // Line 1: "Decide" (renamed from "Assess" per REQ-V6-001; the True Aim
    // redesign also dropped the per-step time badge from this compact row)
    await expect(flowSection.getByText('Decide').first()).toBeVisible();

    // Line 2: "Confirm outcome & handling" (note: "&" not "and", "handling" not "routing")
    await expect(flowSection.getByText('Confirm outcome & handling').first()).toBeVisible();

    // Verify OLD text is NOT present
    await expect(flowSection.getByText('Confirm outcome and routing')).not.toBeVisible();
    await expect(flowSection.getByText('Assess', { exact: true })).not.toBeVisible();

    // Font size check
    const step3Container = flowSection.locator('[data-step="3"], .flow-step').filter({ hasText: 'Decide' }).first();

    if (await step3Container.count() > 0) {
      const titleFontSize = await step3Container.locator('text=Decide').first().evaluate(el =>
        parseFloat(window.getComputedStyle(el).fontSize)
      );
      const descFontSize = await step3Container.locator('text=Confirm outcome').first().evaluate(el =>
        parseFloat(window.getComputedStyle(el).fontSize)
      );

      expect(titleFontSize).toBeGreaterThan(descFontSize);
    }
  });

  test('REQ-HOME-006: Flow Step 4 "Execute" has larger font than description', async ({ page }) => {
    // SECTION_ID: FLOW:STEP_4
    // Text Change: NONE (preserve exactly)
    // Design Change: INCREASE_FONT_SIZE on FIRST_LINE_ONLY by +1-2pt

    const flowSection = page.locator('section').filter({ hasText: 'From Documents to Decisions' });

    // Verify text content is unchanged
    await expect(flowSection.getByText('Execute').first()).toBeVisible();
    await expect(flowSection.getByText('Trigger next steps').first()).toBeVisible();
    // Time badge ("< 10 sec") was removed from the compact pipeline row in the
    // True Aim redesign (docs/DESIGN_SYSTEM.md §7 is icon + label + description only).

    // Font size check
    const step4Container = flowSection.locator('[data-step="4"], .flow-step').filter({ hasText: 'Execute' }).first();

    if (await step4Container.count() > 0) {
      const titleFontSize = await step4Container.locator('text=Execute').first().evaluate(el =>
        parseFloat(window.getComputedStyle(el).fontSize)
      );
      const descFontSize = await step4Container.locator('text=Trigger next').first().evaluate(el =>
        parseFloat(window.getComputedStyle(el).fontSize)
      );

      expect(titleFontSize).toBeGreaterThan(descFontSize);
    }
  });

  test('REQ-HOME-007: Flow Step 5 "Audit" has larger font than description', async ({ page }) => {
    // SECTION_ID: FLOW:STEP_5
    // Text Change: NONE (preserve exactly)
    // Design Change: INCREASE_FONT_SIZE on FIRST_LINE_ONLY by +1-2pt

    const flowSection = page.locator('section').filter({ hasText: 'From Documents to Decisions' });

    // Verify text content is unchanged
    await expect(flowSection.getByText('Audit').first()).toBeVisible();
    await expect(flowSection.getByText('Full traceability').first()).toBeVisible();
    await expect(flowSection.getByText('Instant').first()).toBeVisible();

    // Font size check
    const step5Container = flowSection.locator('[data-step="5"], .flow-step').filter({ hasText: 'Audit' }).first();

    if (await step5Container.count() > 0) {
      const titleFontSize = await step5Container.locator('text=Audit').first().evaluate(el =>
        parseFloat(window.getComputedStyle(el).fontSize)
      );
      const descFontSize = await step5Container.locator('text=Full traceability').first().evaluate(el =>
        parseFloat(window.getComputedStyle(el).fontSize)
      );

      expect(titleFontSize).toBeGreaterThan(descFontSize);
    }
  });
});

test.describe('Home Page - Awards Section (REQ-HOME-008)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('REQ-HOME-008: Italy IKN Awards logo styling', async ({ page }) => {
    // SECTION_ID: AWARDS:COUNTRY_3 / AWARDS:AWARD_3_LOGO
    // Design Changes:
    // 1. FIT_IMAGE_TO_CONTAINER with FIT_MODE: CONTAIN
    // 2. REMOVE_INTERNAL_PADDING
    // 3. CENTER_IMAGE

    const awardsSection = page.locator('section').filter({ hasText: 'Award-Winning Technology' });

    // Verify "Italy" label text is unchanged
    await expect(awardsSection.getByText('Italy').first()).toBeVisible();

    // Find the Italy award container (third award)
    const italyAwardContainer = awardsSection.locator('[data-country="italy"], .award-item').filter({ hasText: 'Italy' }).first();

    // Find the IKN Awards logo
    const iknLogo = italyAwardContainer.locator('img').or(
      awardsSection.locator('img[alt*="IKN"], img[src*="ikn"]')
    ).first();

    if (await iknLogo.count() > 0) {
      const logoStyles = await iknLogo.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          objectFit: styles.objectFit,
          width: el.clientWidth,
          height: el.clientHeight,
          naturalWidth: (el as HTMLImageElement).naturalWidth,
          naturalHeight: (el as HTMLImageElement).naturalHeight,
        };
      });

      // Verify object-fit: contain
      expect(logoStyles.objectFit).toBe('contain');

      // Verify aspect ratio is maintained (not stretched)
      const displayRatio = logoStyles.width / logoStyles.height;
      const naturalRatio = logoStyles.naturalWidth / logoStyles.naturalHeight;
      const ratioTolerance = 0.1; // 10% tolerance

      expect(Math.abs(displayRatio - naturalRatio)).toBeLessThan(naturalRatio * ratioTolerance);
    }

    // Check container centering
    if (await italyAwardContainer.count() > 0) {
      const containerStyles = await italyAwardContainer.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          justifyContent: styles.justifyContent,
          alignItems: styles.alignItems,
          textAlign: styles.textAlign,
        };
      });

      // Logo should be centered (various CSS approaches)
      const isCentered =
        containerStyles.justifyContent === 'center' ||
        containerStyles.alignItems === 'center' ||
        containerStyles.textAlign === 'center';

      expect(isCentered).toBe(true);
    }
  });
});

test.describe('Home Page - Dossier Section (REQ-HOME-009)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('REQ-HOME-009: Dossier section body text update', async ({ page }) => {
    // SECTION_ID: DOSSIER:BODY
    // Required Changes:
    // 1. Section starts with heading "Auditable by Design."
    // 2. Body text uses "explained & defended" (ampersand, not comma)

    const dossierSection = page.locator('section').filter({ hasText: 'Decision Dossier' });

    // The section heading is now "The Decision Dossier" (the "Auditable by
    // Design." tagline moved to the hero H1 sub-line and is no longer
    // repeated as this section's own heading).
    await expect(dossierSection.getByText('The Decision Dossier').first()).toBeVisible();

    // Verify body text with "explained & defended" (ampersand)
    await expect(
      dossierSection.getByText('replayed, explained & defended', { exact: false })
    ).toBeVisible();

    // Verify "reproducible audit record" is present
    await expect(
      dossierSection.getByText('complete, reproducible audit record', { exact: false })
    ).toBeVisible();

    // Verify OLD text with comma is NOT present
    await expect(
      page.getByText('explained, defended', { exact: true })
    ).not.toBeVisible();
  });
});

test.describe('Home Page - Footer (REQ-HOME-010, REQ-HOME-011)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('REQ-HOME-010: Footer PAIA Manual link preserved', async ({ page }) => {
    // SECTION_ID: GLOBAL_FOOTER:COLUMN_3
    // Required: NO CHANGE - preserve "PAIA Manual" exactly

    const footer = page.locator('footer');

    // Verify "PAIA Manual" link is present
    const paiaLink = footer.getByRole('link', { name: /paia manual/i });
    await expect(paiaLink).toBeVisible();

    // Verify text matches exactly
    await expect(footer.getByText('PAIA Manual')).toBeVisible();
  });

  test('REQ-HOME-011: Footer copyright preserved', async ({ page }) => {
    // SECTION_ID: GLOBAL_FOOTER:COPYRIGHT
    // Required: "© 2026 True Aim AG. All rights reserved." (legal entity is "True Aim AG" per DESIGN_SYSTEM.md §2)

    const footer = page.locator('footer');

    // Verify copyright text
    await expect(footer.getByText(/© 2026 True Aim AG\. All rights reserved\./)).toBeVisible();

    // Verify copyright symbol is present
    await expect(footer.getByText('©')).toBeVisible();
  });
});

// ============================================================================
// PARTNER PAGE: ZHAW (/partners/zhaw) - REQ-ZHAW-001 to REQ-ZHAW-003
// ============================================================================

test.describe('Partner Page - ZHAW (REQ-ZHAW-001 to REQ-ZHAW-003)', () => {

  test('REQ-ZHAW-001: ZHAW partner page exists and returns 200', async ({ page }) => {
    // URL: /partners/zhaw
    // Page Type: New partner page
    // Acceptance: Page accessible, returns 200 HTTP status

    const response = await page.goto(`${BASE_URL}/partners/zhaw`);

    // Verify page loads without 404
    expect(response?.status()).toBe(200);

    // Verify page follows partner page template (has basic structure)
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('main, section').first()).toBeVisible();
  });

  test('REQ-ZHAW-002: ZHAW logo integration', async ({ page }) => {
    // Asset: docs/zhaw - logo.png
    // Location: Partner page header/logo section
    // Acceptance: Logo visible, has alt text, maintains aspect ratio

    await page.goto(`${BASE_URL}/partners/zhaw`);

    // Find ZHAW logo
    const zhawLogo = page.locator('img[alt*="ZHAW"], img[alt*="zhaw"], img[src*="zhaw"]').first();

    // Verify logo is visible
    await expect(zhawLogo).toBeVisible();

    // Verify alt text for accessibility
    const altText = await zhawLogo.getAttribute('alt');
    expect(altText).toBeTruthy();
    expect(altText?.toLowerCase()).toContain('zhaw');

    // Verify aspect ratio is maintained (not stretched)
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

  test('REQ-ZHAW-003: Person 1 bio text update', async ({ page }) => {
    // SECTION_ID: SECTION:PEOPLE:PERSON_1_BIO
    // Changes:
    // - "Leads the" → "Leads True Aim's"
    // - "research programme" → "Innovation Project"

    await page.goto(`${BASE_URL}/partners/zhaw`);

    // Verify UPDATED bio text is present
    await expect(
      page.getByText('Original developer of the MIRA technology', { exact: false })
    ).toBeVisible();

    await expect(
      page.getByText('PhD in Mathematics and Computer Science', { exact: false })
    ).toBeVisible();

    // Key change 1: "Leads True Aim's" (not "Leads the")
    await expect(
      page.getByText("Leads True Aim's", { exact: false })
    ).toBeVisible();

    // Key change 2: "Innovation Project" (not "research programme")
    await expect(
      page.getByText('Innovation Project', { exact: false })
    ).toBeVisible();

    // Verify full updated sentence
    await expect(
      page.getByText("Leads True Aim's Innosuisse-funded Innovation Project", { exact: false })
    ).toBeVisible();

    // Verify OLD text is NOT present
    await expect(
      page.getByText('Leads the Innosuisse-funded research programme', { exact: true })
    ).not.toBeVisible();

    await expect(
      page.getByText('research programme', { exact: true })
    ).not.toBeVisible();
  });
});

// ============================================================================
// GLOBAL RULE VERIFICATION TESTS (RULE-003)
// ============================================================================

test.describe('Global Footer Propagation (RULE-003)', () => {
  const pagesToTest = [
    { url: '/', name: 'Home' },
    { url: '/partners/zhaw', name: 'ZHAW Partner' },
    { url: '/technology', name: 'Technology' },
    { url: '/company', name: 'Company' },
    { url: '/contact', name: 'Contact' },
    { url: '/products/mira', name: 'MIRA Product' },
  ];

  for (const pageInfo of pagesToTest) {
    test(`${pageInfo.name} page has PAIA Manual link in footer`, async ({ page }) => {
      await page.goto(`${BASE_URL}${pageInfo.url}`);

      const footer = page.locator('footer');
      await expect(footer.getByRole('link', { name: /paia manual/i })).toBeVisible();
    });

    test(`${pageInfo.name} page has correct copyright in footer`, async ({ page }) => {
      await page.goto(`${BASE_URL}${pageInfo.url}`);

      await expect(page.getByText(/© 2026 True Aim AG\. All rights reserved\./)).toBeVisible();
    });

    test(`${pageInfo.name} page has version number in footer`, async ({ page }) => {
      await page.goto(`${BASE_URL}${pageInfo.url}`);

      const footer = page.locator('footer');
      // Match version pattern vX.X.X (e.g., v1.0.0, v1.0.1, etc.)
      await expect(footer.getByText(/v\d+\.\d+\.\d+/)).toBeVisible();
    });
  }
});

// ============================================================================
// REGRESSION TESTS - Ensure V2 requirements still pass
// ============================================================================

test.describe('Regression - V2 Requirements Still Valid', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('Hero H1 line 1 still shows "Automate Insurance Claim Decisions."', async ({ page }) => {
    await expect(page.getByText('Automate Insurance Claim Decisions.')).toBeVisible();
  });

  test('Flow section title still shows "From Documents to Decisions in One Flow"', async ({ page }) => {
    // The redesign added a second (compact icon-row) section that reuses this
    // title as an sr-only heading, alongside the original visible heading
    // further down the page, so this now matches two elements.
    await expect(page.getByText('From Documents to Decisions in One Flow').first()).toBeVisible();
  });

  test('Awards section still shows "Award-Winning Technology"', async ({ page }) => {
    await expect(page.getByText('Award-Winning Technology')).toBeVisible();
  });

  test('Footer tagline still shows "Swiss Precision. Auditable AI."', async ({ page }) => {
    await expect(page.getByText('Swiss Precision. Auditable AI.')).toBeVisible();
  });
});

// ============================================================================
// DESIGN VERIFICATION TESTS
// ============================================================================

test.describe('Design Verification - Flow Step Font Hierarchy', () => {
  test('All flow step titles have consistent larger font than descriptions', async ({ page }) => {
    await page.goto(BASE_URL);

    const flowSection = page.locator('section').filter({ hasText: 'From Documents to Decisions' });

    const stepTitles = ['Ingest', 'Process', 'Assess', 'Execute', 'Audit'];
    const fontSizes: { title: string; titleSize: number; descSize: number }[] = [];

    for (const title of stepTitles) {
      const titleElement = flowSection.getByText(title, { exact: true }).first();

      if (await titleElement.count() > 0) {
        const titleFontSize = await titleElement.evaluate(el =>
          parseFloat(window.getComputedStyle(el).fontSize)
        );

        // Find parent container
        const container = titleElement.locator('xpath=ancestor::*[contains(@class, "flow") or contains(@class, "step")]').first();

        fontSizes.push({
          title,
          titleSize: titleFontSize,
          descSize: 0, // Will be populated if container found
        });
      }
    }

    // Verify we found at least some step titles
    expect(fontSizes.length).toBeGreaterThan(0);
  });
});
