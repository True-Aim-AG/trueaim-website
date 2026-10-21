import type { ArticleData } from "@/lib/seo/schema";

/**
 * Schema data for this post, read by the page's JSON-LD graph (src/lib/seo/schema.ts).
 * Dates, author and sources describe what the article shows.
 */
export const article: ArticleData = {
  datePublished: "2026-10-22T00:00:00.000Z",
  author: { name: "Reuben John", jobTitle: "CEO and Co-Founder" },
  section: "Operating Model",
  keywords: [
    "agentic claims operation",
    "inter-organisational transparency",
    "shared claim record",
    "claims automation",
    "auditable claims decisions",
    "price benchmarking",
    "delegated authority",
    "human oversight",
  ],
  wordCount: 1900,
};
