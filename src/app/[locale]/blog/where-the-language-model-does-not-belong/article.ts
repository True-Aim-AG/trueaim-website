import type { ArticleData, ListData } from "@/lib/seo/schema";
import { operations } from "./operations";

/**
 * Schema data for this post, read by the page's JSON-LD graph (src/lib/seo/schema.ts).
 * Dates, author and sources describe what the article shows.
 */
export const article: ArticleData = {
  datePublished: "2026-10-06T00:00:00.000Z",
  author: { name: "Reuben John", jobTitle: "CEO and Co-Founder" },
  section: "Technical Architecture",
  keywords: [
    "language models in claims",
    "AI in claims decisions",
    "deterministic vs probabilistic AI",
    "decision trees",
    "rules vs models",
    "claims automation",
    "explainable claims decisions",
    "human oversight",
  ],
  wordCount: 1600,
};

export const list: ListData = {
  id: "operations",
  name: "The three core operations inside a claim decision",
  description: "A claim decision is a chain of steps of three kinds: reading, computing and judging.",
  items: operations.map((operation) => ({ name: operation.name, description: operation.description })),
};
