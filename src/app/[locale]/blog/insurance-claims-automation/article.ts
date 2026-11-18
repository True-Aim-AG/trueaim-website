import type { ArticleData } from "@/lib/seo/schema";
import { articleAuthor } from "@/data/authors";
import { blogPosts } from "@/lib/blog-posts";

const post = blogPosts.find((entry) => entry.slug === "insurance-claims-automation")!;

/**
 * Schema data for this post, read by the page's JSON-LD graph (src/lib/seo/schema.ts).
 * Dates, author and sources describe what the article shows.
 */
export const article: ArticleData = {
  datePublished: post.publishedIso,
  author: articleAuthor("reuben-john", "Co-founder and CEO"),
  section: post.category,
  keywords: [
    "insurance claims automation",
    "automated claims processing",
    "claims data extraction",
    "automated coverage check",
    "claims automation metrics",
  ],
  wordCount: 1700,
  citations: [
    {
      name: "True Aim, NSA Services SA case study",
      url: "https://trueaim.ai/en/case-studies/vehicle-warranty-claims/",
    },
    {
      name: "Berghaus, D., Berger, A., Hillebrand, L., Cvejoski, K. and Sifa, R., Multi-Modal Vision vs. Text-Based Parsing: Benchmarking LLM Strategies for Invoice Processing, Fraunhofer IAIS and Lamarr Institute, 2025",
      url: "https://arxiv.org/abs/2509.04469",
    },
  ],
};
