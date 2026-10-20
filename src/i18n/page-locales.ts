import { routing } from "./routing";

/**
 * Pages that exist in English only. A prefix covers the page and everything below it.
 * These pages export under /en/ only, the language switcher offers English only on them,
 * and links to them from a German, French or Italian page go to the English URL.
 * A page leaves this list when its translation lands (chunk 11).
 */
export const englishOnlyPaths = [
  "/ai-transparency",
  "/blog",
  "/changelog",
  "/cookies",
  "/ethics",
  "/paia",
  "/platform",
  "/privacy",
  "/privacy-legacy",
  "/security",
  "/solutions",
  "/sub-processors",
  "/support",
  "/terms",
];

/** Locales a page exists in, for a path without the locale prefix ("/blog/x", "/technology#a"). */
export function pageLocales(path: string): readonly string[] {
  const clean = "/" + path.split(/[?#]/)[0].replace(/^\/+|\/+$/g, "");
  const englishOnly = englishOnlyPaths.some((prefix) => clean === prefix || clean.startsWith(prefix + "/"));
  return englishOnly ? ["en"] : routing.locales;
}

/** generateStaticParams for the layout of an English-only page: export it under /en/ only. */
export function englishOnlyStaticParams() {
  return [{ locale: "en" }];
}
