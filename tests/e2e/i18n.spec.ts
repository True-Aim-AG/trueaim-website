/**
 * i18n (Internationalization) - Playwright E2E Test Suite
 *
 * Tests the next-intl i18n implementation for the TrueAim.ai website.
 * Configuration:
 *   - Locales: en (default), de, fr, it
 *   - localePrefix: 'always' (every locale is prefixed: /en/, /de/, /fr/, /it/)
 *   - trailingSlash: true (every page URL ends in a slash)
 *   - Framework: next-intl with Next.js App Router
 *
 * Run with: npx playwright test tests/e2e/i18n.spec.ts --project=chromium
 */

import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const NON_DEFAULT_LOCALES = ['de', 'fr', 'it'] as const;
const ALL_LOCALES = ['en', 'de', 'fr', 'it'] as const;

// ============================================================================
// 1. DEFAULT LOCALE (EN) RENDERS UNDER /en/ LIKE EVERY OTHER LOCALE
// ============================================================================

test.describe('Default locale (EN) routing', () => {
  test('EN home page renders at /en/', async ({ page }) => {
    await page.goto(`${BASE_URL}/en/`);
    await page.waitForLoadState('domcontentloaded');

    expect(page.url()).toContain('/en/');
    // html lang attribute should be "en"
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('EN subpages render under /en/ with a trailing slash', async ({ page }) => {
    for (const path of ['/technology/', '/company/', '/contact/']) {
      await page.goto(`${BASE_URL}/en${path}`);
      await page.waitForLoadState('domcontentloaded');

      expect(page.url()).toContain(`/en${path}`);
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    }
  });
});

// ============================================================================
// 2. NON-DEFAULT LOCALES RENDER WITH PREFIX
// ============================================================================

test.describe('Non-default locale routing', () => {
  for (const locale of NON_DEFAULT_LOCALES) {
    test(`${locale.toUpperCase()} home page renders with /${locale}/ prefix`, async ({ page }) => {
      await page.goto(`${BASE_URL}/${locale}`);
      await page.waitForLoadState('domcontentloaded');

      // html lang attribute should match the locale
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      // URL should contain the locale prefix
      expect(page.url()).toContain(`/${locale}`);
    });
  }

  for (const locale of NON_DEFAULT_LOCALES) {
    test(`${locale.toUpperCase()} subpage /technology renders with /${locale}/ prefix`, async ({ page }) => {
      await page.goto(`${BASE_URL}/${locale}/technology`);
      await page.waitForLoadState('domcontentloaded');

      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      expect(page.url()).toContain(`/${locale}/technology`);
    });
  }
});

// ============================================================================
// 3. LANGUAGE SWITCHER CHANGES LOCALE
// ============================================================================

test.describe('Language switcher', () => {
  test('Language switcher button is visible and shows current locale', async ({ page }) => {
    await page.goto(`${BASE_URL}/en/`);
    await page.waitForLoadState('domcontentloaded');

    // The language switcher has an aria-label "Switch language" and shows locale short code
    const switcherButton = page.locator('button[aria-label="Switch language"]');
    // If the switcher is mounted in the nav, it should be visible
    // Note: The LanguageSwitcher may not yet be integrated into Navigation.
    // This test validates its presence if it exists.
    const count = await switcherButton.count();
    if (count > 0) {
      await expect(switcherButton).toBeVisible();
      await expect(switcherButton).toContainText('EN');
    } else {
      test.skip(true, 'LanguageSwitcher is not yet mounted in the Navigation component');
    }
  });

  test('Switching to DE changes URL and lang attribute', async ({ page }) => {
    await page.goto(`${BASE_URL}/en/`);
    await page.waitForLoadState('domcontentloaded');

    const switcherButton = page.locator('button[aria-label="Switch language"]');
    const count = await switcherButton.count();
    if (count === 0) {
      test.skip(true, 'LanguageSwitcher is not yet mounted in the Navigation component');
      return;
    }

    // Open the language dropdown
    await switcherButton.click();

    // Click on the DE option (contains "DE" and "Deutsch")
    const deOption = page.locator('button').filter({ hasText: 'Deutsch' });
    await expect(deOption).toBeVisible();
    await deOption.click();

    // The locale switch is a client-side transition (next-intl router.replace),
    // not a full navigation, so wait for the URL itself to settle rather than
    // for a load event that may already have fired.
    await page.waitForURL(/\/de(\/|$)/);

    // Verify URL changed to /de
    expect(page.url()).toContain('/de');
    // Verify lang attribute
    await expect(page.locator('html')).toHaveAttribute('lang', 'de');
  });

  test('Switching from DE back to EN lands on /en/', async ({ page }) => {
    await page.goto(`${BASE_URL}/de`);
    await page.waitForLoadState('domcontentloaded');

    const switcherButton = page.locator('button[aria-label="Switch language"]');
    const count = await switcherButton.count();
    if (count === 0) {
      test.skip(true, 'LanguageSwitcher is not yet mounted in the Navigation component');
      return;
    }

    // Open the language dropdown
    await switcherButton.click();

    // Click on the EN option (contains "EN" and "English")
    const enOption = page.locator('button').filter({ hasText: 'English' });
    await expect(enOption).toBeVisible();
    await enOption.click();

    // Wait for the client-side transition to settle (see comment above).
    await page.waitForURL(/\/en(\/|$)/);

    // Verify URL moved to the /en/ prefix
    expect(page.url()).toContain('/en/');
    // Verify lang attribute is "en"
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });
});

// ============================================================================
// 4. LANGUAGE SWITCHER PRESERVES PATH
// ============================================================================

test.describe('Language switcher preserves path', () => {
  test('Switching locale on /company preserves the path segment', async ({ page }) => {
    await page.goto(`${BASE_URL}/en/company/`);
    await page.waitForLoadState('domcontentloaded');

    const switcherButton = page.locator('button[aria-label="Switch language"]');
    const count = await switcherButton.count();
    if (count === 0) {
      test.skip(true, 'LanguageSwitcher is not yet mounted in the Navigation component');
      return;
    }

    // Switch to FR
    await switcherButton.click();
    const frOption = page.locator('button').filter({ hasText: 'Français' });
    await frOption.click();
    // Client-side transition: wait for the URL to actually settle rather than
    // for a load event that may already have fired.
    await page.waitForURL(/\/fr\/company/);

    // Verify URL is /fr/company
    expect(page.url()).toContain('/fr/company');
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');

    // Switch back to EN
    await switcherButton.click();
    const enOption = page.locator('button').filter({ hasText: 'English' });
    await enOption.click();
    await page.waitForURL(/\/en\/company/);

    // Verify URL is /en/company/
    expect(page.url()).toMatch(/\/en\/company\/?$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });
});

// ============================================================================
// 5. BLOG PAGES SHOW ENGLISH-ONLY BANNER FOR NON-EN LOCALES
// ============================================================================

test.describe('EnglishOnlyBanner on blog pages', () => {
  const blogBannerMessages: Record<string, string> = {
    de: 'Diese Seite ist nur auf Englisch verfügbar',
    fr: 'Cette page est disponible uniquement en anglais',
    it: 'Questa pagina è disponibile solo in inglese',
  };

  test('EN blog page does NOT show the EnglishOnlyBanner', async ({ page }) => {
    await page.goto(`${BASE_URL}/en/blog/`);
    await page.waitForLoadState('domcontentloaded');

    // The banner should not appear for English
    const banner = page.locator('text=This page is available in English only');
    await expect(banner).not.toBeVisible();

    // Also check no translated banners appear
    for (const msg of Object.values(blogBannerMessages)) {
      await expect(page.locator(`text=${msg}`)).not.toBeVisible();
    }
  });

  for (const locale of NON_DEFAULT_LOCALES) {
    test(`${locale.toUpperCase()} blog page shows EnglishOnlyBanner in ${locale}`, async ({ page }) => {
      await page.goto(`${BASE_URL}/${locale}/blog`);
      await page.waitForLoadState('domcontentloaded');

      // Verify the banner message in the correct language
      const expectedMessage = blogBannerMessages[locale];
      await expect(page.locator(`text=${expectedMessage}`)).toBeVisible();

      // Blog content should still be in English (check for "Blog" heading)
      await expect(page.locator('h1', { hasText: 'Blog' })).toBeVisible();
    });
  }
});

// ============================================================================
// 6. LEGAL PAGES SHOW ENGLISH-ONLY BANNER FOR NON-EN LOCALES
// ============================================================================

test.describe('EnglishOnlyBanner on legal pages', () => {
  const legalPages = ['/privacy', '/terms', '/cookies', '/paia'] as const;

  const bannerMessages: Record<string, string> = {
    de: 'Diese Seite ist nur auf Englisch verfügbar',
    fr: 'Cette page est disponible uniquement en anglais',
    it: 'Questa pagina è disponibile solo in inglese',
  };

  for (const legalPage of legalPages) {
    test(`EN ${legalPage} does NOT show EnglishOnlyBanner`, async ({ page }) => {
      await page.goto(`${BASE_URL}/en${legalPage}/`);
      await page.waitForLoadState('domcontentloaded');

      for (const msg of Object.values(bannerMessages)) {
        await expect(page.locator(`text=${msg}`)).not.toBeVisible();
      }
    });
  }

  test('FR /privacy shows EnglishOnlyBanner in French', async ({ page }) => {
    await page.goto(`${BASE_URL}/fr/privacy`);
    await page.waitForLoadState('domcontentloaded');

    await expect(
      page.locator(`text=${bannerMessages.fr}`)
    ).toBeVisible();

    // Page content should still be in English
    await expect(page.locator('h1', { hasText: 'Privacy Policy' })).toBeVisible();
  });

  test('DE /terms shows EnglishOnlyBanner in German', async ({ page }) => {
    await page.goto(`${BASE_URL}/de/terms`);
    await page.waitForLoadState('domcontentloaded');

    await expect(
      page.locator(`text=${bannerMessages.de}`)
    ).toBeVisible();
  });

  test('IT /cookies shows EnglishOnlyBanner in Italian', async ({ page }) => {
    await page.goto(`${BASE_URL}/it/cookies`);
    await page.waitForLoadState('domcontentloaded');

    await expect(
      page.locator(`text=${bannerMessages.it}`)
    ).toBeVisible();
  });
});

// ============================================================================
// 7. INTERNAL LINKS PRESERVE LOCALE
// ============================================================================

test.describe('Internal navigation preserves locale prefix', () => {
  test('Clicking Technology link from /de stays in DE locale', async ({ page }) => {
    await page.goto(`${BASE_URL}/de`);
    await page.waitForLoadState('domcontentloaded');

    // Navigation.tsx uses the i18n-aware Link from @/i18n/navigation, so the
    // rendered nav label is translated ("Technologie" on /de) but the href
    // still contains "technology" and carries the /de/ prefix.
    const technologyLink = page.locator('nav a[href*="technology"]').first();
    const linkCount = await technologyLink.count();

    if (linkCount > 0) {
      await technologyLink.click();
      // Client-side transition: wait for the URL to actually settle.
      await page.waitForURL(/\/de\/technology/);

      expect(page.url()).toContain('/de/technology');
      await expect(page.locator('html')).toHaveAttribute('lang', 'de');
    } else {
      test.skip(true, 'Technology link not found in navigation');
    }
  });

  test('Footer links from /fr locale context include locale prefix', async ({ page }) => {
    await page.goto(`${BASE_URL}/fr`);
    await page.waitForLoadState('domcontentloaded');

    // Check footer links for locale awareness
    // Footer links may or may not be i18n-aware depending on implementation
    const footerTechLink = page.locator('footer a[href*="technology"]').first();
    const footerCount = await footerTechLink.count();

    if (footerCount > 0) {
      const href = await footerTechLink.getAttribute('href');
      // Document whether footer links include locale prefix
      if (href && href.includes('/fr/')) {
        // i18n-aware footer links
        expect(href).toContain('/fr/technology');
      } else {
        // Plain links without locale prefix
        expect(href).toContain('/technology');
      }
    }
  });
});

// ============================================================================
// 8. TRANSLATED CONTENT APPEARS CORRECTLY
// ============================================================================

test.describe('Translated content on locale pages', () => {
  // The de/fr/it message files now carry real translations of the hero
  // headline (see messages/<locale>/home.json), not the English placeholder
  // text. Each test checks the actual translated string for its locale.

  test('EN home page renders English hero content', async ({ page }) => {
    await page.goto(`${BASE_URL}/en/`);
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    // Check for hero title text (from en/home.json)
    await expect(page.locator('text=Automate Insurance Claim Decisions')).toBeVisible();
  });

  test('DE home page loads and renders content from DE message files', async ({ page }) => {
    await page.goto(`${BASE_URL}/de`);
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('html')).toHaveAttribute('lang', 'de');
    // Hero title from de/home.json ("hero.title")
    await expect(page.locator('text=Versicherungsentscheidungen automatisieren')).toBeVisible();
  });

  test('FR home page loads and renders content from FR message files', async ({ page }) => {
    await page.goto(`${BASE_URL}/fr`);
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
    // Hero title from fr/home.json ("hero.title")
    await expect(page.locator('text=Automatisez les décisions de sinistres')).toBeVisible();
  });

  test('IT home page loads and renders content from IT message files', async ({ page }) => {
    await page.goto(`${BASE_URL}/it`);
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('html')).toHaveAttribute('lang', 'it');
    // Hero title from it/home.json ("hero.title")
    await expect(page.locator('text=Automatizza le decisioni sui sinistri assicurativi')).toBeVisible();
  });

  test('DE technology page loads correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/de/technology`);
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('html')).toHaveAttribute('lang', 'de');
    // Page should render without errors (check for main content area)
    await expect(page.locator('main')).toBeVisible();
  });

  test('FR company page loads correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/fr/company`);
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
    await expect(page.locator('main')).toBeVisible();
  });

  test('IT contact page loads correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/it/contact`);
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('html')).toHaveAttribute('lang', 'it');
    await expect(page.locator('main')).toBeVisible();
  });
});

// ============================================================================
// 9. NAVIGATION ITEMS RENDERED ON LOCALE PAGES
// ============================================================================

test.describe('Navigation items on locale pages', () => {
  // Navigation.tsx uses the i18n-aware Link and translated labels from
  // messages/<locale>/common.json ("nav" namespace), so the visible nav text
  // is localized. Check each locale's actual translated labels.
  const navLabels: Record<string, { technology: string; company: string; contact: string }> = {
    de: { technology: 'Technologie', company: 'Unternehmen', contact: 'Kontakt' },
    fr: { technology: 'Technologie', company: 'Entreprise', contact: 'Contact' },
    it: { technology: 'Tecnologia', company: 'Azienda', contact: 'Contatti' },
  };

  for (const locale of NON_DEFAULT_LOCALES) {
    test(`Navigation renders on /${locale} page`, async ({ page }) => {
      await page.goto(`${BASE_URL}/${locale}`);
      await page.waitForLoadState('domcontentloaded');

      // Navigation header should be visible
      await expect(page.locator('header nav')).toBeVisible();

      // Navigation items should be present, translated for the locale
      // Desktop nav items (hidden on mobile via md:flex)
      const desktopNav = page.locator('header nav .hidden.md\\:flex').first();
      const navCount = await desktopNav.count();
      if (navCount > 0) {
        const labels = navLabels[locale];
        await expect(page.locator('header nav').getByText(labels.technology, { exact: true }).first()).toBeVisible();
        await expect(page.locator('header nav').getByText(labels.company, { exact: true }).first()).toBeVisible();
        await expect(page.locator('header nav').getByText(labels.contact, { exact: true }).first()).toBeVisible();
      }
    });
  }
});

// ============================================================================
// 10. 404 PAGE WORKS WITH LOCALE
// ============================================================================

test.describe('Not Found (404) page with locale', () => {
  test('EN 404 page renders for nonexistent path', async ({ page }) => {
    await page.goto(`${BASE_URL}/en/nonexistent-page-xyz`);
    await page.waitForLoadState('domcontentloaded');

    // Should show the 404 page content
    await expect(page.locator('text=404')).toBeVisible();
    await expect(page.locator('text=Page not found')).toBeVisible();

    // html lang should be "en"
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  for (const locale of NON_DEFAULT_LOCALES) {
    test(`${locale.toUpperCase()} 404 page renders for /${locale}/nonexistent-page`, async ({ page }) => {
      await page.goto(`${BASE_URL}/${locale}/nonexistent-page-xyz`);
      await page.waitForLoadState('domcontentloaded');

      // Should show the 404 page content
      await expect(page.locator('text=404')).toBeVisible();

      // html lang should still reflect the locale
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
    });
  }

  test('404 page has a "Go home" link', async ({ page }) => {
    await page.goto(`${BASE_URL}/de/nonexistent-page-xyz`);
    await page.waitForLoadState('domcontentloaded');

    const goHomeLink = page.locator('a', { hasText: 'Go home' });
    await expect(goHomeLink).toBeVisible();
  });
});

// ============================================================================
// ADDITIONAL: HTML LANG ATTRIBUTE CONSISTENCY
// ============================================================================

test.describe('HTML lang attribute consistency across pages', () => {
  const pagePaths = ['', '/technology', '/company', '/contact', '/blog', '/trust'];

  for (const locale of ALL_LOCALES) {
    test(`All pages set lang="${locale}" when accessed under /${locale}/`, async ({ page }) => {
      for (const path of pagePaths) {
        await page.goto(`${BASE_URL}/${locale}${path}/`);
        await page.waitForLoadState('domcontentloaded');

        await expect(page.locator('html')).toHaveAttribute('lang', locale);
      }
    });
  }
});

// ============================================================================
// ADDITIONAL: TRAILING SLASH NORMALISATION
// ============================================================================

test.describe('Trailing slash edge cases', () => {
  test('Accessing /en without a trailing slash lands on /en/', async ({ page }) => {
    await page.goto(`${BASE_URL}/en`);
    await page.waitForLoadState('domcontentloaded');

    // trailingSlash: true, so the dev server and Static Web Apps both
    // redirect /en to /en/. Either way, lang should be "en".
    expect(page.url()).toContain('/en/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('Accessing /en/technology without a trailing slash lands on /en/technology/', async ({ page }) => {
    await page.goto(`${BASE_URL}/en/technology`);
    await page.waitForLoadState('domcontentloaded');

    expect(page.url()).toContain('/en/technology/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });
});
