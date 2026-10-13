export const SITE_URL = "https://trueaim.ai";

/**
 * Absolute, locale-prefixed page URL with a trailing slash.
 * localeUrl("en", "/contact") -> https://trueaim.ai/en/contact/
 * localeUrl("de") -> https://trueaim.ai/de/
 * Every locale is prefixed, English included, and every page URL ends in a slash.
 */
export function localeUrl(locale: string, path = ""): string {
  const trimmed = path.replace(/^\/+|\/+$/g, "");
  return trimmed ? `${SITE_URL}/${locale}/${trimmed}/` : `${SITE_URL}/${locale}/`;
}
