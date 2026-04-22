import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

const SLUG = "auditability-evidence-chains";
const URL = `https://trueaim.ai/blog/${SLUG}`;
const TITLE =
  "Auditability in Claims AI: Building Evidence Chains That Auditors Actually Accept";
const META_DESCRIPTION =
  "Learn how to build AI systems with complete audit trails that satisfy FINMA and EU AI Act requirements. Practical architecture for field-to-source provenance, decision audit trails, and human override capture.";
const OG_DESCRIPTION =
  "Everyone says their AI is explainable. Few can prove it to an auditor. Here's the architecture that makes it possible.";
const TWITTER_DESCRIPTION =
  "Learn how to build AI systems with complete audit trails that satisfy regulators.";
const PUBLISHED = "2025-02-01T00:00:00.000Z";

export const metadata: Metadata = {
  title: TITLE,
  description: META_DESCRIPTION,
  keywords: [
    "AI auditability",
    "claims automation",
    "FINMA compliance",
    "EU AI Act",
    "evidence chains",
    "insurance AI",
    "regulatory compliance",
    "explainable AI",
  ],
  openGraph: {
    title: TITLE,
    description: OG_DESCRIPTION,
    url: URL,
    type: "article",
    publishedTime: PUBLISHED,
    authors: ["True Aim"],
    tags: ["AI", "Compliance", "Insurance", "Auditability", "FINMA", "EU AI Act"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: TWITTER_DESCRIPTION,
  },
  alternates: {
    canonical: URL,
  },
};

const blogPostingJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: TITLE,
  description: META_DESCRIPTION,
  url: URL,
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": URL,
  },
  author: {
    "@type": "Organization",
    name: "TrueAim AG",
    url: "https://trueaim.ai",
  },
  publisher: {
    "@type": "Organization",
    name: "TrueAim AG",
    url: "https://trueaim.ai",
    logo: {
      "@type": "ImageObject",
      url: "https://trueaim.ai/logo.png",
    },
  },
  keywords: ["Auditability", "FINMA", "EU AI Act", "Claims AI"],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://trueaim.ai" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://trueaim.ai/blog" },
    { "@type": "ListItem", position: 3, name: TITLE, item: URL },
  ],
};

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={blogPostingJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {children}
    </>
  );
}
