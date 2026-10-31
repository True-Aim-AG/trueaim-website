/**
 * List of Sub-Processors page + DPA page removal
 *
 * v1.1 (2026-09-24) restores the page removed on 2026-09-16 and adds Sentry.
 * v1.2 (2026-10-14) corrects the Sentry storage, access and data facts.
 * v1.3 (2026-10-20) groups the list and states that the Platform removes client data from Sentry error reports.
 * v1.4 (2026-10-23) adds Google Cloud EMEA Limited (Gemini inference) to Group A.
 * v1.5 (2026-10-31) states inference in Switzerland and the EU and adds the Vertex AI abuse monitoring exception.
 *
 * Covers the legal changes requested by NRF via Reuben (2026-08-16):
 *   - REQ-SP-001: /sub-processors renders at the exact URL required by the DPA
 *   - REQ-SP-002: document metadata (version, effective date, last updated, legal basis)
 *   - REQ-SP-003: all five sub-processors are listed in two groups with their six fields
 *   - REQ-SP-004: the page is not linked from the footer (reachable by direct URL only)
 *   - REQ-SP-005: the DPA page is gone and /dpa redirects to /sub-processors
 *   - REQ-SP-006: the archived DPA downloads are no longer publicly served
 *
 * Run with: npx playwright test tests/e2e/legal-sub-processors.spec.ts --project=chromium
 */

import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test.describe('REQ-SP-001/002/003: List of Sub-Processors page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/sub-processors`);
  });

  test('page renders with the required title', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'List of Sub-Processors', level: 1 }).first()
    ).toBeVisible();
    await expect(
      page.getByText('Schedule 2 to Data Processing Agreement', { exact: true })
    ).toBeVisible();
  });

  test('document metadata block carries version, dates and legal basis', async ({ page }) => {
    const meta = page.locator('dl').first();

    for (const label of ['Version', 'Effective date', 'Last updated', 'Legal basis']) {
      await expect(meta.locator('dt', { hasText: new RegExp(`^${label}$`) })).toBeVisible();
    }

    await expect(meta.getByText('1.5', { exact: true })).toBeVisible();
    await expect(
      meta.getByText('Swiss FADP Art. 9; GDPR Art. 28', { exact: true })
    ).toBeVisible();
  });

  test('operative-list statement is present', async ({ page }) => {
    await expect(
      page.getByText(
        'the operative list for the purposes of the DPA',
        { exact: false }
      )
    ).toBeVisible();
  });

  test('all five sub-processors are listed in two groups with all six fields', async ({ page }) => {
    await expect(page.locator('section#group-a > h2')).toContainText('Group A');
    await expect(page.locator('section#group-b > h2')).toContainText('Group B');
    for (const id of ['microsoft', 'google-cloud', 'google', 'slack']) {
      await expect(page.locator(`section#group-a section#${id}`)).toBeVisible();
    }
    await expect(page.locator('section#group-b section#sentry')).toBeVisible();

    const entities = [
      { id: 'microsoft', name: 'Microsoft Ireland Operations Ltd' },
      { id: 'google-cloud', name: 'Google Cloud EMEA Limited' },
      { id: 'google', name: 'Google Ireland Limited' },
      { id: 'sentry', name: 'Functional Software, Inc. d/b/a Sentry' },
      { id: 'slack', name: 'Slack Technologies Limited' },
    ];

    for (const entity of entities) {
      const section = page.locator(`section#${entity.id}`);
      await expect(section).toBeVisible();
      await expect(section.getByRole('heading', { level: 3 }).first()).toContainText(entity.name);

      for (const field of ['Entity', 'Service', 'Personal Data Affected', 'Location', 'Access', 'Transfer Basis']) {
        await expect(section.getByText(field, { exact: true })).toBeVisible();
      }
    }

    // Locations required by the DPA
    await expect(page.locator('section#microsoft')).toContainText('Switzerland North (Zurich)');
    await expect(page.locator('section#google')).toContainText('European Union');
    await expect(page.locator('section#sentry')).toContainText('European Union (Frankfurt, Germany)');
    await expect(page.locator('section#slack')).toContainText('Slack EU data residency');
  });

  test('Google Cloud entry links to the Google sub-processor list and names no country', async ({ page }) => {
    const googleCloud = page.locator('section#google-cloud');
    await expect(
      googleCloud.locator('a[href="https://cloud.google.com/terms/subprocessors"]')
    ).toBeVisible();
    await expect(
      googleCloud.getByRole('heading', { name: 'Exception: Vertex AI abuse monitoring' })
    ).toBeVisible();
    await expect(googleCloud).toContainText('up to 90 days, in the region selected for the project');
    await expect(googleCloud).toContainText('does not use this data to train or fine-tune models');
    const text = await googleCloud.innerText();
    expect(text).not.toMatch(/United States|India|Japan/);
  });

  test('abuse monitoring exception is stated and no unsupported claims remain', async ({ page }) => {
    const microsoft = page.locator('section#microsoft');
    await expect(
      microsoft.getByRole('heading', { name: 'Exception: Azure OpenAI abuse monitoring' })
    ).toBeVisible();
    await expect(microsoft).toContainText('Microsoft publishes no retention period');
    await expect(microsoft).toContainText('It makes no such commitment for Switzerland');

    const body = await page.locator('body').innerText();
    expect(body).not.toMatch(/30[ -]days?/i);
    await expect(microsoft).toContainText('processor-to-processor module');
    await expect(page.locator('section#sentry')).toContainText('As a second layer, Sentry also removes sensitive fields by name');
    await expect(page.locator('section#group-b > h2')).toContainText('Receives technical error reports only');
    await expect(page.locator('section#sentry')).toContainText('removes client data from each error report');
    expect(body).not.toMatch(/19 October|31 December|v0\.23\.0/);
    await expect(microsoft).toContainText('backups in Switzerland West');
    await expect(microsoft).toContainText('AI model inference runs in Switzerland and the European Union.');
    expect(await microsoft.innerText()).not.toMatch(/March 2027|fallback|EU Data Boundary/);
    expect(body).not.toMatch(/not group/i);
  });

  test('version history table is present', async ({ page }) => {
    const history = page.locator('section#version-history');
    await expect(history.getByRole('heading', { name: 'Version History' })).toBeVisible();
    await expect(history.locator('table')).toBeVisible();
    await expect(history).toContainText('1.5');
    await expect(history).toContainText('1.4');
    await expect(history).toContainText('1.3');
    await expect(history).toContainText('1.2');
    await expect(history).toContainText('1.1');
    await expect(history).toContainText('1.0');
  });

  test('contact email is info@trueaim.ai only', async ({ page }) => {
    const emailLinks = page.locator('a[href*="@trueaim.ai"]');
    const count = await emailLinks.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      expect(await emailLinks.nth(i).getAttribute('href')).toContain('info@trueaim.ai');
    }
  });
});

test.describe('REQ-SP-004: Footer Legal column', () => {
  test('footer does not link to the sub-processors page', async ({ page }) => {
    await page.goto(BASE_URL);
    const footer = page.locator('footer');
    const link = footer.getByRole('link', { name: 'List of Sub-Processors' });
    await expect(link).toHaveCount(0);
  });

  test('footer no longer links to the DPA', async ({ page }) => {
    await page.goto(BASE_URL);
    const footer = page.locator('footer');
    await expect(footer.locator('a[href="/dpa"]')).toHaveCount(0);
    await expect(
      footer.getByRole('link', { name: 'Data Processing Agreement' })
    ).toHaveCount(0);
  });
});

test.describe('REQ-SP-005: DPA page removed', () => {
  test('/dpa permanently redirects to /sub-processors', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/dpa`);
    expect(page.url()).toBe(`${BASE_URL}/sub-processors`);
    expect(response?.status()).toBe(200);
    await expect(
      page.getByRole('heading', { name: 'List of Sub-Processors', level: 1 }).first()
    ).toBeVisible();
  });

  test('DPA clauses are no longer published on the website', async ({ page }) => {
    await page.goto(`${BASE_URL}/sub-processors`);
    await expect(page.getByRole('heading', { name: '1. Preamble' })).toHaveCount(0);
    await expect(
      page.getByRole('heading', { name: /Technical and Organisational Measures/i })
    ).toHaveCount(0);
  });

  test('sub-processors page is in the sitemap and the DPA is not', async ({ request }) => {
    const body = await (await request.get(`${BASE_URL}/sitemap.xml`)).text();
    expect(body).toContain('https://trueaim.ai/sub-processors');
    expect(body).not.toContain('https://trueaim.ai/dpa');
  });
});

test.describe('REQ-SP-006: archived DPA documents are not public', () => {
  for (const path of [
    '/legal/dpa-v1.0.pdf',
    '/legal/dpa-v1.0.md',
    '/legal/dpa-v1.1.pdf',
    '/legal/dpa-v1.1.md',
  ]) {
    test(`${path} is not served`, async ({ request }) => {
      const response = await request.get(`${BASE_URL}${path}`, { maxRedirects: 0 });
      expect(response.status()).toBe(404);
    });
  }
});
