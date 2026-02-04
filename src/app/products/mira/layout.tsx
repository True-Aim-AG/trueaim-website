import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "MIRA - Neuro-Symbolic Decisioning Engine",
  description:
    "Transform complex policy terms into automated, fully-deterministic claim decisions. Every outcome traceable to the legal text. The world's first neuro-symbolic engine for claims.",
  openGraph: {
    title: "MIRA - Neuro-Symbolic Decisioning Engine | TrueAim.ai",
    description:
      "Transform complex policy terms into automated, fully-deterministic claim decisions. Every outcome traceable to the legal text.",
    url: "https://trueaim.ai/products/mira",
  },
  alternates: {
    canonical: "https://trueaim.ai/products/mira",
  },
};

const miraJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MIRA",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Cloud",
  description:
    "The world's first neuro-symbolic engine for insurance claims decisioning. Transforms policy terms and conditions into automated, fully-deterministic claim decisions.",
  url: "https://trueaim.ai/products/mira",
  author: {
    "@type": "Organization",
    name: "TrueAim AG",
    url: "https://trueaim.ai",
  },
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/OnlineOnly",
    category: "Enterprise Software",
  },
  featureList: [
    "Neuro-symbolic decisioning",
    "Deterministic claim outcomes",
    "Full auditability to policy clauses",
    "EU AI Act compliant architecture",
    "Up to 89% faster claim determinations",
    "Up to 68% reduction in handling costs",
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
      name: "MIRA",
      item: "https://trueaim.ai/products/mira",
    },
  ],
};

export default function MiraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={miraJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {children}
    </>
  );
}
