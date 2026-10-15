import type { Metadata } from "next";
import { pageLocales } from "@/i18n/page-locales";
import { DEFAULT_OG_IMAGE } from "@/lib/og-image";
import { localeUrl } from "@/lib/site-url";
import { pageEntry, siteText } from "./pages";

const OG_LOCALES: Record<string, string> = { en: "en_GB", de: "de_CH", fr: "fr_CH", it: "it_CH" };

type ArticleMetadata = {
  publishedTime?: string;
  authors?: string[];
};

/**
 * Next.js metadata for one page, built from its entry in metadata.json.
 * The canonical is always the page's own URL; hreflang lists the locales the
 * page exists in plus x-default. Pass `article` for blog posts, case studies
 * and news, so Open Graph says article and carries the dates.
 */
export function pageMetadata(locale: string, path: string, article?: ArticleMetadata): Metadata {
  const page = pageEntry(locale, path);
  const url = localeUrl(locale, path);
  const languages: Record<string, string> = {};
  for (const loc of pageLocales(path)) languages[loc] = localeUrl(loc, path);
  languages["x-default"] = localeUrl("en", path);
  const image = { url: page.ogImage ?? DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: page.ogTitle };
  const robots = page.robots ?? "index";

  return {
    // absolute: the title in metadata.json already ends in "| True Aim".
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: url, languages },
    robots: { index: robots === "index", follow: robots !== "noindex, nofollow" },
    openGraph: {
      url,
      siteName: siteText(locale).name,
      locale: OG_LOCALES[locale],
      title: page.ogTitle,
      description: page.ogDescription,
      images: [image],
      ...(article
        ? {
            type: "article",
            ...(article.publishedTime ? { publishedTime: article.publishedTime } : {}),
            modifiedTime: page.updated,
            ...(article.authors ? { authors: article.authors } : {}),
          }
        : { type: "website" }),
    },
    twitter: {
      card: "summary_large_image",
      title: page.ogTitle,
      description: page.ogDescription,
      images: [image.url],
    },
  };
}
