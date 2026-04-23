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
    slug: "why-claims-ai-pilots-stall",
    title: "Why Claims AI Pilots Stall Before Production Readiness",
    excerpt:
      "Many claims AI pilots report accuracy in the mid 90s. Yet months later they are still not live in production. The root cause is measurement discipline and production realism.",
    publishedIso: "2026-02-15T00:00:00.000Z",
    displayDate: "February 2026",
    readTime: "10 min read",
    category: "Production Readiness",
    tags: ["Claims AI", "Production Readiness", "Evaluation", "Accuracy"],
    featured: true,
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
