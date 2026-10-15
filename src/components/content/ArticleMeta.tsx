import type { Author } from "./schema";

/**
 * Author and dates for resource articles. Dates render as <time datetime>
 * so engines read the ISO value; the visible format follows the locale.
 * Labels ("By", "Published", "Updated") come from messages. Pass the same
 * author to personSchema() for the Article's author node.
 */
export function ArticleMeta({
  author,
  published,
  updated,
  locale,
  labels,
}: {
  author: Author;
  /** ISO date, for example 2026-10-14. */
  published: string;
  updated?: string;
  locale: string;
  labels: { by: string; published: string; updated: string };
}) {
  // The site writes UK English, so English dates read "14 October 2026".
  const format = (iso: string) =>
    new Intl.DateTimeFormat(locale === "en" ? "en-GB" : locale, { dateStyle: "long", timeZone: "UTC" }).format(
      new Date(iso),
    );
  return (
    <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
      <span>
        {labels.by} <span className="text-strong">{author.name}</span>
        {author.jobTitle && <>, {author.jobTitle}</>}
      </span>
      <span>
        {labels.published} <time dateTime={published}>{format(published)}</time>
      </span>
      {updated && updated !== published && (
        <span>
          {labels.updated} <time dateTime={updated}>{format(updated)}</time>
        </span>
      )}
    </p>
  );
}
