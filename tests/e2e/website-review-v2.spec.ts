/**
 * Website Review V2 - Playwright Test Plan
 *
 * This test suite verifies all requirements from the "True Aim - Website Review V2" document.
 * Requirements are organized by page and section.
 *
 * Run with: npx playwright test tests/e2e/website-review-v2.spec.ts
 */

import { test, expect, Page } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

async function getTextContent(page: Page, selector: string): Promise<string> {
  const element = await page.locator(selector).first();
  return (await element.textContent()) || '';
}

async function elementExists(page: Page, selector: string): Promise<boolean> {
  const count = await page.locator(selector).count();
  return count > 0;
}

async function elementNotExists(page: Page, selector: string): Promise<boolean> {
  const count = await page.locator(selector).count();
  return count === 0;
}

// ============================================================================
// HOME PAGE TESTS (/)
// ============================================================================

test.describe('Home Page - Global Header', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('GLOBAL_HEADER: Logo text displays "True AIm"', async ({ page }) => {
    const logoText = await page.locator('header').getByText('True AIm', { exact: false }).first();
    await expect(logoText).toBeVisible();
  });

  test('GLOBAL_HEADER:NAV - Products dropdown exists with correct items', async ({ page }) => {
    // Find and hover/click on Products nav item in desktop nav
    const header = page.locator('header');
    const productsNav = header.getByRole('button', { name: /products/i });
    await expect(productsNav).toBeVisible();

    // Open dropdown
    await productsNav.hover();
    // Wait for dropdown to become visible
    await page.waitForTimeout(300);

    // Verify dropdown items (scope to header to avoid mobile menu matches)
    await expect(header.getByText('MIRA').first()).toBeVisible();
    await expect(header.getByText('Decisioning Engine').first()).toBeVisible();
    await expect(header.getByText('ContextBuilder').first()).toBeVisible();
    await expect(header.getByText('Document Pipeline').first()).toBeVisible();
    await expect(header.getByText('ClaimEval').first()).toBeVisible();
    await expect(header.getByText('Quality Assurance').first()).toBeVisible();
  });

  test('GLOBAL_HEADER:NAV:RESOURCES - ROI Calculator renamed to Impact Estimator', async ({ page }) => {
    const header = page.locator('header');
    const resourcesNav = header.getByRole('button', { name: /resources/i });
    await resourcesNav.hover();
    await page.waitForTimeout(300);

    // Should show "Impact Estimator" not "ROI Calculator" (scope to header)
    await expect(header.getByText('Impact Estimator').first()).toBeVisible();
    await expect(header.getByText('Explore potential value').first()).toBeVisible();

    // Old text should NOT exist anywhere on page
    await expect(page.getByText('ROI Calculator')).not.toBeVisible();
    await expect(page.getByText('Calculate your savings')).not.toBeVisible();
  });

  test('GLOBAL_HEADER:NAV:RESOURCES - Case Studies dropdown item exists', async ({ page }) => {
    const header = page.locator('header');
    const resourcesNav = header.getByRole('button', { name: /resources/i });
    await resourcesNav.hover();
    await page.waitForTimeout(300);

    await expect(header.getByText('Case Studies').first()).toBeVisible();
    await expect(header.getByText('Customer success stories').first()).toBeVisible();
  });

  test('GLOBAL_HEADER:NAV:RESOURCES - Trust Center dropdown item exists', async ({ page }) => {
    const header = page.locator('header');
    const resourcesNav = header.getByRole('button', { name: /resources/i });
    await resourcesNav.hover();
    await page.waitForTimeout(300);

    await expect(header.getByText('Trust Center').first()).toBeVisible();
    await expect(header.getByText('Security & compliance', { exact: false }).first()).toBeVisible();
  });

  test('GLOBAL_HEADER:NAV:RESOURCES - Blog dropdown item exists (NEW)', async ({ page }) => {
    const header = page.locator('header');
    const resourcesNav = header.getByRole('button', { name: /resources/i });
    await resourcesNav.hover();
    await page.waitForTimeout(300);

    await expect(header.getByText('Blog').first()).toBeVisible();
    await expect(header.getByText('Insights and updates').first()).toBeVisible();
  });

  test('GLOBAL_HEADER:NAV - Technology nav item exists', async ({ page }) => {
    await expect(page.getByRole('link', { name: /technology/i })).toBeVisible();
  });

  test('GLOBAL_HEADER:NAV - Company nav item exists', async ({ page }) => {
    await expect(page.getByRole('link', { name: /company/i })).toBeVisible();
  });

  test('GLOBAL_HEADER:NAV - Contact nav item exists', async ({ page }) => {
    const header = page.locator('header');
    await expect(header.getByRole('link', { name: /contact/i }).first()).toBeVisible();
  });

  test('GLOBAL_HEADER:CTA - Book a Demo button exists', async ({ page }) => {
    const headerCta = page.locator('header').getByRole('link', { name: /book a demo/i });
    await expect(headerCta).toBeVisible();
  });
});

test.describe('Home Page - Hero Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('HERO:HEADLINE - H1 line 1 shows "Automate Insurance Claim Decisions."', async ({ page }) => {
    await expect(page.getByText('Automate Insurance Claim Decisions.')).toBeVisible();
    // Old text should NOT exist
    await expect(page.getByText('Automate Claims Decisions.', { exact: true })).not.toBeVisible();
  });

  test('HERO:HEADLINE - H1 line 2 shows "Auditable by Design."', async ({ page }) => {
    await expect(page.getByText('Auditable by Design.')).toBeVisible();
    // Old text should NOT exist
    await expect(page.getByText('Audit Every One.', { exact: true })).not.toBeVisible();
  });

  test('HERO:SUBTEXT - Updated supporting sentence', async ({ page }) => {
    await expect(page.getByText('Apply policy terms clearly and consistently in regulated environments, without black boxes.')).toBeVisible();
    // Old text should NOT exist
    await expect(page.getByText('Turn policy terms into instant, deterministic claim decisions')).not.toBeVisible();
  });

  test('HERO:CTA_PRIMARY - Book a Demo button exists', async ({ page }) => {
    const heroSection = page.locator('section').first();
    await expect(heroSection.getByRole('link', { name: /book a demo/i })).toBeVisible();
  });

  test('HERO:CTA_SECONDARY - Get Impact Estimate button exists (renamed from Get ROI Estimate)', async ({ page }) => {
    // Scope to first section (hero) to avoid matching CTA section
    const heroSection = page.locator('section').first();
    await expect(heroSection.getByRole('link', { name: /get impact estimate/i })).toBeVisible();
    // Old text should NOT be in hero
    await expect(heroSection.getByRole('link', { name: /get roi estimate/i })).not.toBeVisible();
  });
});

test.describe('Home Page - Flow Section (Process Infographic)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('FLOW:TITLE - Section heading "From Documents to Decisions in One Flow"', async ({ page }) => {
    await expect(page.getByText('From Documents to Decisions in One Flow')).toBeVisible();
  });

  test('FLOW:STEP_1 - Ingest step with updated content', async ({ page }) => {
    const flowSection = page.locator('section').filter({ hasText: 'From Documents to Decisions' });
    await expect(flowSection.getByText('Ingest').first()).toBeVisible();
    await expect(flowSection.getByText('Capture & validate inputs', { exact: false }).first()).toBeVisible();
    await expect(flowSection.getByText('< 10 sec', { exact: false }).first()).toBeVisible();
  });

  test('FLOW:STEP_2 - Process step with updated content', async ({ page }) => {
    const flowSection = page.locator('section').filter({ hasText: 'From Documents to Decisions' });
    await expect(flowSection.getByText('Process').first()).toBeVisible();
    await expect(flowSection.getByText('Apply policy logic & checks', { exact: false }).first()).toBeVisible();
    await expect(flowSection.getByText('15', { exact: false }).first()).toBeVisible(); // Part of "15 – 45 sec"
  });

  test('FLOW:STEP_3 - Assess step (renamed from Decide)', async ({ page }) => {
    await expect(page.getByText('Assess')).toBeVisible();
    await expect(page.getByText('Confirm outcome and routing', { exact: false })).toBeVisible();
    await expect(page.getByText('< 5 sec', { exact: false })).toBeVisible();
    // Old "Decide" as main label should not exist (may still appear in other contexts)
  });

  test('FLOW:STEP_4 - Execute step (renamed from Act)', async ({ page }) => {
    await expect(page.getByText('Execute')).toBeVisible();
    await expect(page.getByText('Trigger next steps', { exact: false })).toBeVisible();
  });

  test('FLOW:STEP_5 - Audit step with updated content', async ({ page }) => {
    const flowSection = page.locator('section').filter({ hasText: 'From Documents to Decisions' });
    await expect(flowSection.getByText('Audit').first()).toBeVisible();
    await expect(flowSection.getByText('Full traceability', { exact: false }).first()).toBeVisible();
    await expect(flowSection.getByText('Instant', { exact: false }).first()).toBeVisible();
  });

  test('FLOW:MODE - Flow mode labels exist', async ({ page }) => {
    await expect(page.getByText('Fully Automated')).toBeVisible();
    await expect(page.getByText('Human in the Loop')).toBeVisible();
  });

  test('FLOW:METRIC - "Processing time" and "<2 seconds" REMOVED', async ({ page }) => {
    // These components should be removed
    const processingTimeExists = await page.getByText('Processing time', { exact: true }).count();
    const twoSecondsExists = await page.getByText('<2 seconds', { exact: true }).count();

    expect(processingTimeExists).toBe(0);
    expect(twoSecondsExists).toBe(0);
  });

  test('FLOW:METRIC - "Audit trail" and "100% traceable" REMOVED', async ({ page }) => {
    // These specific metrics should be removed from flow section
    // Note: "traceable" may appear elsewhere on the page
    const flowSection = page.locator('section').filter({ hasText: 'From Documents to Decisions' });
    const auditTrailCount = await flowSection.getByText('Audit trail', { exact: true }).count();
    const traceableCount = await flowSection.getByText('100% traceable', { exact: true }).count();

    expect(auditTrailCount).toBe(0);
    expect(traceableCount).toBe(0);
  });

  test('FLOW - Animated blue line REMOVED', async ({ page }) => {
    // Check that the animated blue line element is removed
    // This would typically be a specific CSS class or SVG element
    const animatedLine = page.locator('.flow-animated-line, [data-flow-line], .animated-flow-line');
    await expect(animatedLine).not.toBeVisible();
  });
});

test.describe('Home Page - Awards Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('AWARDS:TITLE - Section heading "Award-Winning Technology"', async ({ page }) => {
    await expect(page.getByText('Award-Winning Technology')).toBeVisible();
  });

  test('AWARDS:SUBTITLE - Section subheading', async ({ page }) => {
    await expect(page.getByText('Recognised across Switzerland, Germany and Italy')).toBeVisible();
  });

  test('AWARDS:COUNTRY_1 - Switzerland label exists', async ({ page }) => {
    const awardsSection = page.locator('section').filter({ hasText: 'Award-Winning Technology' });
    await expect(awardsSection.getByText('Switzerland').first()).toBeVisible();
  });

  test('AWARDS:AWARD_1 - Swiss award name', async ({ page }) => {
    await expect(page.getByText('Innovationspreis der Schweizer Assekuranz')).toBeVisible();
  });

  test('AWARDS:COUNTRY_2 - Germany label exists', async ({ page }) => {
    const awardsSection = page.locator('section').filter({ hasText: 'Award-Winning Technology' });
    await expect(awardsSection.getByText('Germany').first()).toBeVisible();
  });

  test('AWARDS:AWARD_2 - German award name', async ({ page }) => {
    await expect(page.getByText('Digitaler Leuchtturm Versicherungen - 1. Rang', { exact: false })).toBeVisible();
  });

  test('AWARDS:COUNTRY_3 - Italy label exists', async ({ page }) => {
    const awardsSection = page.locator('section').filter({ hasText: 'Award-Winning Technology' });
    await expect(awardsSection.getByText('Italy').first()).toBeVisible();
  });

  test('AWARDS:AWARD_3 - Italian award name', async ({ page }) => {
    await expect(page.getByText('Miglior InsurTech - IKN Awards')).toBeVisible();
  });
});

test.describe('Home Page - Partners Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('PARTNERS:TITLE - Section heading "Trusted Partners"', async ({ page }) => {
    await expect(page.getByText('Trusted Partners')).toBeVisible();
  });

  test('PARTNERS:TITLE - Font size matches "Award-Winning Technology"', async ({ page }) => {
    const awardsTitle = page.getByText('Award-Winning Technology');
    const partnersTitle = page.getByText('Trusted Partners');

    const awardsFontSize = await awardsTitle.evaluate(el =>
      window.getComputedStyle(el).fontSize
    );
    const partnersFontSize = await partnersTitle.evaluate(el =>
      window.getComputedStyle(el).fontSize
    );

    expect(partnersFontSize).toBe(awardsFontSize);
  });
});

test.describe('Home Page - Products Suite Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('PRODUCTS_SUITE:TITLE - Section heading', async ({ page }) => {
    await expect(page.getByText('Purpose-Built Products for Claims Excellence')).toBeVisible();
  });

  test('PRODUCTS_SUITE:SUBTITLE - Section subheading', async ({ page }) => {
    await expect(page.getByText('A complete suite designed for the claims lifecycle')).toBeVisible();
  });

  test('PRODUCTS_SUITE:CARD_1 - ContextBuilder card content', async ({ page }) => {
    const productsSection = page.locator('section').filter({ hasText: 'Purpose-Built Products' });
    await expect(productsSection.getByText('Document Pipeline').first()).toBeVisible();
    await expect(productsSection.getByText('ContextBuilder').first()).toBeVisible();
    await expect(productsSection.getByText('Turn fragmented, unstructured claim documents into high-quality structured data', { exact: false })).toBeVisible();
    await expect(productsSection.getByRole('link', { name: /explore contextbuilder/i })).toBeVisible();
  });

  test('PRODUCTS_SUITE:CARD_2 - MIRA card content', async ({ page }) => {
    const productsSection = page.locator('section').filter({ hasText: 'Purpose-Built Products' });
    await expect(productsSection.getByText('Decisioning Engine').first()).toBeVisible();
    await expect(productsSection.getByText('MIRA').first()).toBeVisible();
    await expect(productsSection.getByText('The core deterministic decision engine', { exact: false })).toBeVisible();
    await expect(productsSection.getByRole('link', { name: /explore mira/i })).toBeVisible();
  });

  test('PRODUCTS_SUITE:CARD_3 - Decision Dossier card content', async ({ page }) => {
    const productsSection = page.locator('section').filter({ hasText: 'Purpose-Built Products' });
    await expect(productsSection.getByText('Audit Record').first()).toBeVisible();
    await expect(productsSection.getByText('Decision Dossier').first()).toBeVisible();
    await expect(productsSection.getByText('Every case produces a fully traceable audit record', { exact: false })).toBeVisible();
    await expect(productsSection.getByRole('link', { name: /explore decision dossier/i })).toBeVisible();
  });

  test('PRODUCTS_SUITE:CARD_4 - ClaimEval card content', async ({ page }) => {
    const productsSection = page.locator('section').filter({ hasText: 'Purpose-Built Products' });
    await expect(productsSection.getByText('Quality Assurance').first()).toBeVisible();
    await expect(productsSection.getByText('ClaimEval').first()).toBeVisible();
    await expect(productsSection.getByText('Scale quality assurance beyond sampling', { exact: false })).toBeVisible();
    await expect(productsSection.getByRole('link', { name: /explore claimeval/i })).toBeVisible();
  });
});

test.describe('Home Page - Decision Dossier Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('DOSSIER:KICKER - "Unique to True Aim" kicker', async ({ page }) => {
    await expect(page.getByText('Unique to True Aim')).toBeVisible();
  });

  test('DOSSIER:TITLE - "The Decision Dossier" heading', async ({ page }) => {
    await expect(page.getByText('The Decision Dossier')).toBeVisible();
  });

  test('DOSSIER:BODY - Updated body text with "reproducible"', async ({ page }) => {
    // Should show "reproducible" not "replayable" in this specific context
    await expect(page.getByText('complete, reproducible audit record', { exact: false })).toBeVisible();
  });

  test('DOSSIER:CTA - "See how it works" CTA', async ({ page }) => {
    await expect(page.getByRole('link', { name: /see how it works/i })).toBeVisible();
  });

  test('DOSSIER:MOCK - Mock panel displays correct content', async ({ page }) => {
    await expect(page.getByText('Claim #2024-TR-4521')).toBeVisible();
    await expect(page.getByText('Decision: Covered')).toBeVisible();
    await expect(page.getByText('Policy: Art. 5.2.1, 5.2.3')).toBeVisible();
    await expect(page.getByText('Evidence: 4 documents linked')).toBeVisible();
    await expect(page.getByText('Confidence: 98.5%')).toBeVisible();
  });
});

test.describe('Home Page - Case Study Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('CASESTUDY:KICKER - "Proven Results" kicker', async ({ page }) => {
    await expect(page.getByText('Proven Results')).toBeVisible();
  });

  test('CASESTUDY:TITLE - "Trusted by Leading Insurers" heading', async ({ page }) => {
    await expect(page.getByText('Trusted by Leading Insurers')).toBeVisible();
  });

  test('CASESTUDY:SUBTITLE - Section subheading', async ({ page }) => {
    await expect(page.getByText('See how insurers are transforming their claims operations', { exact: false })).toBeVisible();
  });

  test('CASESTUDY:CARD - Card meta shows "European Warranty Insurer"', async ({ page }) => {
    await expect(page.getByText('European Warranty Insurer')).toBeVisible();
  });

  test('CASESTUDY:CARD - Card meta shows "Vehicle Warranty Insurance" (simplified)', async ({ page }) => {
    await expect(page.getByText('Vehicle Warranty Insurance')).toBeVisible();
    // Should NOT show the old text with "84 claims in pilot"
    await expect(page.getByText('84 claims in pilot')).not.toBeVisible();
  });

  test('CASESTUDY:CARD - Updated headline', async ({ page }) => {
    await expect(page.getByText('Vehicle Warranty Insurer Achieves 98% Decision Accuracy in 7 Days')).toBeVisible();
    // Old headline should NOT exist
    await expect(page.getByText('Goes from 18% to 98%')).not.toBeVisible();
  });

  test('CASESTUDY:CARD - Product tags exist', async ({ page }) => {
    const caseStudySection = page.locator('section').filter({ hasText: 'Trusted by Leading Insurers' });
    await expect(caseStudySection.getByText('MIRA')).toBeVisible();
    await expect(caseStudySection.getByText('ContextBuilder')).toBeVisible();
    await expect(caseStudySection.getByText('ClaimEval')).toBeVisible();
  });

  test('CASESTUDY:CARD - Updated quote text', async ({ page }) => {
    await expect(page.getByText('The business logic matters more than the AI', { exact: false })).toBeVisible();
    // Old quote should NOT exist
    await expect(page.getByText('The business logic is harder than the AI')).not.toBeVisible();
  });

  test('CASESTUDY:CARD - "Read case study" CTA', async ({ page }) => {
    await expect(page.getByRole('link', { name: /read case study/i })).toBeVisible();
  });

  test('CASESTUDY:CARD - Metrics display correctly', async ({ page }) => {
    const caseStudySection = page.locator('section').filter({ hasText: 'Trusted by Leading Insurers' });
    await expect(caseStudySection.getByText('98%').first()).toBeVisible();
    await expect(caseStudySection.getByText('Decision Accuracy').first()).toBeVisible();
    await expect(caseStudySection.getByText('from 18% baseline').first()).toBeVisible();
    await expect(caseStudySection.getByText('Time to Results').first()).toBeVisible();
    await expect(caseStudySection.getByText('full pipeline live').first()).toBeVisible();
    await expect(caseStudySection.getByText('80-90%').first()).toBeVisible();
    await expect(caseStudySection.getByText('No-LLM Resolution', { exact: false }).first()).toBeVisible();
    // Languages metric: label "Languages", value "3", improvement "DE / FR / IT"
    await expect(caseStudySection.getByText('Languages').first()).toBeVisible();
    await expect(caseStudySection.getByText('DE / FR / IT', { exact: false }).first()).toBeVisible();
  });

  test('CASESTUDY:CARD - "7 days" metric has no extra spacing', async ({ page }) => {
    // Check that "7 days" appears correctly without extra spaces
    const sevenDaysElement = page.getByText(/7\s*days/);
    const textContent = await sevenDaysElement.textContent();
    // Should be "7 days" or "7days", not "7  days" (double space)
    expect(textContent).not.toMatch(/7\s{2,}days/);
  });

  test('CASESTUDIES:CTA - "View All Case Studies" button', async ({ page }) => {
    await expect(page.getByRole('link', { name: /view all case studies/i })).toBeVisible();
  });
});

test.describe('Home Page - Final CTA Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('FINAL_CTA:TITLE - Heading text', async ({ page }) => {
    await expect(page.getByText('Ready to See Auditable AI in Action?')).toBeVisible();
  });

  test('FINAL_CTA:BODY - Body text', async ({ page }) => {
    await expect(page.getByText('Book a 30-minute demo to see how True Aim can transform your claims operations')).toBeVisible();
  });

  test('FINAL_CTA:CTA_PRIMARY - "Book a Demo" button', async ({ page }) => {
    const ctaSection = page.locator('section').filter({ hasText: 'Ready to See Auditable AI in Action' });
    await expect(ctaSection.getByRole('link', { name: /book a demo/i })).toBeVisible();
  });

  test('FINAL_CTA:CTA_SECONDARY - "Get Impact Estimate" button (renamed)', async ({ page }) => {
    const ctaSection = page.locator('section').filter({ hasText: 'Ready to See Auditable AI in Action' });
    await expect(ctaSection.getByRole('link', { name: /get impact estimate/i })).toBeVisible();
    // Old text should not exist in this section
    await expect(ctaSection.getByRole('link', { name: /get roi estimate/i })).not.toBeVisible();
  });

  test('FINAL_CTA:BADGE - Updated trust badge: "Compliance by Design"', async ({ page }) => {
    await expect(page.getByText('Compliance by Design')).toBeVisible();
    // Old text should not exist
    await expect(page.getByText('DPA available', { exact: true })).not.toBeVisible();
  });

  test('FINAL_CTA:BADGE - Updated trust badge: "Swiss data hosting"', async ({ page }) => {
    await expect(page.getByText('Swiss data hosting')).toBeVisible();
    // Old text should not exist
    await expect(page.getByText('Swiss hosting available', { exact: true })).not.toBeVisible();
  });

  test('FINAL_CTA:BADGE - Updated trust badge: "Built to enterprise standards"', async ({ page }) => {
    await expect(page.getByText('Built to enterprise standards')).toBeVisible();
    // Old text should not exist
    await expect(page.getByText('Security pack available', { exact: true })).not.toBeVisible();
  });
});

test.describe('Home Page - Global Footer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('GLOBAL_FOOTER - Logo text "True AIm"', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer.getByText('True AIm', { exact: false }).first()).toBeVisible();
  });

  test('GLOBAL_FOOTER:TAGLINE - "Swiss Precision. Auditable AI."', async ({ page }) => {
    await expect(page.getByText('Swiss Precision. Auditable AI.')).toBeVisible();
  });

  test('GLOBAL_FOOTER - GitHub logo REMOVED', async ({ page }) => {
    const footer = page.locator('footer');
    // Check for GitHub icon - it should not be visible
    const githubIcon = footer.locator('[href*="github.com"], [aria-label*="GitHub"], svg[class*="github"]');
    // Note: This may need adjustment based on actual implementation
    const count = await githubIcon.count();
    expect(count).toBe(0);
  });

  test('GLOBAL_FOOTER - LinkedIn logo links to correct URL', async ({ page }) => {
    const footer = page.locator('footer');
    const linkedinLink = footer.locator('a[href*="linkedin.com"]');
    await expect(linkedinLink).toHaveAttribute('href', /linkedin\.com\/company\/true-aim-ag/);
  });

  test('GLOBAL_FOOTER:COLUMN_1 - Company column', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer.getByText('Company')).toBeVisible();
    await expect(footer.getByRole('link', { name: /^about$/i })).toBeVisible();
    await expect(footer.getByRole('link', { name: /^contact$/i })).toBeVisible();
  });

  test('GLOBAL_FOOTER:COLUMN_1.5 - Resources column (NEW)', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer.getByText('Resources', { exact: true })).toBeVisible();
    await expect(footer.getByRole('link', { name: /case studies/i })).toBeVisible();
    await expect(footer.getByRole('link', { name: /impact estimator/i })).toBeVisible();
    await expect(footer.getByRole('link', { name: /trust center/i })).toBeVisible();
    await expect(footer.getByRole('link', { name: /blog/i })).toBeVisible();
  });

  test('GLOBAL_FOOTER:COLUMN_2 - Products column', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer.getByText('Products', { exact: true })).toBeVisible();
    await expect(footer.getByRole('link', { name: /^mira$/i })).toBeVisible();
    await expect(footer.getByRole('link', { name: /^contextbuilder$/i })).toBeVisible();
    await expect(footer.getByRole('link', { name: /^claimeval$/i })).toBeVisible();
  });

  test('GLOBAL_FOOTER:COLUMN_3 - Legal column', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer.getByText('Legal', { exact: true })).toBeVisible();
    await expect(footer.getByRole('link', { name: /privacy policy/i })).toBeVisible();
    await expect(footer.getByRole('link', { name: /terms of service/i })).toBeVisible();
    await expect(footer.getByRole('link', { name: /cookie policy/i })).toBeVisible();
    await expect(footer.getByRole('link', { name: /paia manual/i })).toBeVisible();
  });

  test('GLOBAL_FOOTER:COPYRIGHT - Copyright text', async ({ page }) => {
    await expect(page.getByText(/© 2026 True Aim\. All rights reserved\./)).toBeVisible();
  });
});

// ============================================================================
// PARTNER PAGE: ZHAW (/partners/zhaw)
// ============================================================================

test.describe('Partner Page - ZHAW (/partners/zhaw)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/partners/zhaw`);
  });

  test('HERO:KICKER - "Research Partner" label', async ({ page }) => {
    await expect(page.getByText('Research Partner').first()).toBeVisible();
  });

  test('HERO:IMAGE - ZHAW logo is visible', async ({ page }) => {
    const logo = page.getByAltText(/zhaw/i).or(page.locator('img[src*="zhaw"]'));
    await expect(logo).toBeVisible();
  });

  test('HERO:TITLE - "Research Partnership" heading', async ({ page }) => {
    // Use heading role for more specific match
    await expect(page.getByRole('heading', { name: /research/i }).first()).toBeVisible();
    await expect(page.getByText('Partnership').first()).toBeVisible();
  });

  test('HERO:BODY - Updated intro paragraph', async ({ page }) => {
    await expect(page.getByText('Parts of True Aim', { exact: false })).toBeVisible();
    await expect(page.getByText('ZHAW Zurich University of Applied Sciences', { exact: false })).toBeVisible();
    await expect(page.getByText('Innosuisse innovation funding', { exact: false })).toBeVisible();
    // Old text should not exist
    await expect(page.getByText("True Aim's core technology originated at ZHAW")).not.toBeVisible();
  });

  test('SECTION:FOCUS:TITLE - "Research Focus Areas" heading', async ({ page }) => {
    await expect(page.getByText('Research Focus Areas')).toBeVisible();
  });

  test('SECTION:FOCUS:CARD_1 - Neuro-Symbolic AI card', async ({ page }) => {
    await expect(page.getByText('Neuro-Symbolic AI').first()).toBeVisible();
    await expect(page.getByText('Combining the flexibility of neural networks', { exact: false })).toBeVisible();
  });

  test('SECTION:FOCUS:CARD_2 - Logic Extraction & Automation card', async ({ page }) => {
    await expect(page.getByText('Logic Extraction & Automation', { exact: false })).toBeVisible();
    await expect(page.getByText('extract formal logic from natural-language policy documents', { exact: false })).toBeVisible();
  });

  test('SECTION:FOCUS:CARD_3 - Deterministic Decisioning card', async ({ page }) => {
    await expect(page.getByText('Deterministic Decisioning')).toBeVisible();
    await expect(page.getByText('identical inputs always produce identical outputs', { exact: false })).toBeVisible();
  });

  test('SECTION:FOCUS:CARD_4 - Applied Industry Research card', async ({ page }) => {
    await expect(page.getByText('Applied Industry Research')).toBeVisible();
    await expect(page.getByText('Bridging academic research and real-world insurance operations', { exact: false })).toBeVisible();
  });

  test('SECTION:GROUP:TITLE - "About the Research Group" heading', async ({ page }) => {
    await expect(page.getByText('About the Research Group')).toBeVisible();
  });

  test('SECTION:GROUP:BODY - Research group description', async ({ page }) => {
    await expect(page.getByText("ZHAW's School of Engineering", { exact: false })).toBeVisible();
    await expect(page.getByText('Institute of Applied Information Technology', { exact: false })).toBeVisible();
    await expect(page.getByText('Centre for Artificial Intelligence', { exact: false })).toBeVisible();
  });

  test('SECTION:PEOPLE:PERSON_1 - Dr. Dandolo Flumini', async ({ page }) => {
    await expect(page.getByText('Dr. Dandolo Flumini')).toBeVisible();
    await expect(page.getByText('Original developer of the MIRA technology', { exact: false })).toBeVisible();
    await expect(page.getByText('PhD in Mathematics and Computer Science', { exact: false })).toBeVisible();
  });

  test('SECTION:PEOPLE:PERSON_2 - Dr. Lukas Lichtensteiger', async ({ page }) => {
    await expect(page.getByText('Dr. Lukas Lichtensteiger')).toBeVisible();
    await expect(page.getByText('Harvard alumnus', { exact: false })).toBeVisible();
    await expect(page.getByText('True Aim technical advisor', { exact: false })).toBeVisible();
  });

  test('SECTION:OUTBOUND_LINK - "Visit ZHAW" links to correct URL', async ({ page }) => {
    const visitLink = page.getByRole('link', { name: /visit zhaw/i });
    await expect(visitLink).toHaveAttribute('href', 'https://www.zhaw.ch/en/about-us/person/flum');
  });

  test('SECTION:CTA:TITLE - "See the Research in Action" heading', async ({ page }) => {
    await expect(page.getByText('See the Research in Action')).toBeVisible();
  });

  test('SECTION:CTA:BODY - CTA body text', async ({ page }) => {
    await expect(page.getByText('Discover how our ZHAW-rooted technology delivers auditable claims decisions')).toBeVisible();
  });

  test('SECTION:CTA:BUTTON_1 - "Explore Our Technology" button', async ({ page }) => {
    await expect(page.getByRole('link', { name: /explore our technology/i })).toBeVisible();
  });

  test('SECTION:CTA:BUTTON_2 - "Book a Demo" button', async ({ page }) => {
    // Scope to CTA section to avoid header match
    const ctaSection = page.locator('section').filter({ hasText: 'See the Research in Action' });
    await expect(ctaSection.getByRole('link', { name: /book a demo/i })).toBeVisible();
  });

  test('Global header and footer match home page', async ({ page }) => {
    // Verify header has same nav items (scope to header)
    const header = page.locator('header');
    await expect(header.getByRole('link', { name: /technology/i }).first()).toBeVisible();
    await expect(header.getByRole('link', { name: /company/i }).first()).toBeVisible();

    // Verify footer copyright
    await expect(page.getByText(/© 2026 True Aim/)).toBeVisible();
  });
});

// ============================================================================
// PARTNER PAGE: YAROWA (/partners/yarowa)
// ============================================================================

test.describe('Partner Page - Yarowa (/partners/yarowa)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/partners/yarowa`);
  });

  test('HERO:KICKER - "Strategic Partner" label', async ({ page }) => {
    await expect(page.getByText('Strategic Partner').first()).toBeVisible();
  });

  test('HERO:IMAGE - Yarowa AG logo is visible', async ({ page }) => {
    const logo = page.getByAltText(/yarowa/i).or(page.locator('img[src*="yarowa"]'));
    await expect(logo).toBeVisible();
  });

  test('HERO:TITLE - "Yarowa AG" heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /yarowa ag/i })).toBeVisible();
  });

  test('HERO:BODY - Updated intro paragraph', async ({ page }) => {
    await expect(page.getByText('Swiss InsurTech platform with deep roots', { exact: false })).toBeVisible();
    await expect(page.getByText('True Aim AG is a spinout from Yarowa', { exact: false })).toBeVisible();
    // Old text should not exist
    await expect(page.getByText('spun out of an established insurance group')).not.toBeVisible();
  });

  test('SECTION:STRENGTHS:TITLE - "Partnership Strengths" heading', async ({ page }) => {
    await expect(page.getByText('Partnership Strengths')).toBeVisible();
  });

  test('SECTION:STRENGTHS:CARD_1 - Direct Insurer Distribution', async ({ page }) => {
    await expect(page.getByText('Direct Insurer Distribution')).toBeVisible();
    await expect(page.getByText('established network of insurer relationships', { exact: false })).toBeVisible();
  });

  test('SECTION:STRENGTHS:CARD_2 - Enterprise Delivery Experience', async ({ page }) => {
    await expect(page.getByText('Enterprise Delivery Experience').first()).toBeVisible();
    await expect(page.getByText('deep enterprise delivery experience', { exact: false })).toBeVisible();
  });

  test('SECTION:STRENGTHS:CARD_3 - Swiss InsurTech Platform', async ({ page }) => {
    await expect(page.getByText('Swiss InsurTech Platform').first()).toBeVisible();
    await expect(page.getByText('Swiss-based technology platform', { exact: false })).toBeVisible();
  });

  test('SECTION:STRENGTHS:CARD_4 - Aligned Vision', async ({ page }) => {
    await expect(page.getByText('Aligned Vision')).toBeVisible();
    await expect(page.getByText('transparent, auditable technology', { exact: false })).toBeVisible();
  });

  test('SECTION:CTA:TITLE - "See Our Products in Action" heading', async ({ page }) => {
    await expect(page.getByText('See Our Products in Action')).toBeVisible();
  });

  test('SECTION:CTA:BODY - Updated CTA body text', async ({ page }) => {
    await expect(page.getByText('Discover how our partnership delivers auditable claims automation')).toBeVisible();
    // Old text should not exist
    await expect(page.getByText('True Aim and Yarowa partnership', { exact: true })).not.toBeVisible();
  });

  test('SECTION:CTA:BUTTON_1 - "Learn About Our Products" button', async ({ page }) => {
    await expect(page.getByRole('link', { name: /learn about our products/i })).toBeVisible();
  });

  test('SECTION:CTA:BUTTON_2 - "Book a Demo" button', async ({ page }) => {
    // Scope to CTA section to avoid header match
    const ctaSection = page.locator('section').filter({ hasText: 'See Our Products in Action' });
    await expect(ctaSection.getByRole('link', { name: /book a demo/i })).toBeVisible();
  });
});

// ============================================================================
// PARTNER PAGE: INNOSUISSE (/partners/innosuisse)
// ============================================================================

test.describe('Partner Page - Innosuisse (/partners/innosuisse)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/partners/innosuisse`);
  });

  test('HERO:KICKER - "Federal Innovation Partner" label', async ({ page }) => {
    await expect(page.getByText('Federal Innovation Partner')).toBeVisible();
  });

  test('HERO:IMAGE - Innosuisse logo is visible', async ({ page }) => {
    const logo = page.getByAltText(/innosuisse/i).or(page.locator('img[src*="innosuisse"]'));
    await expect(logo).toBeVisible();
  });

  test('HERO:TITLE - "Innosuisse-Funded Innovation Partner" heading', async ({ page }) => {
    await expect(page.getByText('Innosuisse-Funded', { exact: false })).toBeVisible();
    await expect(page.getByText('Innovation Partner').first()).toBeVisible();
  });

  test('HERO:BODY - Updated intro paragraph', async ({ page }) => {
    await expect(page.getByText('supported through a competitive research grant awarded by Innosuisse', { exact: false })).toBeVisible();
    await expect(page.getByText("Switzerland's national innovation agency", { exact: false })).toBeVisible();
    // Old text should not exist
    await expect(page.getByText('is backed by Innosuisse')).not.toBeVisible();
  });

  test('SECTION:VALIDATION:ITEM_1 - Official Government Validation', async ({ page }) => {
    await expect(page.getByText('Official Government Validation')).toBeVisible();
    await expect(page.getByText("Swiss Confederation's official innovation agency", { exact: false })).toBeVisible();
  });

  test('SECTION:VALIDATION:ITEM_2 - Competitive Excellence', async ({ page }) => {
    await expect(page.getByText('Competitive Excellence')).toBeVisible();
    await expect(page.getByText('rigorous selection criteria', { exact: false })).toBeVisible();
  });

  test('SECTION:VALIDATION:ITEM_3 - National Strategic Priority', async ({ page }) => {
    await expect(page.getByText('National Strategic Priority')).toBeVisible();
    await expect(page.getByText("Switzerland's national commitment", { exact: false })).toBeVisible();
  });

  test('SECTION:VALIDATION:ITEM_4 - ZHAW Collaboration', async ({ page }) => {
    await expect(page.getByText('ZHAW Collaboration')).toBeVisible();
    await expect(page.getByText('Dr. Dandolo Flumini', { exact: false })).toBeVisible();
  });

  test('SECTION:GRANT:KICKER - "Research Grant" label', async ({ page }) => {
    await expect(page.getByText('Research Grant')).toBeVisible();
  });

  test('SECTION:GRANT:TITLE - Grant box heading', async ({ page }) => {
    await expect(page.getByText('Innosuisse Innovation Project Funding')).toBeVisible();
  });

  test('SECTION:GRANT:BODY - Grant box description', async ({ page }) => {
    await expect(page.getByText('Non-dilutive funding from the Swiss Confederation', { exact: false })).toBeVisible();
  });

  test('SECTION:GRANT:OUTBOUND_LINK - "Visit Innosuisse" link', async ({ page }) => {
    await expect(page.getByRole('link', { name: /visit innosuisse/i })).toBeVisible();
  });

  test('SECTION:CTA:TITLE - "Learn More About Our Technology" heading', async ({ page }) => {
    await expect(page.getByText('Learn More About Our Technology')).toBeVisible();
  });

  test('SECTION:CTA:BODY - Updated CTA body text', async ({ page }) => {
    await expect(page.getByText('Innosuisse-backed innovation powers our claims decisioning engine', { exact: false })).toBeVisible();
    // Old text should not exist
    await expect(page.getByText('Innosuisse-backed research powers', { exact: true })).not.toBeVisible();
  });

  test('SECTION:CTA:BUTTON_1 - "Explore Our Technology" button', async ({ page }) => {
    await expect(page.getByRole('link', { name: /explore our technology/i })).toBeVisible();
  });

  test('SECTION:CTA:BUTTON_2 - "Book a Demo" button', async ({ page }) => {
    // Scope to CTA section to avoid header match
    const ctaSection = page.locator('section').filter({ hasText: 'Learn More About Our Technology' });
    await expect(ctaSection.getByRole('link', { name: /book a demo/i })).toBeVisible();
  });
});

// ============================================================================
// CROSS-PAGE TESTS - Global Header/Footer Consistency
// ============================================================================

test.describe('Cross-Page - Global Header/Footer Consistency', () => {
  const pages = [
    { url: '/', name: 'Home' },
    { url: '/partners/zhaw', name: 'ZHAW Partner' },
    { url: '/partners/yarowa', name: 'Yarowa Partner' },
    { url: '/partners/innosuisse', name: 'Innosuisse Partner' },
    { url: '/technology', name: 'Technology' },
    { url: '/company', name: 'Company' },
    { url: '/contact', name: 'Contact' },
  ];

  for (const pageInfo of pages) {
    test(`${pageInfo.name} page has consistent global header`, async ({ page }) => {
      await page.goto(`${BASE_URL}${pageInfo.url}`);

      // Check header exists with key elements
      const header = page.locator('header');
      await expect(header).toBeVisible();
      await expect(header.getByText('True AIm', { exact: false })).toBeVisible();
      await expect(page.getByRole('link', { name: /book a demo/i }).first()).toBeVisible();
    });

    test(`${pageInfo.name} page has consistent global footer`, async ({ page }) => {
      await page.goto(`${BASE_URL}${pageInfo.url}`);

      // Check footer exists with key elements
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
      await expect(footer.getByText('Swiss Precision. Auditable AI.')).toBeVisible();
      await expect(page.getByText(/© 2026 True Aim/)).toBeVisible();
    });
  }
});

// ============================================================================
// NAVIGATION TESTS
// ============================================================================

test.describe('Navigation Functionality', () => {
  test('Products dropdown navigation works', async ({ page }) => {
    await page.goto(BASE_URL);

    const header = page.locator('header');
    const productsNav = header.getByRole('button', { name: /products/i });
    await productsNav.hover();
    await page.waitForTimeout(300);

    // Click on MIRA (scope to header)
    await header.getByText('MIRA').first().click();
    await expect(page).toHaveURL(/\/products\/mira/);
  });

  test('Resources dropdown navigation - Impact Estimator', async ({ page }) => {
    await page.goto(BASE_URL);

    const header = page.locator('header');
    const resourcesNav = header.getByRole('button', { name: /resources/i });
    await resourcesNav.hover();
    await page.waitForTimeout(300);

    // Scope to header to avoid footer/mobile matches
    await header.getByText('Impact Estimator').first().click();
    // Should navigate to the impact estimator page
    await expect(page).toHaveURL(/impact|estimator|roi/i);
  });

  test('Technology nav item navigation', async ({ page }) => {
    await page.goto(BASE_URL);

    const header = page.locator('header');
    await header.getByRole('link', { name: /technology/i }).first().click();
    await expect(page).toHaveURL(/\/technology/);
  });

  test('Company nav item navigation', async ({ page }) => {
    await page.goto(BASE_URL);

    const header = page.locator('header');
    await header.getByRole('link', { name: /company/i }).first().click();
    await expect(page).toHaveURL(/\/company/);
  });

  test('Contact nav item navigation', async ({ page }) => {
    await page.goto(BASE_URL);

    const header = page.locator('header');
    await header.getByRole('link', { name: /contact/i }).first().click();
    await expect(page).toHaveURL(/\/contact/);
  });

  test('Book a Demo CTA navigation', async ({ page }) => {
    await page.goto(BASE_URL);

    const headerCta = page.locator('header').getByRole('link', { name: /book a demo/i });
    await headerCta.click();
    // Should navigate to contact or demo booking page
    await expect(page).toHaveURL(/contact|demo|book/i);
  });
});

// ============================================================================
// VISUAL REGRESSION / DESIGN TESTS
// ============================================================================

test.describe('Design Requirements', () => {
  test('Partners section title font matches Awards section title font', async ({ page }) => {
    await page.goto(BASE_URL);

    const awardsTitle = page.getByText('Award-Winning Technology');
    const partnersTitle = page.getByText('Trusted Partners');

    const awardsStyles = await awardsTitle.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight,
        fontFamily: styles.fontFamily
      };
    });

    const partnersStyles = await partnersTitle.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight,
        fontFamily: styles.fontFamily
      };
    });

    expect(partnersStyles.fontSize).toBe(awardsStyles.fontSize);
    expect(partnersStyles.fontWeight).toBe(awardsStyles.fontWeight);
  });

  test('Innosuisse logo has similar dimensions to ZHAW logo', async ({ page }) => {
    await page.goto(BASE_URL);

    // Find the logos in the partners section
    const zhawLogo = page.locator('img[alt*="ZHAW"], img[src*="zhaw"]').first();
    const innosuisseLogo = page.locator('img[alt*="Innosuisse"], img[src*="innosuisse"]').first();

    if (await zhawLogo.isVisible() && await innosuisseLogo.isVisible()) {
      const zhawBox = await zhawLogo.boundingBox();
      const innosuisseBox = await innosuisseLogo.boundingBox();

      if (zhawBox && innosuisseBox) {
        // Logos should be within 20% of each other in dimensions
        const heightRatio = innosuisseBox.height / zhawBox.height;
        expect(heightRatio).toBeGreaterThan(0.8);
        expect(heightRatio).toBeLessThan(1.2);
      }
    }
  });
});

// ============================================================================
// ACCESSIBILITY TESTS
// ============================================================================

test.describe('Accessibility', () => {
  test('All images have alt text', async ({ page }) => {
    await page.goto(BASE_URL);

    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt, `Image ${i} should have alt text`).toBeTruthy();
    }
  });

  test('Navigation is keyboard accessible', async ({ page }) => {
    await page.goto(BASE_URL);

    // Tab to first nav item
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Should be able to navigate with keyboard
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('CTA buttons have proper contrast', async ({ page }) => {
    await page.goto(BASE_URL);

    const ctaButton = page.getByRole('link', { name: /book a demo/i }).first();

    const styles = await ctaButton.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        backgroundColor: computed.backgroundColor,
        color: computed.color
      };
    });

    // Basic check that button has distinct colors
    expect(styles.backgroundColor).not.toBe(styles.color);
  });
});
