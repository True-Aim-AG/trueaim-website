export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedIso: string;
  displayDate: string;
  readTime: string;
  category: string;
  tags: string[];
  featured?: boolean;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "where-the-language-model-does-not-belong",
    title:
      "Where the Language Model Does Not Belong: Designing Defensible AI in Claims Operations",
    excerpt:
      "Every claim decision is reading, computing and judging. Where a language model belongs, where rules must hold and how the record shows the line.",
    publishedIso: "2026-10-06T00:00:00.000Z",
    displayDate: "October 2026",
    readTime: "7 min read",
    category: "Technical Architecture",
    tags: ["Claims AI", "Decision Trees", "Language Models", "Auditability"],
    featured: true,
  },
  {
    slug: "ai-claims-auditability-scorecard",
    title: "The AI Claims Auditability Scorecard",
    excerpt:
      "Twelve questions that show whether an AI claims system can account for every decision it makes, and how True Aim answers each one.",
    publishedIso: "2026-09-10T00:00:00.000Z",
    displayDate: "September 2026",
    readTime: "14 min read",
    category: "Best Practice",
    tags: ["Auditability", "GDPR Article 22", "EU AI Act", "Claims AI"],
  },
  {
    slug: "ai-claims-handling-eu-ai-act-high-risk",
    title:
      "AI Claims Handling Is Not High-Risk Under the EU AI Act. Here Is What Binds It Instead.",
    excerpt:
      "Claims handling is absent from Annex III. GDPR Article 22 binds it anyway. Only 24% of insurers say they could pass a governance review in 90 days.",
    publishedIso: "2026-07-28T00:00:00.000Z",
    displayDate: "July 2026",
    readTime: "12 min read",
    category: "Regulatory & Compliance",
    tags: ["EU AI Act", "GDPR Article 22", "EIOPA", "Claims AI", "Governance"],
  },
  {
    slug: "why-claims-ai-pilots-stall",
    title: "Why Claims AI Pilots Stall Before Production Readiness",
    excerpt:
      "Many claims AI pilots report accuracy in the mid 90s. Yet months later they are still not live in production. The root cause is measurement discipline and production realism.",
    publishedIso: "2026-02-15T00:00:00.000Z",
    displayDate: "February 2026",
    readTime: "10 min read",
    category: "Production Readiness",
    tags: ["Claims AI", "Production Readiness", "Evaluation", "Accuracy"],
  },
  {
    slug: "auditability-evidence-chains",
    title:
      "Auditability in Claims AI: Building Evidence Chains That Auditors Actually Accept",
    excerpt:
      "Everyone says their AI is explainable. Few can prove it to an auditor. Here's the architecture that makes it possible, and the regulatory requirements it satisfies.",
    publishedIso: "2025-02-01T00:00:00.000Z",
    displayDate: "February 2025",
    readTime: "12 min read",
    category: "Compliance & Governance",
    tags: ["Auditability", "FINMA", "EU AI Act", "Claims AI"],
  },
  {
    slug: "build-vs-buy-idp-vendors",
    title: "Build vs Buy: What to Demand from IDP Vendors",
    excerpt:
      "A practical evaluation framework for insurance teams evaluating claims automation solutions. Learn when to build, when to buy, and how to evaluate vendors objectively.",
    publishedIso: "2025-02-01T00:00:00.000Z",
    displayDate: "February 2025",
    readTime: "15 min read",
    category: "Vendor Evaluation",
    tags: ["Vendor Evaluation", "Build vs Buy", "IDP", "Claims AI"],
  },
];
