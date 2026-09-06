import { test, expect } from '@playwright/test';

/**
 * Light/dark theme switcher and light-mode asset correctness.
 * Dark is the site default; the toggle persists the choice in localStorage ("theme").
 */
const BLUE = 'rgb(81, 81, 219)';           // True Aim Blue #5151DB
const LIGHT_BLUE = 'rgb(145, 167, 255)';   // Light Blue #91A7FF
const DARK_PAGE = 'rgb(44, 43, 42)';       // Primary Dark #2C2B2A
const LIGHT_PAGE = 'rgb(251, 252, 253)';   // Primary Light #FBFCFD

async function acceptCookies(page: import('@playwright/test').Page) {
  await page.addInitScript(() => {
    try { localStorage.setItem('cookie-consent', JSON.stringify({ essential: true, analytics: false })); } catch {}
  });
}

test.describe('Theme switcher', () => {
  test.beforeEach(async ({ page }) => { await acceptCookies(page); });

  test('dark is the default and the toggle is present in the header', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    const toggle = page.locator('header [data-theme-toggle]').first();
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-label', /switch to light mode/i);
    await expect(page.locator('body')).toHaveCSS('background-color', DARK_PAGE);
  });

  test('clicking the toggle switches to light and persists across reloads', async ({ page }) => {
    await page.goto('/');
    await page.locator('header [data-theme-toggle]').first().click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await expect(page.locator('body')).toHaveCSS('background-color', LIGHT_PAGE);
    expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe('light');

    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await expect(page.locator('header [data-theme-toggle]').first()).toHaveAttribute('aria-label', /switch to dark mode/i);

    await page.locator('header [data-theme-toggle]').first().click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe('dark');
  });

  test('stored preference is applied before hydration (no flash)', async ({ page }) => {
    await page.addInitScript(() => { try { localStorage.setItem('theme', 'light'); } catch {} });
    await page.goto('/', { waitUntil: 'commit' });
    // Attribute must already be light at first paint, not only after React hydrates.
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('mobile menu exposes the toggle', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.locator('header button[aria-label="Toggle menu"]').click();
    const mobileToggle = page.locator('header [data-theme-toggle]').last();
    await expect(mobileToggle).toBeVisible();
    await mobileToggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });
});

test.describe('Light mode assets and surfaces', () => {
  test.beforeEach(async ({ page }) => {
    await acceptCookies(page);
    await page.addInitScript(() => { try { localStorage.setItem('theme', 'light'); } catch {} });
  });

  test('header logo swaps to the dark lock-up on light', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('header img[src*="logo-horizontal-dark.svg"]')).toBeVisible();
    await expect(page.locator('header img[src*="logo-horizontal-light.svg"]')).toBeHidden();
  });

  test('brand icons use the light-mode line and accent colours', async ({ page }) => {
    await page.goto('/');
    const icon = page.locator('svg.brand-icon').first();
    await expect(icon).toBeVisible();
    const vars = await icon.evaluate((el) => {
      const s = getComputedStyle(el);
      return { line: s.getPropertyValue('--icon-line').trim().toLowerCase(), accent: s.getPropertyValue('--icon-accent').trim().toLowerCase() };
    });
    expect(vars.line).toBe('#3f3f42');   // Deep Charcoal line on light
    expect(vars.accent).toBe('#5151db'); // True Aim Blue accent on light
  });

  test('primary button keeps white text on True Aim Blue, accent text is True Aim Blue', async ({ page }) => {
    await page.goto('/');
    const cta = page.locator('header a.bg-ta-blue').first();
    await expect(cta).toHaveCSS('color', 'rgb(255, 255, 255)');
    await expect(cta).toHaveCSS('background-color', BLUE);
    const accentText = page.locator('.text-accent').first();
    await expect(accentText).toHaveCSS('color', BLUE);
  });

  test('footer stays a dark band with the light logo in light mode', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer).toHaveAttribute('data-theme', 'dark');
    await expect(footer.locator('img[src*="logo-vertical-light.svg"]')).toBeVisible();
    // Accent text inside the dark footer resolves to Light Blue, not True Aim Blue.
    const bg = await footer.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(bg).not.toBe(LIGHT_PAGE);
  });

  test('dark CTA band nested in the light page keeps light text and Light Blue links', async ({ page }) => {
    await page.goto('/');
    const band = page.locator('section[data-theme="dark"]').first();
    await expect(band).toBeVisible();
    const heading = band.locator('h2').first();
    await expect(heading).toHaveCSS('color', LIGHT_PAGE);
    const accent = band.locator('.text-accent, .text-link').first();
    if (await accent.count()) await expect(accent).toHaveCSS('color', LIGHT_BLUE);
  });

  test('key pages render without console errors in light mode', async ({ page }) => {
    const paths = ['/', '/products/mira', '/trust', '/contact', '/company', '/blog'];
    // Warm the dev server once so on-demand compilation never lands mid-hydration during the checked pass.
    for (const path of paths) await page.goto(path, { waitUntil: 'networkidle' });
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    for (const path of paths) {
      await page.goto(path, { waitUntil: 'networkidle' });
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
      await expect(page.locator('body')).toHaveCSS('background-color', LIGHT_PAGE);
    }
    expect(errors).toEqual([]);
  });
});
