import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { defaultOgImages } from "@/lib/og-image";

const SLUG = "ai-claims-handling-eu-ai-act-high-risk";
const PAGE_URL = `https://trueaim.ai/blog/${SLUG}`;
const TITLE = "Is AI Claims Handling High-Risk Under the EU AI Act?";
const OG_TITLE =
  "AI Claims Handling Is Not High-Risk Under the EU AI Act. Here Is What Binds It Instead.";
const DESCRIPTION =
  "Claims handling is absent from Annex III. GDPR Article 22 binds it anyway. Only 24% of insurers say they could pass a governance review in 90 days.";
const PUBLISHED = "2026-07-28T00:00:00.000Z";
const MODIFIED = "2026-07-31T00:00:00.000Z";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "EU AI Act",
    "Annex III",
    "claims handling",
    "GDPR Article 22",
    "EIOPA",
    "insurance AI governance",
    "Digital Omnibus",
    "high-risk AI",
  ],
  openGraph: {
    title: OG_TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    type: "article",
    images: defaultOgImages,
    publishedTime: PUBLISHED,
    modifiedTime: MODIFIED,
    authors: ["True Aim"],
    tags: [
      "EU AI Act",
      "claims handling",
      "GDPR Article 22",
      "insurance AI governance",
    ],
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
  description: DESCRIPTION,
  url: PAGE_URL,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": PAGE_URL,
  },
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
  articleSection: "Regulatory",
  keywords:
    "EU AI Act, Annex III, claims handling, GDPR Article 22, EIOPA, insurance AI governance",
  wordCount: 3165,
  inLanguage: "en-GB",
  isAccessibleForFree: true,
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
  about: [
    {
      "@type": "Legislation",
      name: "Regulation (EU) 2024/1689 (Artificial Intelligence Act)",
      sameAs: "https://artificialintelligenceact.eu/annex/3/",
    },
    {
      "@type": "Legislation",
      name: "Regulation (EU) 2026/1744 (Digital Omnibus on AI)",
      sameAs: "https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng",
    },
    {
      "@type": "Legislation",
      name: "Regulation (EU) 2016/679 (General Data Protection Regulation), Article 22",
    },
  ],
  citation: [
    {
      "@type": "CreativeWork",
      name: "Regulation (EU) 2026/1744 (Digital Omnibus on AI), Official Journal, 24 July 2026",
      url: "https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng",
    },
    {
      "@type": "CreativeWork",
      name: "Regulation (EU) 2024/1689 (AI Act), Annex III point 5; Article 6(3), 6(4), 49(2)",
      url: "https://artificialintelligenceact.eu/annex/3/",
    },
    {
      "@type": "CreativeWork",
      name: "European Commission, Draft Guidelines on the classification of high-risk AI systems, 19 May 2026",
      url: "https://digital-strategy.ec.europa.eu/en/library/draft-commission-guidelines-classification-high-risk-ai-systems",
    },
    {
      "@type": "CreativeWork",
      name: "CJEU, OQ v Land Hessen (SCHUFA), C-634/21, 7 December 2023",
    },
    {
      "@type": "CreativeWork",
      name: "CJEU, CK v Magistrat der Stadt Wien / Dun & Bradstreet Austria GmbH, C-203/22, 27 February 2025",
    },
    {
      "@type": "CreativeWork",
      name: "Article 29 Working Party, Guidelines on Automated individual decision-making and Profiling, WP251rev.01",
    },
    {
      "@type": "CreativeWork",
      name: "EIOPA, Opinion on Artificial Intelligence governance and risk management, EIOPA-BoS-25-360, 6 August 2025",
      url: "https://www.eiopa.europa.eu/publications/opinion-artificial-intelligence-governance-and-risk-management_en",
    },
    {
      "@type": "CreativeWork",
      name: "Grant Thornton, 2026 AI Impact Survey Report, insurance findings",
      url: "https://www.grantthornton.com/insights/survey-reports/insurance/2026/insurance-insights-2026-ai-impact-survey-report",
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${PAGE_URL}#faq`,
  mainEntity: [
    {
      "@type": "Question",
      name: "Is AI claims handling high-risk under the EU AI Act?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Annex III does not list claims handling. Point 5(c) covers risk assessment and pricing for life and health insurance only. The Commission's draft classification guidelines of 19 May 2026 give claims management as an example of a system falling outside that point, even for health insurance products. A motor, property, warranty or commercial-lines claims operation falls outside the high-risk regime, though it remains subject to data protection law and to sectoral insurance law.",
      },
    },
    {
      "@type": "Question",
      name: "Is AI claims handling high-risk in health insurance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Health insurance is the sharpest test of the rule, because underwriting in that line is high-risk. The Commission's draft guidelines still place claims management outside point 5(c) there, on the basis that verifying a claim against policy terms or determining the amount payable is distinct from risk assessment or pricing.",
      },
    },
    {
      "@type": "Question",
      name: "Does the December 2027 deferral apply to claims handling?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It has no effect on it. The Digital Omnibus deferred the date on which high-risk obligations begin to apply. It did not change which systems are high-risk. Claims handling was not among them before the deferral or after it.",
      },
    },
    {
      "@type": "Question",
      name: "What did Regulation (EU) 2026/1744 change?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It deferred the AI Act's high-risk obligations. Standalone Annex III systems move from 2 August 2026 to 2 December 2027. AI embedded in regulated products moves from 2 August 2027 to 2 August 2028. It was published on 24 July 2026 and entered into force on 27 July 2026.",
      },
    },
    {
      "@type": "Question",
      name: "Does GDPR Article 22 apply to an automated claims decision?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, where the GDPR is the applicable regime. Article 22 restricts decisions based solely on automated processing that produce legal effects or similarly significant effects. A declined or reduced claim meets that threshold. It has applied since 25 May 2018 and was unaffected by the AI Act deferral. Operations outside the EU answer to the equivalent provision in their own regime, such as Switzerland's revised Federal Act on Data Protection.",
      },
    },
    {
      "@type": "Question",
      name: "What counts as meaningful human involvement?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Under Article 29 Working Party guidance (WP251rev.01), review must be carried out by someone with the authority and competence to change the decision. Employees rubber-stamping automatically generated outputs do not take a controller outside Article 22.",
      },
    },
    {
      "@type": "Question",
      name: "What must you disclose about the logic of an automated decision?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In Dun & Bradstreet Austria (C-203/22) the CJEU required the procedure and principles actually applied, communicated concisely and intelligibly, including how the outcome would differ had the data been different. Supplying the algorithm itself does not discharge the duty. A trade secret does not permit a blanket refusal.",
      },
    },
  ],
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
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {children}
    </>
  );
}
