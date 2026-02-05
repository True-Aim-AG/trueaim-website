import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "ClaimEval - Claims Quality Assurance",
  description:
    "Scale QA beyond sampling. Run consistent inspections across your entire claims portfolio. Surface exceptions, prioritize human effort with intelligent risk scoring.",
  openGraph: {
    title: "ClaimEval - Claims Quality Assurance | True Aim",
    description:
      "Scale QA beyond sampling. Run consistent inspections across your entire claims portfolio. Surface exceptions, prioritize human effort.",
    url: "https://trueaim.ai/products/claimeval",
  },
  alternates: {
    canonical: "https://trueaim.ai/products/claimeval",
  },
};

const claimEvalJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ClaimEval",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Cloud",
  description:
    "Claims quality assurance platform that scales QA beyond sampling. Runs consistent inspections across entire claims portfolios with intelligent risk scoring.",
  url: "https://trueaim.ai/products/claimeval",
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
    "Portfolio-wide QA inspections",
    "Consistent evaluation criteria",
    "Intelligent risk scoring",
    "Exception surfacing",
    "Full audit trail",
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
      name: "ClaimEval",
      item: "https://trueaim.ai/products/claimeval",
    },
  ],
};

export default function ClaimEvalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={claimEvalJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {children}
    </>
  );
}
