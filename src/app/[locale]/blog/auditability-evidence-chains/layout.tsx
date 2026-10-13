import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { defaultOgImages } from "@/lib/og-image";

const SLUG = "auditability-evidence-chains";
const PAGE_URL = `https://trueaim.ai/en/blog/${SLUG}/`;
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
    url: PAGE_URL,
    type: "article",
    images: defaultOgImages,
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
    canonical: PAGE_URL,
  },
};

const blogPostingJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: TITLE,
  description: META_DESCRIPTION,
  url: PAGE_URL,
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": PAGE_URL,
  },
  author: {
    "@type": "Organization",
    name: "True Aim AG",
    url: "https://trueaim.ai",
  },
  publisher: {
    "@type": "Organization",
    name: "True Aim AG",
    url: "https://trueaim.ai",
  },
  keywords: ["Auditability", "FINMA", "EU AI Act", "Claims AI"],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://trueaim.ai/en/" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://trueaim.ai/en/blog/" },
    { "@type": "ListItem", position: 3, name: TITLE, item: PAGE_URL },
  ],
};

export default async function BlogPostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <JsonLd data={blogPostingJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {children}
    </>
  );
}
