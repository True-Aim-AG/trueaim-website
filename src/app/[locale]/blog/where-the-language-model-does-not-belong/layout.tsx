import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { defaultOgImages } from "@/lib/og-image";
import { operations } from "./operations";
import { faqs } from "./faqs";

const SLUG = "where-the-language-model-does-not-belong";
const PAGE_URL = `https://trueaim.ai/en/blog/${SLUG}/`;
// Deliberately different: TITLE is the <title> tag written for the query,
// OG_TITLE is the article's headline and the one used everywhere else.
const TITLE = "Rules or Model? Where AI Belongs in a Claim Decision";
const OG_TITLE =
  "Where the Language Model Does Not Belong: Designing Defensible AI in Claims Operations";
const DESCRIPTION =
  "Every claim decision is reading, computing and judging. Where a language model belongs, where rules must hold and how the record shows the line.";
const PUBLISHED = "2026-10-06T00:00:00.000Z";
const MODIFIED = "2026-10-06T00:00:00.000Z";

const AUTHOR = {
  "@type": "Person",
  name: "Reuben John",
  jobTitle: "CEO and Co-Founder",
  worksFor: {
    "@type": "Organization",
    name: "True Aim AG",
    url: "https://trueaim.ai",
  },
} as const;

const KEYWORDS = [
  "language models in claims",
  "AI in claims decisions",
  "deterministic vs probabilistic AI",
  "decision trees",
  "rules vs models",
  "claims automation",
  "explainable claims decisions",
  "human oversight",
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: KEYWORDS,
  authors: [{ name: "Reuben John" }],
  openGraph: {
    title: OG_TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    type: "article",
    images: defaultOgImages,
    publishedTime: PUBLISHED,
    modifiedTime: MODIFIED,
    authors: ["Reuben John"],
    tags: ["Claims AI", "Decision Trees", "Language Models", "Auditability"],
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: DESCRIPTION,
  },
  alternates: {
    canonical: PAGE_URL,
  },
};

const blogPostingJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": `${PAGE_URL}#article`,
  headline: OG_TITLE,
  alternativeHeadline: TITLE,
  description: DESCRIPTION,
  url: PAGE_URL,
  image: "https://trueaim.ai/en/opengraph-image.png",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": PAGE_URL,
  },
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
  articleSection: "Technical Architecture",
  keywords: KEYWORDS.join(", "),
  wordCount: 1600,
  inLanguage: "en-GB",
  isAccessibleForFree: true,
  author: AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "True Aim AG",
    url: "https://trueaim.ai",
  },
};

// The three kinds of step as a machine-readable list, so an assistant
// answering "where does a language model belong in a claim decision" can lift
// the list itself rather than paraphrasing the prose around it.
const operationsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${PAGE_URL}#operations`,
  name: "The three core operations inside a claim decision",
  description:
    "A claim decision is a chain of steps of three kinds: reading, computing and judging.",
  url: PAGE_URL,
  numberOfItems: operations.length,
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  itemListElement: operations.map((operation, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: operation.name,
    description: operation.description,
  })),
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${PAGE_URL}#faq`,
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://trueaim.ai/en/" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://trueaim.ai/en/blog/" },
    { "@type": "ListItem", position: 3, name: OG_TITLE, item: PAGE_URL },
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
      <JsonLd data={operationsJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {children}
    </>
  );
}
