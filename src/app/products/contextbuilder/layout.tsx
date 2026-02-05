import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "ContextBuilder - Claims Document Pipeline",
  description:
    "Turn messy claim documents into structured, trusted data. AI-powered document ingestion with human review when needed. 97% accuracy, 97% document coverage.",
  openGraph: {
    title: "ContextBuilder - Claims Document Pipeline | True Aim",
    description:
      "Turn messy claim documents into structured, trusted data. AI-powered document ingestion with human review when needed.",
    url: "https://trueaim.ai/products/contextbuilder",
  },
  alternates: {
    canonical: "https://trueaim.ai/products/contextbuilder",
  },
};

const contextBuilderJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ContextBuilder",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Cloud",
  description:
    "Claims document pipeline that transforms unstructured claim documents into structured, trusted data with AI-powered ingestion and human review when needed.",
  url: "https://trueaim.ai/products/contextbuilder",
  author: {
    "@type": "Organization",
    name: "True Aim AG",
    url: "https://trueaim.ai",
  },
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/OnlineOnly",
    category: "Enterprise Software",
  },
  featureList: [
    "AI-powered document ingestion",
    "Automated classification and structuring",
    "Human-in-the-loop quality gates",
    "97% document processing accuracy",
    "97% document coverage",
    "Multi-format support",
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://trueaim.ai",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Products",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "ContextBuilder",
      item: "https://trueaim.ai/products/contextbuilder",
    },
  ],
};

export default function ContextBuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={contextBuilderJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {children}
    </>
  );
}
