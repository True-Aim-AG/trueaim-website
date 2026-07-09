import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { defaultOgImages } from "@/lib/og-image";

const SLUG = "build-vs-buy-idp-vendors";
const PAGE_URL = `https://trueaim.ai/blog/${SLUG}`;
const TITLE = "Build vs Buy: What to Demand from IDP Vendors";
const DESCRIPTION =
  "A practical evaluation framework for insurance teams evaluating claims automation solutions. Learn when to build, when to buy, and how to evaluate vendors objectively.";
const PUBLISHED = "2025-02-01T00:00:00.000Z";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "IDP vendors",
    "claims automation",
    "build vs buy",
    "vendor evaluation",
    "insurance AI",
    "document processing",
    "claims AI",
    "vendor selection",
  ],
  openGraph: {
    title: TITLE,
    description:
      "A practical evaluation framework for insurance teams evaluating claims automation solutions.",
    url: PAGE_URL,
    type: "article",
    images: defaultOgImages,
    publishedTime: PUBLISHED,
    authors: ["True Aim"],
    tags: ["AI", "Vendor Evaluation", "Insurance", "Claims Automation", "IDP"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      "A practical evaluation framework for insurance teams evaluating claims automation solutions.",
  },
  alternates: {
    canonical: PAGE_URL,
  },
};

const blogPostingJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: TITLE,
  description: DESCRIPTION,
  url: PAGE_URL,
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": PAGE_URL,
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
  },
  keywords: ["Vendor Evaluation", "Build vs Buy", "IDP", "Claims AI"],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://trueaim.ai" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://trueaim.ai/blog" },
    { "@type": "ListItem", position: 3, name: TITLE, item: PAGE_URL },
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
