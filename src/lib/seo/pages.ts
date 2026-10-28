import en from "../../../messages/en/metadata.json";
import de from "../../../messages/de/metadata.json";
import fr from "../../../messages/fr/metadata.json";
import it from "../../../messages/it/metadata.json";

/**
 * One metadata entry per page and locale, from messages/<locale>/metadata.json.
 * Keys are the page path without the locale prefix ("/", "/platform/otus").
 * scripts/check-metadata.mjs fails the build on a missing or duplicate title or
 * description, so every field read here is present.
 */
export type PageEntry = {
  title: string;
  description: string;
  h1: string;
  /** Short name of the page in breadcrumb trails. */
  breadcrumb: string;
  /** Product name in the JSON-LD when it differs from the breadcrumb (Otus carries its descriptor). */
  schemaName?: string;
  ogTitle: string;
  ogDescription: string;
  /** Absolute image URL; the default social card when absent. */
  ogImage?: string;
  /** Pages are indexed and followed unless this says otherwise. */
  robots?: "index" | "noindex" | "noindex, nofollow";
  /** Date the page content last changed, YYYY-MM-DD. */
  updated: string;
};

type MetadataFile = {
  site: { name: string; breadcrumbLabel: string };
  pages: Record<string, PageEntry>;
};

const files: Record<string, MetadataFile> = {
  en: en as MetadataFile,
  de: de as MetadataFile,
  fr: fr as MetadataFile,
  it: it as MetadataFile,
};

/** "/platform/otus/" and "platform/otus" both become "/platform/otus"; "" becomes "/". */
export function pageKey(path: string): string {
  const trimmed = path.replace(/^\/+|\/+$/g, "");
  return trimmed ? `/${trimmed}` : "/";
}

export function pageEntry(locale: string, path: string): PageEntry {
  const key = pageKey(path);
  const entry = files[locale]?.pages[key];
  if (!entry) throw new Error(`No metadata for ${key} in messages/${locale}/metadata.json`);
  return entry;
}

/** The entry if the page exists in this locale, otherwise undefined. */
export function findPageEntry(locale: string, path: string): PageEntry | undefined {
  return files[locale]?.pages[pageKey(path)];
}

/** Paths of the pages directly below `path`, in file order. */
export function childPages(locale: string, path: string): string[] {
  const parent = pageKey(path);
  const prefix = parent === "/" ? "/" : `${parent}/`;
  return Object.keys(files[locale]?.pages ?? {}).filter(
    (key) => key !== parent && key.startsWith(prefix) && !key.slice(prefix.length).includes("/"),
  );
}

export function siteText(locale: string) {
  return (files[locale] ?? files.en).site;
}
