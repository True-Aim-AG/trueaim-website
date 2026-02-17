/**
 * Website Review V7 - Playwright Test Plan
 *
 * This test suite verifies all 16 requirements from the "Website Review V7" document.
 * Requirements are organized by page/section:
 *   - REQ-V7-001 to REQ-V7-003, REQ-V7-005: General / Global
 *   - REQ-V7-004: Home Page
 *   - REQ-V7-006: Partners - Yarowa
 *   - REQ-V7-007: Partners - ZHAW
 *   - REQ-V7-008 to REQ-V7-009: Case Study (Vehicle Warranty Claims)
 *   - REQ-V7-010: MIRA Product Page
 *   - REQ-V7-011: ContextBuilder Product Page
 *   - REQ-V7-012 to REQ-V7-013: Impact Estimator
 *   - REQ-V7-014 to REQ-V7-016: Company / Contact Page
 *
 * Run with: npx playwright test tests/e2e/website-review-v7.spec.ts --project=chromium
 *
 * Implementation Rules (Global):
 * - RULE-001: Verbatim text preservation - text must not change unless explicitly edited
 * - RULE-002: Empty text edits = no modifications
 * - RULE-003: SECTION_ID authority - use SECTION_IDs to locate components in code
 * - RULE-004: Design edits apply only to layout, spacing, sizing, colour, or visuals - not wording
 */

import { test, expect, Page, Locator } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get computed styles for an element
 */
async function getComputedStyles(locator: Locator) {
  return await locator.evaluate(el => {
    const styles = window.getComputedStyle(el);
    return {
      fontSize: parseFloat(styles.fontSize),
      fontWeight: styles.fontWeight,
      lineHeight: styles.lineHeight,
      color: styles.color,
      backgroundColor: styles.backgroundColor,
      opacity: styles.opacity,
      paddingTop: parseFloat(styles.paddingTop),
      paddingBottom: parseFloat(styles.paddingBottom),
      position: styles.position,
      textAlign: styles.textAlign,
      borderTopWidth: styles.borderTopWidth,
      borderTopColor: styles.borderTopColor,
      borderWidth: styles.borderWidth,
      borderRadius: styles.borderRadius,
      boxShadow: styles.boxShadow,
      outline: styles.outline,
      outlineWidth: styles.outlineWidth,
      objectFit: styles.objectFit,
      filter: styles.filter,
    };
  });
}

/**
 * Parse alpha from an rgba string
 */
function getAlphaFromRgba(rgba: string): number {
  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!match) return 1;
  return match[4] !== undefined ? parseFloat(match[4]) : 1;
}

/**
 * Parse RGB channels from an rgba/rgb string
 */
function parseRgb(rgba: string): { r: number; g: number; b: number } | null {
  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return null;
  return { r: Number(match[1]), g: Number(match[2]), b: Number(match[3]) };
}

/**
 * Check if border is effectively invisible (0px width or fully transparent)
 */
function isBorderInvisible(width: string, color: string): boolean {
  if (parseFloat(width) === 0) return true;
  const alpha = getAlphaFromRgba(color);
  return alpha === 0;
}

// ============================================================================
// REQ-V7-001: REPLACE VERCEL FAVICON WITH TRUE AIM LOGO
// Scope: Global (All Pages)
// ============================================================================

test.describe('REQ-V7-001: Replace Vercel Favicon with True Aim Logo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('domcontentloaded');
  });

  test('REQ-V7-001-001: No Vercel favicon reference in HTML head', async ({ page }) => {
    /**
     * SECTION_ID: FAVICON
     * Type: DESIGN_CHANGE
     * Change: Remove all Vercel/default icons
     */
    const vercelRefs = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('link[rel*="icon"]'));
      return links.filter(l => l.getAttribute('href')?.includes('vercel')).length;
    });
    expect(vercelRefs).toBe(0);
  });

  test('REQ-V7-001-002: Favicon link elements present in head', async ({ page }) => {
    const iconLinks = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('link[rel*="icon"]'));
      return links.map(l => ({ rel: l.getAttribute('rel'), href: l.getAttribute('href') }));
    });
    expect(iconLinks.length).toBeGreaterThan(0);
  });

  test('REQ-V7-001-003: Apple touch icon present', async ({ page }) => {
    const appleIcon = page.locator('link[rel="apple-touch-icon"]');
    const count = await appleIcon.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });
});

// ============================================================================
// REQ-V7-002: UPDATE FOOTER LEGAL ENTITY NAME
// Scope: Global (All Pages)
// ============================================================================

test.describe('REQ-V7-002: Update Footer Legal Entity Name', () => {
  test('REQ-V7-002-001: Footer contains "True Aim AG" on homepage', async ({ page }) => {
    /**
     * SECTION_ID: FOOTER
     * Type: CONTENT_CHANGE
     * Change: "True Aim." -> "True Aim AG."
     */
    await page.goto(BASE_URL);
    await page.waitForLoadState('domcontentloaded');

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    const footerText = await footer.textContent();
    expect(footerText).toContain('True Aim AG');
    expect(footerText).toContain('All rights reserved');
  });

  test('REQ-V7-002-002: Old text without "AG" not present on homepage', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('domcontentloaded');

    const footer = page.locator('footer');
    const footerText = await footer.textContent() || '';
    // Should NOT contain "True Aim. All rights" (without AG)
    // But SHOULD contain "True Aim AG. All rights"
    const hasOldText = /True Aim\.\s*All rights reserved/i.test(footerText) &&
                       !/True Aim AG\.\s*All rights reserved/i.test(footerText);
    expect(hasOldText).toBe(false);
  });

  test('REQ-V7-002-003: Footer consistent across multiple pages', async ({ page }) => {
    const pages = ['/', '/products/mira', '/company', '/contact'];
    for (const path of pages) {
      await page.goto(`${BASE_URL}${path}`);
      await page.waitForLoadState('domcontentloaded');

      const footer = page.locator('footer');
      if (await footer.count() > 0) {
        const text = await footer.textContent() || '';
        expect(text).toContain('True Aim AG');
      }
    }
  });
});

// ============================================================================
// REQ-V7-003: FIX MISSING "CONTACT" IN MOBILE NAVIGATION
// Scope: Global (All Pages)
// ============================================================================

test.describe('REQ-V7-003: Fix Missing "Contact" in Mobile Navigation', () => {
  test('REQ-V7-003-001: "Contact" visible in desktop nav', async ({ page }) => {
    /**
     * SECTION_ID: MOBILE_NAVIGATION
     * Type: BUG_FIX
     * Change: Add "Contact" to mobile nav
     */
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('domcontentloaded');

    const header = page.locator('header');
    const contactLink = header.getByRole('link', { name: /Contact/i });
    await expect(contactLink.first()).toBeVisible();
  });

  test('REQ-V7-003-002: "Contact" visible in mobile hamburger menu', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('domcontentloaded');

    // Open hamburger menu
    const menuButton = page.locator('header button, header [role="button"]').first();
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await page.waitForTimeout(500);
    }

    // "Contact" should be visible in the expanded mobile menu
    const contactLink = page.getByRole('link', { name: /Contact/i });
    await expect(contactLink.first()).toBeVisible();
  });

  test('REQ-V7-003-003: "Contact" link navigates to /contact', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('domcontentloaded');

    // Open hamburger menu
    const menuButton = page.locator('header button, header [role="button"]').first();
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await page.waitForTimeout(500);
    }

    const contactLink = page.getByRole('link', { name: /Contact/i }).first();
    const href = await contactLink.getAttribute('href');
    expect(href).toContain('/contact');
  });

  test('REQ-V7-003-004: Mobile nav includes all expected items', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('domcontentloaded');

    // Open hamburger menu via aria-label
    const menuButton = page.getByLabel(/toggle menu/i);
    await expect(menuButton).toBeVisible();
    await menuButton.click();
    await page.waitForTimeout(500);

    // All primary nav items should be present as visible text in the mobile menu.
    // "Products" is a section label (not a link), so check any visible text match
    // since the desktop button (hidden at mobile width) may match first in DOM order.
    const header = page.locator('header');
    const expectedItems = ['Products', 'Technology', 'Company', 'Contact'];
    for (const item of expectedItems) {
      const matches = header.getByText(new RegExp(item, 'i'));
      const count = await matches.count();
      let foundVisible = false;
      for (let i = 0; i < count; i++) {
        if (await matches.nth(i).isVisible().catch(() => false)) {
          foundVisible = true;
          break;
        }
      }
      expect(foundVisible, `${item} should be visible in mobile menu`).toBe(true);
    }
  });
});

// ============================================================================
// REQ-V7-004: REMOVE CONNECTOR LINE IN WORKFLOW SECTION
// URL: /
// ============================================================================

test.describe('REQ-V7-004: Remove Connector Line in Workflow Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('domcontentloaded');
  });

  test('REQ-V7-004-001: Section heading preserved', async ({ page }) => {
    /**
     * SECTION_ID: WORKFLOW_DIAGRAM
     * Type: DESIGN_CHANGE
     * Change: Remove horizontal connector line behind workflow steps
     */
    await expect(
      page.getByText('From Documents to Decisions in One Flow', { exact: false })
    ).toBeVisible();
  });

  test('REQ-V7-004-002: All five workflow stages still visible', async ({ page }) => {
    const workflowSection = page.locator('section').filter({
      hasText: /From Documents to Decisions in One Flow/,
    });
    const stepLabels = ['Ingest', 'Process', 'Decide', 'Execute', 'Audit'];
    for (const label of stepLabels) {
      await expect(workflowSection.getByText(label, { exact: true }).first()).toBeVisible();
    }
  });

  test('REQ-V7-004-003: Workflow badges preserved', async ({ page }) => {
    const workflowSection = page.locator('section').filter({
      hasText: /From Documents to Decisions in One Flow/,
    });
    await expect(workflowSection.getByText('Fully Automated', { exact: false }).first()).toBeVisible();
    await expect(workflowSection.getByText('Human in the Loop', { exact: false }).first()).toBeVisible();
  });

  test('REQ-V7-004-004: No visible connector line element', async ({ page }) => {
    const workflowSection = page.locator('section').filter({
      hasText: /From Documents to Decisions in One Flow/,
    });

    // Check that no dedicated connector line element exists
    // Connector lines are typically absolute/relative divs with a background or border
    const hasConnectorLine = await workflowSection.evaluate(el => {
      // Look for elements that could be a horizontal connector line
      const candidates = el.querySelectorAll('div, span, hr');
      for (const candidate of candidates) {
        const style = window.getComputedStyle(candidate);
        const rect = candidate.getBoundingClientRect();
        // A connector line would be very thin (< 6px height), wide (> 200px), and visible
        if (
          rect.height > 0 && rect.height < 6 &&
          rect.width > 200 &&
          style.display !== 'none' &&
          style.visibility !== 'hidden' &&
          style.opacity !== '0'
        ) {
          // Check if it has a visible background or border
          const hasBg = style.backgroundColor !== 'rgba(0, 0, 0, 0)' &&
                        style.backgroundColor !== 'transparent';
          const hasBorder = parseFloat(style.borderTopWidth) > 0 ||
                           parseFloat(style.borderBottomWidth) > 0;
          if (hasBg || hasBorder) return true;
        }
      }
      return false;
    });
    expect(hasConnectorLine).toBe(false);
  });
});

// ============================================================================
// REQ-V7-005: REMOVE FAINT HORIZONTAL DIVIDER LINES BETWEEN SECTIONS
// Scope: Global (All Pages)
// ============================================================================

test.describe('REQ-V7-005: Remove Faint Horizontal Divider Lines', () => {
  const pagesToCheck = [
    { path: '/', name: 'Homepage' },
    { path: '/products/mira', name: 'MIRA' },
    { path: '/company', name: 'Company' },
    { path: '/technology', name: 'Technology' },
  ];

  for (const { path, name } of pagesToCheck) {
    test(`REQ-V7-005: No visible <hr> elements between sections on ${name}`, async ({ page }) => {
      /**
       * SECTION_ID: SECTION_DIVIDERS / Global CSS
       * Type: BUG_FIX
       * Change: Remove faint hairline dividers between sections
       */
      await page.goto(`${BASE_URL}${path}`);
      await page.waitForLoadState('domcontentloaded');

      // Check for visible <hr> elements in main content
      const visibleHrCount = await page.evaluate(() => {
        const hrs = Array.from(document.querySelectorAll('main hr, #__next > hr, body > hr'));
        return hrs.filter(hr => {
          const style = window.getComputedStyle(hr);
          return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
        }).length;
      });
      expect(visibleHrCount).toBe(0);
    });

    test(`REQ-V7-005: No hairline border-top on sections on ${name}`, async ({ page }) => {
      await page.goto(`${BASE_URL}${path}`);
      await page.waitForLoadState('domcontentloaded');

      // Check that main-level section elements don't have visible top borders
      const sectionsWithBorder = await page.evaluate(() => {
        const sections = Array.from(document.querySelectorAll('main > section, main > div > section'));
        let count = 0;
        for (const section of sections) {
          const style = window.getComputedStyle(section);
          const borderWidth = parseFloat(style.borderTopWidth);
          if (borderWidth > 0 && borderWidth <= 2) {
            // Check if border is visible (not fully transparent)
            const color = style.borderTopColor;
            const alphaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
            const alpha = alphaMatch && alphaMatch[4] !== undefined ? parseFloat(alphaMatch[4]) : 1;
            if (alpha > 0) count++;
          }
        }
        return count;
      });
      expect(sectionsWithBorder).toBe(0);
    });
  }
});

// ============================================================================
// REQ-V7-006: ADD "VISIT YAROWA" LINK
// URL: /partners/yarowa
// ============================================================================

test.describe('REQ-V7-006: Add "Visit Yarowa" Link', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/partners/yarowa`);
    await page.waitForLoadState('domcontentloaded');
  });

  test('REQ-V7-006-001: "Visit Yarowa" link visible', async ({ page }) => {
    /**
     * SECTION_ID: YAROWA_PARTNER_PAGE
     * Type: CONTENT_CHANGE
     * Change: Add "Visit Yarowa" link below partnership description
     */
    await expect(page.getByText('Visit Yarowa', { exact: false })).toBeVisible();
  });

  test('REQ-V7-006-002: Link href points to yarowa.com', async ({ page }) => {
    const link = page.getByRole('link', { name: /Visit Yarowa/i });
    await expect(link).toBeVisible();
    const href = await link.getAttribute('href');
    expect(href).toContain('yarowa.com');
  });

  test('REQ-V7-006-003: Link is center-aligned', async ({ page }) => {
    const link = page.getByRole('link', { name: /Visit Yarowa/i });
    const alignment = await link.evaluate(el => {
      // Check the link or its parent for center alignment
      let current: HTMLElement | null = el as HTMLElement;
      for (let i = 0; i < 3; i++) {
        const style = window.getComputedStyle(current);
        if (style.textAlign === 'center') return 'center';
        current = current.parentElement;
        if (!current) break;
      }
      return window.getComputedStyle(el).textAlign;
    });
    expect(alignment).toBe('center');
  });

  test('REQ-V7-006-004: Link positioned below partnership description', async ({ page }) => {
    const spinoutText = page.getByText('spinout from Yarowa', { exact: false }).first();
    const visitLink = page.getByRole('link', { name: /Visit Yarowa/i });

    const textBox = await spinoutText.boundingBox();
    const linkBox = await visitLink.boundingBox();

    if (textBox && linkBox) {
      expect(linkBox.y).toBeGreaterThan(textBox.y + textBox.height - 5);
    }
  });
});

// ============================================================================
// REQ-V7-007: FIX DANDOLO AVATAR RING + CROP (ZHAW)
// URL: /partners/zhaw
// ============================================================================

test.describe('REQ-V7-007: Fix Dandolo Avatar (ZHAW Page)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/partners/zhaw`);
    await page.waitForLoadState('domcontentloaded');
  });

  test('REQ-V7-007-001: Dandolo avatar has no visible border', async ({ page }) => {
    /**
     * SECTION_ID: ZHAW_PARTNER_PAGE / About the Research Group
     * Type: BUG_FIX
     * Change: Remove ring/border from Dandolo avatar, enforce grayscale
     */
    const dandoloSection = page.locator('div, section').filter({ hasText: /Dandolo Flumini/i }).first();
    const avatar = dandoloSection.locator('img').first();

    if (await avatar.isVisible()) {
      // Check the image wrapper for border
      const styles = await avatar.evaluate(el => {
        const img = el as HTMLElement;
        const wrapper = img.parentElement;
        const wrapperStyle = wrapper ? window.getComputedStyle(wrapper) : null;
        const imgStyle = window.getComputedStyle(img);
        return {
          wrapperBorder: wrapperStyle?.borderWidth || '0px',
          wrapperBoxShadow: wrapperStyle?.boxShadow || 'none',
          wrapperOutline: wrapperStyle?.outlineWidth || '0px',
          imgBorder: imgStyle.borderWidth,
          imgBoxShadow: imgStyle.boxShadow,
        };
      });
      expect(parseFloat(styles.wrapperBorder)).toBe(0);
      expect(styles.wrapperBoxShadow).toBe('none');
      expect(parseFloat(styles.wrapperOutline)).toBe(0);
    }
  });

  test('REQ-V7-007-002: Dandolo avatar is circular', async ({ page }) => {
    const avatar = page.locator('img[alt*="Dandolo"]').first();

    if (await avatar.isVisible()) {
      const radius = await avatar.evaluate(el => {
        const img = el as HTMLElement;
        const wrapper = img.parentElement;
        const wrapperRadius = wrapper ? window.getComputedStyle(wrapper).borderRadius : '0px';
        const imgRadius = window.getComputedStyle(img).borderRadius;
        return { wrapperRadius, imgRadius };
      });
      // Either wrapper or image should be circular
      const isCircular = parseFloat(radius.wrapperRadius) >= 9999 ||
                         radius.wrapperRadius === '50%' ||
                         parseFloat(radius.imgRadius) >= 9999 ||
                         radius.imgRadius === '50%';
      expect(isCircular).toBe(true);
    }
  });

  test('REQ-V7-007-003: Dandolo avatar has grayscale filter', async ({ page }) => {
    const avatar = page.locator('img[alt*="Dandolo"]').first();

    if (await avatar.isVisible()) {
      const filter = await avatar.evaluate(el => window.getComputedStyle(el).filter);
      expect(filter).toContain('grayscale');
    }
  });

  test('REQ-V7-007-004: Dandolo avatar uses object-fit cover', async ({ page }) => {
    const avatar = page.locator('img[alt*="Dandolo"]').first();

    if (await avatar.isVisible()) {
      const objectFit = await avatar.evaluate(el => window.getComputedStyle(el).objectFit);
      expect(objectFit).toBe('cover');
    }
  });
});

// ============================================================================
// REQ-V7-008: UPDATE VEHICLE WARRANTY CLAIMS CASE STUDY CONTENT
// URL: /case-studies/vehicle-warranty-claims
// ============================================================================

test.describe('REQ-V7-008: Update Case Study Content', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/case-studies/vehicle-warranty-claims`);
    await page.waitForLoadState('domcontentloaded');
  });

  // --- 8a: HERO SUBHEAD ---

  test('REQ-V7-008-001: "From 18% to 98%" line removed from hero', async ({ page }) => {
    /**
     * SECTION_ID: CASE_STUDY_VWC / HERO
     * Type: CONTENT_CHANGE
     * Change: Remove "From 18% to 98% Decision Accuracy in 7 Days"
     */
    await expect(page.getByText('From 18% to 98% Decision Accuracy', { exact: false })).not.toBeVisible();
  });

  test('REQ-V7-008-002: Hero subhead reads "Multilingual, Auditable Warranty Adjudication"', async ({ page }) => {
    await expect(
      page.getByText('Multilingual, Auditable Warranty Adjudication', { exact: false })
    ).toBeVisible();
  });

  // --- 8b: INTRODUCTORY SECTION ---

  test('REQ-V7-008-003: Old intro paragraph removed', async ({ page }) => {
    /**
     * SECTION_ID: CASE_STUDY_VWC / INTRO
     * Type: CONTENT_CHANGE
     * Change: Replace intro paragraph with new version
     */
    await expect(page.getByText('processing hundreds of claims per month', { exact: false })).not.toBeVisible();
  });

  test('REQ-V7-008-004: New intro paragraph present (part 1)', async ({ page }) => {
    await expect(
      page.getByText('needed to automate the adjudication of multilingual warranty claims', { exact: false })
    ).toBeVisible();
  });

  test('REQ-V7-008-005: New intro paragraph present (part 2)', async ({ page }) => {
    await expect(
      page.getByText('multi-tier matching architecture routes 80%-90%', { exact: false })
    ).toBeVisible();
  });

  // --- 8c: METRICS SUMMARY ---

  test('REQ-V7-008-006: Metrics summary updated', async ({ page }) => {
    /**
     * SECTION_ID: CASE_STUDY_VWC / METRICS
     * Type: CONTENT_CHANGE
     * Change: "18% to 98% ... 60+" -> "98% ... multiple"
     */
    await expect(
      page.getByText('98% decision accuracy in 7 days across multiple evaluation iterations', { exact: false })
    ).toBeVisible();
  });

  test('REQ-V7-008-007: Old metrics text "18% to 98%" removed', async ({ page }) => {
    await expect(
      page.getByText('18% to 98% decision accuracy', { exact: false })
    ).not.toBeVisible();
  });

  // --- 8d: PROCESSING TIME ---

  test('REQ-V7-008-008: Processing time text updated', async ({ page }) => {
    /**
     * SECTION_ID: CASE_STUDY_VWC / PROCESSING_TIME
     * Type: CONTENT_CHANGE
     * Change: "15-30 minutes" -> "30+ minutes", "hundreds" -> "thousands"
     */
    await expect(
      page.getByText('Standard processing takes 30+ minutes per claim', { exact: false })
    ).toBeVisible();
  });

  test('REQ-V7-008-009: Old processing time text removed', async ({ page }) => {
    await expect(
      page.getByText('Processing takes 15-30 minutes per claim', { exact: false })
    ).not.toBeVisible();
  });

  // --- 8e: ITERATION PROGRESSION ---

  test('REQ-V7-008-010: Iteration text updated', async ({ page }) => {
    /**
     * SECTION_ID: CASE_STUDY_VWC / ITERATION
     * Type: CONTENT_CHANGE
     * Change: "18% to 76% took 3 days" -> "76% accuracy took 3 days"
     */
    await expect(
      page.getByText('76% accuracy took 3 days', { exact: false })
    ).toBeVisible();
  });

  test('REQ-V7-008-011: Old iteration text removed', async ({ page }) => {
    await expect(
      page.getByText('18% to 76% took 3 days', { exact: false })
    ).not.toBeVisible();
  });

  // --- 8f: BOTTOM CTA ---

  test('REQ-V7-008-012: CTA button reads "Book a Demo"', async ({ page }) => {
    /**
     * SECTION_ID: CASE_STUDY_VWC / CTA
     * Type: CONTENT_CHANGE
     * Change: "Request a Pilot" -> "Book a Demo"
     */
    const mainContent = page.locator('#main-content, main');
    await expect(
      mainContent.getByRole('link', { name: /Book a Demo/i }).first()
    ).toBeVisible();
  });

  test('REQ-V7-008-013: Old CTA text "Request a Pilot" removed', async ({ page }) => {
    await expect(page.getByText('Request a Pilot', { exact: true })).not.toBeVisible();
  });

  // --- 8g: LLM BASELINE STATEMENT ---

  test('REQ-V7-008-014: "Baseline LLM-only accuracy: 18%" removed', async ({ page }) => {
    /**
     * SECTION_ID: CASE_STUDY_VWC / LLM_BASELINE
     * Type: CONTENT_CHANGE
     * Change: Remove "Baseline LLM-only accuracy: 18%."
     */
    await expect(
      page.getByText('Baseline LLM-only accuracy', { exact: false })
    ).not.toBeVisible();
  });

  test('REQ-V7-008-015: Preceding LLM text preserved', async ({ page }) => {
    await expect(
      page.getByText('hallucinated part names, invented coverage rules, unreliable financial calculations', { exact: false })
    ).toBeVisible();
  });

  // --- 8h: TIMELINE LABEL ---

  test('REQ-V7-008-016: Timeline label shows "Days 1-3" without "18%"', async ({ page }) => {
    /**
     * SECTION_ID: CASE_STUDY_VWC / TIMELINE
     * Type: CONTENT_CHANGE
     * Change: "Days 1-3 18%" -> "Days 1-3"
     */
    const days13 = page.getByText('Days 1-3', { exact: false }).first();
    await expect(days13).toBeVisible();

    // Verify the "18%" is not adjacent to "Days 1-3"
    const parentText = await days13.evaluate(el => {
      // Check the element and its parent for "18%"
      const text = (el as HTMLElement).textContent || '';
      const parentText = (el as HTMLElement).parentElement?.textContent || '';
      return { selfText: text, parentText };
    });
    expect(parentText.selfText).not.toContain('18%');
  });
});

// ============================================================================
// REQ-V7-009: FIX ACCORDION PARAGRAPH FONT SIZE INCONSISTENCY
// URL: /case-studies/vehicle-warranty-claims
// ============================================================================

test.describe('REQ-V7-009: Fix Accordion Paragraph Font Size', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/case-studies/vehicle-warranty-claims`);
    await page.waitForLoadState('domcontentloaded');
  });

  test('REQ-V7-009-001: Accordion "Payout calculation approach" is expandable', async ({ page }) => {
    /**
     * SECTION_ID: CASE_STUDY_VWC / PAYOUT_ACCORDION
     * Type: BUG_FIX
     * Change: Normalize final paragraph font size
     */
    const accordion = page.getByText('Payout calculation approach', { exact: false }).first();
    await expect(accordion).toBeVisible();
    await accordion.click();
    await page.waitForTimeout(500);

    // After clicking, the content should expand
    await expect(
      page.getByText('The payout calculation follows', { exact: false })
    ).toBeVisible();
  });

  test('REQ-V7-009-002: Final paragraph font size matches body text', async ({ page }) => {
    // Expand accordion first
    const accordion = page.getByText('Payout calculation approach', { exact: false }).first();
    await accordion.click();
    await page.waitForTimeout(500);

    const referenceParagraph = page.getByText('The payout calculation follows', { exact: false }).first();
    const targetParagraph = page.getByText('Each insurer has specific rules', { exact: false }).first();

    if (await referenceParagraph.isVisible() && await targetParagraph.isVisible()) {
      const refStyles = await getComputedStyles(referenceParagraph);
      const targetStyles = await getComputedStyles(targetParagraph);

      // Font size should match within 1px
      expect(Math.abs(refStyles.fontSize - targetStyles.fontSize)).toBeLessThanOrEqual(1);
    }
  });

  test('REQ-V7-009-003: Final paragraph color matches body text', async ({ page }) => {
    const accordion = page.getByText('Payout calculation approach', { exact: false }).first();
    await accordion.click();
    await page.waitForTimeout(500);

    const referenceParagraph = page.getByText('The payout calculation follows', { exact: false }).first();
    const targetParagraph = page.getByText('Each insurer has specific rules', { exact: false }).first();

    if (await referenceParagraph.isVisible() && await targetParagraph.isVisible()) {
      const refStyles = await getComputedStyles(referenceParagraph);
      const targetStyles = await getComputedStyles(targetParagraph);

      expect(targetStyles.color).toBe(refStyles.color);
    }
  });

  test('REQ-V7-009-004: Final paragraph has no reduced opacity', async ({ page }) => {
    const accordion = page.getByText('Payout calculation approach', { exact: false }).first();
    await accordion.click();
    await page.waitForTimeout(500);

    const targetParagraph = page.getByText('Each insurer has specific rules', { exact: false }).first();

    if (await targetParagraph.isVisible()) {
      const styles = await getComputedStyles(targetParagraph);
      expect(styles.opacity).toBe('1');
    }
  });
});

// ============================================================================
// REQ-V7-010: FIX THIRD METRIC CARD VERTICAL ALIGNMENT
// URL: /products/mira
// ============================================================================

test.describe('REQ-V7-010: Fix Third Metric Card Vertical Alignment', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/products/mira`);
    await page.waitForLoadState('domcontentloaded');
  });

  test('REQ-V7-010-001: All three metric cards are visible', async ({ page }) => {
    /**
     * SECTION_ID: MIRA_METRICS
     * Type: BUG_FIX
     * Change: Fix vertical alignment of third metric card
     */
    await expect(page.getByText('92%', { exact: false }).first()).toBeVisible();
    await expect(page.getByText('71%', { exact: false }).first()).toBeVisible();
    // Third card has "2-5%" or similar
    await expect(page.getByText('Leakage reduction', { exact: false }).first()).toBeVisible();
  });

  test('REQ-V7-010-002: Metric card top edges are vertically aligned', async ({ page }) => {
    // Find the metric section
    const metricSection = page.locator('section').filter({
      hasText: /92%/,
    }).first();

    // Get all metric cards within this section (typically direct children with card styling)
    const cards = metricSection.locator('> div > div, [class*="card"], [class*="metric"]');
    const cardCount = await cards.count();

    if (cardCount >= 3) {
      const boxes = [];
      for (let i = 0; i < Math.min(cardCount, 3); i++) {
        const box = await cards.nth(i).boundingBox();
        if (box) boxes.push(box);
      }

      if (boxes.length >= 3) {
        // All card tops should be within 5px of each other
        const maxY = Math.max(...boxes.map(b => b.y));
        const minY = Math.min(...boxes.map(b => b.y));
        expect(maxY - minY).toBeLessThanOrEqual(5);
      }
    }
  });
});

// ============================================================================
// REQ-V7-011: UPDATE ACCURACY METRIC VALUE
// URL: /products/contextbuilder
// ============================================================================

test.describe('REQ-V7-011: Update Accuracy Metric Value', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/products/contextbuilder`);
    await page.waitForLoadState('domcontentloaded');
  });

  test('REQ-V7-011-001: Accuracy card shows "99%"', async ({ page }) => {
    /**
     * SECTION_ID: CONTEXTBUILDER_METRICS / Performance Metrics
     * Type: CONTENT_CHANGE
     * Change: Accuracy 97% -> 99%
     */
    // Find the metric near the "Accuracy" label
    const metricsSection = page.locator('section').filter({ hasText: /Performance Metrics/i }).first();
    if (await metricsSection.isVisible()) {
      await expect(metricsSection.getByText('99%', { exact: false }).first()).toBeVisible();
    } else {
      // Fallback: look for Accuracy label near 99%
      await expect(page.getByText('99%', { exact: false }).first()).toBeVisible();
    }
  });

  test('REQ-V7-011-002: Old value "97%" not present in metrics section', async ({ page }) => {
    const metricsSection = page.locator('section').filter({ hasText: /Accuracy/i }).first();
    if (await metricsSection.isVisible()) {
      const text = await metricsSection.textContent() || '';
      expect(text).not.toContain('97%');
    }
  });

  test('REQ-V7-011-003: Other metrics unchanged', async ({ page }) => {
    await expect(page.getByText('95%', { exact: false }).first()).toBeVisible();
    await expect(page.getByText('96%', { exact: false }).first()).toBeVisible();
    await expect(page.getByText('<1%', { exact: false }).first()).toBeVisible();
  });

  test('REQ-V7-011-004: "Accuracy" label still present', async ({ page }) => {
    await expect(page.getByText('Accuracy', { exact: false }).first()).toBeVisible();
  });
});

// ============================================================================
// REQ-V7-012: UPDATE IMPACT ESTIMATOR HERO BULLET WORDING
// URL: /impact-estimator
// ============================================================================

test.describe('REQ-V7-012: Update Impact Estimator Hero Bullet', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/impact-estimator`);
    await page.waitForLoadState('domcontentloaded');
  });

  test('REQ-V7-012-001: New bullet "Based on actual insurer data" present', async ({ page }) => {
    /**
     * SECTION_ID: IMPACT_ESTIMATOR_HERO
     * Type: CONTENT_CHANGE
     * Change: "real pilot data" -> "actual insurer data"
     */
    await expect(page.getByText('Based on actual insurer data', { exact: false })).toBeVisible();
  });

  test('REQ-V7-012-002: Old bullet "Based on real pilot data" removed', async ({ page }) => {
    await expect(page.getByText('Based on real pilot data', { exact: false })).not.toBeVisible();
  });

  test('REQ-V7-012-003: Other bullets unchanged', async ({ page }) => {
    await expect(page.getByText('Conservative estimates', { exact: false })).toBeVisible();
    await expect(page.getByText('Instant indication', { exact: false })).toBeVisible();
  });
});

// ============================================================================
// REQ-V7-013: REMOVE DUPLICATE CTA BLOCK ON IMPACT ESTIMATOR
// URL: /impact-estimator
// ============================================================================

test.describe('REQ-V7-013: Remove Duplicate CTA Block', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/impact-estimator`);
    await page.waitForLoadState('domcontentloaded');
  });

  test('REQ-V7-013-001: Only one "Ready for a Detailed Assessment?" heading exists', async ({ page }) => {
    /**
     * SECTION_ID: IMPACT_ESTIMATOR_CTA
     * Type: BUG_FIX
     * Change: Remove first (upper) duplicate CTA section
     */
    const ctaHeadings = page.getByText('Ready for a Detailed Assessment?', { exact: false });
    const count = await ctaHeadings.count();
    expect(count).toBe(1);
  });

  test('REQ-V7-013-002: Bottom CTA section still present with buttons', async ({ page }) => {
    await expect(page.getByText('Ready for a Detailed Assessment?', { exact: false })).toBeVisible();

    // Should have CTA buttons
    const bookDemo = page.getByRole('link', { name: /Book a Demo/i })
      .or(page.getByRole('button', { name: /Book a Demo/i }));
    await expect(bookDemo.first()).toBeVisible();
  });

  test('REQ-V7-013-003: No large empty gap after methodology accordion', async ({ page }) => {
    const methodologyAccordion = page.getByText('Methodology and Assumptions', { exact: false }).first();

    if (await methodologyAccordion.isVisible()) {
      const accordionBox = await methodologyAccordion.boundingBox();

      // Find the next visible section heading or content block after methodology
      const ctaHeading = page.getByText('Ready for a Detailed Assessment?', { exact: false }).first();
      const ctaBox = await ctaHeading.boundingBox();

      if (accordionBox && ctaBox) {
        // Gap between methodology accordion and next content should be reasonable
        const gap = ctaBox.y - (accordionBox.y + accordionBox.height);
        // Should not be excessively large (allow generous spacing but flag huge gaps)
        expect(gap).toBeLessThan(400);
      }
    }
  });
});

// ============================================================================
// REQ-V7-014: MOVE HEADQUARTERS FROM COMPANY TO CONTACT PAGE
// URLs: /company and /contact
// ============================================================================

test.describe('REQ-V7-014: Move Headquarters to Contact Page', () => {
  // Retry once - the contact page can crash under concurrent test load
  test.describe.configure({ retries: 1 });

  // --- Part A: Company Page Removal ---

  test('REQ-V7-014-001: "Headquarters" heading not on Company page', async ({ page }) => {
    /**
     * SECTION_ID: COMPANY_PAGE / HEADQUARTERS
     * Type: DESIGN_CHANGE
     * Change: Remove Headquarters section from Company page
     */
    await page.goto(`${BASE_URL}/company`);
    await page.waitForLoadState('domcontentloaded');

    // "Headquarters" as a section heading should not appear
    // Be careful not to match it in other text contexts
    const headquartersHeadings = page.locator('h1, h2, h3, h4').filter({ hasText: /^Headquarters$/i });
    const count = await headquartersHeadings.count();
    expect(count).toBe(0);
  });

  test('REQ-V7-014-002: Address not on Company page', async ({ page }) => {
    await page.goto(`${BASE_URL}/company`);
    await page.waitForLoadState('domcontentloaded');

    await expect(page.getByText('Metallstrasse 9', { exact: false })).not.toBeVisible();
  });

  // --- Part B: Contact Page Insertion ---

  test('REQ-V7-014-003: "Headquarters" heading on Contact page', async ({ page }) => {
    /**
     * SECTION_ID: CONTACT_PAGE / HEADQUARTERS
     * Type: DESIGN_CHANGE
     * Change: Insert Headquarters section on Contact page
     */
    await page.goto(`${BASE_URL}/contact`);
    await page.waitForLoadState('domcontentloaded');

    const headquartersHeading = page.locator('h1, h2, h3, h4').filter({ hasText: /Headquarters/i });
    await expect(headquartersHeading.first()).toBeVisible();
  });

  test('REQ-V7-014-004: Address lines present on Contact page', async ({ page }) => {
    await page.goto(`${BASE_URL}/contact`);
    await page.waitForLoadState('load');

    // Wait for headquarters section to render (client-side hydration)
    const addressBlock = page.locator('address');
    await expect(addressBlock).toBeVisible({ timeout: 15000 });

    await expect(addressBlock.getByText('Metallstrasse 9', { exact: false })).toBeVisible();
    await expect(addressBlock.getByText('6300 Zug', { exact: false })).toBeVisible();
    await expect(addressBlock.getByText('Switzerland', { exact: false }).first()).toBeVisible();
  });

  test('REQ-V7-014-005: Map label reads "Zug, Switzerland"', async ({ page }) => {
    await page.goto(`${BASE_URL}/contact`);
    await page.waitForLoadState('domcontentloaded');

    await expect(page.getByText('Zug, Switzerland', { exact: false })).toBeVisible();
  });

  test('REQ-V7-014-006: Map has approximately square aspect ratio', async ({ page }) => {
    await page.goto(`${BASE_URL}/contact`);
    await page.waitForLoadState('load');

    // Find the map's aspect-square container by walking up from "Zug, Switzerland" label
    const hqSection = page.locator('h3, h4').filter({ hasText: /Headquarters/i }).first();
    await expect(hqSection).toBeVisible({ timeout: 10000 });

    const mapContainer = await page.evaluate(() => {
      // Find the aspect-square container near the map
      const el = document.querySelector('.aspect-square');
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      return { width: rect.width, height: rect.height };
    });

    if (mapContainer && mapContainer.width > 0) {
      const ratio = mapContainer.width / mapContainer.height;
      expect(ratio).toBeGreaterThan(0.7);
      expect(ratio).toBeLessThan(1.3);
    }
  });

  test('REQ-V7-014-007: Headquarters below Alternative Contact section', async ({ page }) => {
    await page.goto(`${BASE_URL}/contact`);
    await page.waitForLoadState('domcontentloaded');

    const altContact = page.getByText('Email us', { exact: false }).first();
    const headquarters = page.locator('h1, h2, h3, h4').filter({ hasText: /Headquarters/i }).first();

    const altBox = await altContact.boundingBox();
    const hqBox = await headquarters.boundingBox();

    if (altBox && hqBox) {
      expect(hqBox.y).toBeGreaterThan(altBox.y);
    }
  });

  test('REQ-V7-014-008: Mobile: Headquarters section visible', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/contact`);
    await page.waitForLoadState('domcontentloaded');

    const headquarters = page.locator('h1, h2, h3, h4').filter({ hasText: /Headquarters/i }).first();
    await expect(headquarters).toBeVisible();
    await expect(page.getByText('Metallstrasse 9', { exact: false })).toBeVisible();
  });
});

// ============================================================================
// REQ-V7-015: FIX "SWITZERLAND'S" APOSTROPHE
// URL: /company
// ============================================================================

test.describe('REQ-V7-015: Fix "Switzerland\'s" Apostrophe', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/company`);
    await page.waitForLoadState('domcontentloaded');
  });

  test('REQ-V7-015-001: New text with apostrophe present', async ({ page }) => {
    /**
     * SECTION_ID: COMPANY_PAGE / PARTNERS_INVESTORS
     * Type: CONTENT_CHANGE
     * Change: "Switzerland deep tech" -> "Switzerland's deep tech"
     */
    await expect(
      page.getByText("Switzerland's deep tech and innovation ecosystem", { exact: false })
    ).toBeVisible();
  });

  test('REQ-V7-015-002: Old text without apostrophe not present', async ({ page }) => {
    // Search for the exact old text (without possessive)
    // "Switzerland deep tech" should not appear without the 's
    const pageContent = await page.textContent('body') || '';
    // Check that "Switzerland deep tech" only appears with the apostrophe-s
    const oldPattern = /Switzerland\s+deep\s+tech/i;
    const newPattern = /Switzerland[''\u2019]s\s+deep\s+tech/i;

    // If the old pattern matches, the new pattern should also match (meaning it's the corrected version)
    if (oldPattern.test(pageContent)) {
      expect(newPattern.test(pageContent)).toBe(true);
    }
  });
});

// ============================================================================
// REQ-V7-016: FIX DANDOLO AVATAR RING + CROP (COMPANY PAGE)
// URL: /company
// ============================================================================

test.describe('REQ-V7-016: Fix Dandolo Avatar (Company Page)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/company`);
    await page.waitForLoadState('domcontentloaded');
  });

  test('REQ-V7-016-001: Dandolo avatar has no visible border on Company page', async ({ page }) => {
    /**
     * SECTION_ID: COMPANY_PAGE / ADVISORY_BOARD
     * Type: BUG_FIX
     * Change: Remove ring/border from Dandolo avatar, enforce grayscale
     */
    const avatar = page.locator('img[alt*="Dandolo"]').first();

    if (await avatar.isVisible()) {
      const styles = await avatar.evaluate(el => {
        const img = el as HTMLElement;
        const wrapper = img.parentElement;
        const wrapperStyle = wrapper ? window.getComputedStyle(wrapper) : null;
        return {
          wrapperBorder: wrapperStyle?.borderWidth || '0px',
          wrapperBoxShadow: wrapperStyle?.boxShadow || 'none',
          wrapperOutline: wrapperStyle?.outlineWidth || '0px',
        };
      });
      expect(parseFloat(styles.wrapperBorder)).toBe(0);
      expect(styles.wrapperBoxShadow).toBe('none');
    }
  });

  test('REQ-V7-016-002: Dandolo avatar is circular on Company page', async ({ page }) => {
    const avatar = page.locator('img[alt*="Dandolo"]').first();

    if (await avatar.isVisible()) {
      const radius = await avatar.evaluate(el => {
        const img = el as HTMLElement;
        const wrapper = img.parentElement;
        const wrapperRadius = wrapper ? window.getComputedStyle(wrapper).borderRadius : '0px';
        const imgRadius = window.getComputedStyle(img).borderRadius;
        return { wrapperRadius, imgRadius };
      });
      const isCircular = parseFloat(radius.wrapperRadius) >= 9999 ||
                         radius.wrapperRadius === '50%' ||
                         parseFloat(radius.imgRadius) >= 9999 ||
                         radius.imgRadius === '50%';
      expect(isCircular).toBe(true);
    }
  });

  test('REQ-V7-016-003: Dandolo avatar has grayscale filter on Company page', async ({ page }) => {
    const avatar = page.locator('img[alt*="Dandolo"]').first();

    if (await avatar.isVisible()) {
      const filter = await avatar.evaluate(el => window.getComputedStyle(el).filter);
      expect(filter).toContain('grayscale');
    }
  });

  test('REQ-V7-016-004: Other advisor avatars still visible', async ({ page }) => {
    // At least 3 advisor images should be visible on the company page
    const images = page.locator('img[alt]').filter({ has: page.locator('xpath=..') });
    const advisorImages = page.locator('section').filter({ hasText: /Advisory Board/i }).first().locator('img');
    const count = await advisorImages.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });
});
