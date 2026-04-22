import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

const SLUG = "why-claims-ai-pilots-stall";
const URL = `https://trueaim.ai/blog/${SLUG}`;
const TITLE = "Why Claims AI Pilots Stall Before Production Readiness";
const DESCRIPTION =
  "Many claims AI pilots report accuracy in the mid 90s. Yet months later they are still not live in production. The root cause is measurement discipline and production realism.";
const PUBLISHED = "2026-02-15T00:00:00.000Z";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Claims AI",
    "Production readiness",
    "AI evaluation",
    "AI accuracy",
    "insurance AI",
    "claims automation",
    "pilot to production",
    "AI measurement",
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: "article",
    publishedTime: PUBLISHED,
    authors: ["True Aim"],
    tags: ["AI", "Claims AI", "Production Readiness", "Evaluation", "Accuracy"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  alternates: {
    canonical: URL,
  },
};

const blogPostingJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: TITLE,
  description: DESCRIPTION,
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
  keywords: ["Claims AI", "Production Readiness", "Evaluation", "Accuracy"],
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
