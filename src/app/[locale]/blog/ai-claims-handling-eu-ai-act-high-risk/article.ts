import type { ArticleData } from "@/lib/seo/schema";

/**
 * Schema data for this post, read by the page's JSON-LD graph (src/lib/seo/schema.ts).
 * Dates, author and sources describe what the article shows.
 */
export const article: ArticleData = {
  datePublished: "2026-07-28T00:00:00.000Z",
  section: "Regulatory",
  keywords: ["EU AI Act","Annex III","claims handling","GDPR Article 22","EIOPA","insurance AI governance"],
  wordCount: 3165,
  legislation: [
    {
      name: "Regulation (EU) 2024/1689 (Artificial Intelligence Act)",
      sameAs: "https://artificialintelligenceact.eu/annex/3/",
    },
    {
      name: "Regulation (EU) 2026/1744 (Digital Omnibus on AI)",
      sameAs: "https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng",
    },
    {
      name: "Regulation (EU) 2016/679 (General Data Protection Regulation), Article 22",
    },
  ],
  citations: [
    {
      name: "Regulation (EU) 2026/1744 (Digital Omnibus on AI), Official Journal, 24 July 2026",
      url: "https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng",
    },
    {
      name: "Regulation (EU) 2024/1689 (AI Act), Annex III point 5; Article 6(3), 6(4), 49(2)",
      url: "https://artificialintelligenceact.eu/annex/3/",
    },
    {
      name: "European Commission, Draft Guidelines on the classification of high-risk AI systems, 19 May 2026",
      url: "https://digital-strategy.ec.europa.eu/en/library/draft-commission-guidelines-classification-high-risk-ai-systems",
    },
    {
      name: "CJEU, OQ v Land Hessen (SCHUFA), C-634/21, 7 December 2023",
    },
    {
      name: "CJEU, CK v Magistrat der Stadt Wien / Dun & Bradstreet Austria GmbH, C-203/22, 27 February 2025",
    },
    {
      name: "Article 29 Working Party, Guidelines on Automated individual decision-making and Profiling, WP251rev.01",
    },
    {
      name: "EIOPA, Opinion on Artificial Intelligence governance and risk management, EIOPA-BoS-25-360, 6 August 2025",
      url: "https://www.eiopa.europa.eu/publications/opinion-artificial-intelligence-governance-and-risk-management_en",
    },
    {
      name: "Grant Thornton, 2026 AI Impact Survey Report, insurance findings",
      url: "https://www.grantthornton.com/insights/survey-reports/insurance/2026/insurance-insights-2026-ai-impact-survey-report",
    },
  ],
};
