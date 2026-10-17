/**
 * The news items, newest first. The copy for each item lives in
 * messages/en/news.json under items.<key>; this file holds only the slug and
 * the publication date used for NewsArticle markup.
 */
export type NewsItem = {
  key: "insurathon2026";
  slug: string;
  /** ISO date the item went live on trueaim.ai. */
  datePublished: string;
};

export const newsItems: NewsItem[] = [
  { key: "insurathon2026", slug: "true-aim-wins-insurathon-2026", datePublished: "2026-10-19" },
];
