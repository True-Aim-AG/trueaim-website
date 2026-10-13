import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { defaultOgImages } from "@/lib/og-image";
import { scorecardQuestions } from "./questions";
import { faqs } from "./faqs";

const SLUG = "ai-claims-auditability-scorecard";
const PAGE_URL = `https://trueaim.ai/en/blog/${SLUG}/`;
// Deliberately different: TITLE is the <title> tag written for the query,
// OG_TITLE is the on-page H1 and the headline used everywhere else.
const TITLE = "12 Questions to Ask Before You Trust AI With a Claims Decision";
const OG_TITLE = "The AI Claims Auditability Scorecard";
const DESCRIPTION =
  "Twelve questions that show whether an AI claims system can account for every decision it makes, and how True Aim answers each one.";
const PUBLISHED = "2026-09-10T00:00:00.000Z";
const MODIFIED = "2026-09-10T00:00:00.000Z";

const AUTHOR = {
  "@type": "Person",
  name: "Reuben John",
  jobTitle: "Chief Executive Officer",
  worksFor: {
    "@type": "Organization",
    name: "True Aim AG",
    url: "https://trueaim.ai",
  },
} as const;

const KEYWORDS = [
  "AI claims auditability",
  "auditable AI claims decisions",
  "claims AI best practice",
  "decision provenance",
  "GDPR Article 22",
  "EU AI Act",
  "FINMA Guidance 08/2024",
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
    tags: ["Auditability", "GDPR Article 22", "EU AI Act", "Claims AI"],
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
  articleSection: "Best Practice",
  keywords: KEYWORDS.join(", "),
  wordCount: 3418,
  inLanguage: "en-GB",
  isAccessibleForFree: true,
  author: AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "True Aim AG",
    url: "https://trueaim.ai",
  },
  about: [
    {
      "@type": "Legislation",
      name: "Regulation (EU) 2024/1689 (Artificial Intelligence Act)",
      sameAs:
        "https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ:L_202401689",
    },
    {
      "@type": "Legislation",
      name: "Regulation (EU) 2026/1744 (Digital Omnibus on AI)",
      sameAs:
        "https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202601744",
    },
    {
      "@type": "Legislation",
      name: "Regulation (EU) 2016/679 (General Data Protection Regulation), Articles 15(1)(h) and 22",
      sameAs:
        "https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32016R0679",
    },
  ],
  citation: [
    {
      "@type": "CreativeWork",
      name: "Regulation (EU) 2026/1744 (Digital Omnibus on AI), Official Journal, 24 July 2026",
      url: "https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202601744",
    },
    {
      "@type": "CreativeWork",
      name: "Regulation (EU) 2024/1689 (AI Act), Annex III and Article 113",
      url: "https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ:L_202401689",
    },
    {
      "@type": "CreativeWork",
      name: "Regulation (EU) 2016/679 (GDPR), Articles 15(1)(h) and 22",
      url: "https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32016R0679",
    },
    {
      "@type": "CreativeWork",
      name: "FINMA, Guidance 08/2024: Governance and risk management when using artificial intelligence, 18 December 2024",
      url: "https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/4dokumentation/finma-aufsichtsmitteilungen/20241218-finma-aufsichtsmitteilung-08-2024.pdf?sc_lang=en",
    },
    {
      "@type": "CreativeWork",
      name: "FINMA, Circular 2018/3: Outsourcing \u2013 banks, insurance companies and selected financial institutions under FinIA, last amended 4 November 2020, in force 1 January 2021, margin no. 24",
      url: "https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/rundschreiben/finma-rs-2018-03-01012021_de.pdf?sc_lang=en",
    },
    {
      "@type": "CreativeWork",
      name: "Grant Thornton, 2026 AI Impact Survey Report, insurance findings",
      url: "https://www.grantthornton.com/insights/survey-reports/insurance/2026/insurance-insights-2026-ai-impact-survey-report",
    },
  ],
};

// The twelve questions as a machine-readable checklist, so an assistant
// answering "what should I ask before trusting AI with a claims decision" can lift the list itself
// rather than paraphrasing the prose around it.
const checklistJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${PAGE_URL}#scorecard`,
  name: "The AI claims auditability scorecard: twelve questions",
  description:
    "Twelve questions every claims leader should be able to answer about AI operating in their name, in four groups: provenance, reconstruction, human judgement and continuity.",
  url: PAGE_URL,
  numberOfItems: scorecardQuestions.length,
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  itemListElement: scorecardQuestions.map((question, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: question.question,
    description: question.plainAnswer,
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
      <JsonLd data={checklistJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {children}
    </>
  );
}
