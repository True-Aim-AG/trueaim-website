import type { ArticleData } from "@/lib/seo/schema";
import { articleAuthor } from "@/data/authors";
import { blogPosts } from "@/lib/blog-posts";

const post = blogPosts.find((entry) => entry.slug === "complete-claims-record")!;

/**
 * Schema data for this post, read by the page's JSON-LD graph (src/lib/seo/schema.ts).
 * Dates, author and sources describe what the article shows.
 */
export const article: ArticleData = {
  datePublished: post.publishedIso,
  author: articleAuthor("frederic-brunner", "Co-founder and CTO"),
  section: post.category,
  keywords: ["ai audit trail", "auditable ai", "claims audit trail", "complete claims record", "ai governance in insurance"],
  wordCount: 1300,
  citations: [
    {
      name: "FINMA, Guidance 08/2024, FINMA guidance on governance and risk management when using artificial intelligence, 18 December 2024",
      url: "https://www.finma.ch/en/news/2024/12/20241218-mm-finma-am-08-24/",
    },
    {
      name: "EIOPA, Opinion on AI governance and risk management, EIOPA-BoS-25-360, 6 August 2025",
      url: "https://www.eiopa.europa.eu/publications/opinion-artificial-intelligence-governance-and-risk-management_en",
    },
    {
      name: "NAIC, Model Bulletin on the Use of Artificial Intelligence Systems by Insurers, 4 December 2023",
      url: "https://content.naic.org/sites/default/files/2023-12-4%20Model%20Bulletin_Adopted_0.pdf",
    },
  ],
};
