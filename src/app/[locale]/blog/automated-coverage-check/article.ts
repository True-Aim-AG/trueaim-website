import type { ArticleData } from "@/lib/seo/schema";
import { articleAuthor } from "@/data/authors";
import { blogPosts } from "@/lib/blog-posts";

const post = blogPosts.find((entry) => entry.slug === "automated-coverage-check")!;

/**
 * Schema data for this post, read by the page's JSON-LD graph (src/lib/seo/schema.ts).
 * Dates, author and sources describe what the article shows.
 */
export const article: ArticleData = {
  datePublished: post.publishedIso,
  author: articleAuthor("frederic-brunner", "Co-founder and CTO"),
  section: post.category,
  keywords: ["automated coverage check", "coverage check", "insurance coverage check", "policy wording rules", "claims coverage analysis"],
  wordCount: 1100,
  citations: [
    {
      name: "True Aim, NSA Services SA case study",
      url: "https://trueaim.ai/en/case-studies/vehicle-warranty-claims/",
    },
  ],
};
