export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "True Aim AG",
  legalName: "True Aim AG",
  url: "https://trueaim.ai",
  logo: "https://trueaim.ai/android-chrome-512x512.png",
  image: "https://trueaim.ai/android-chrome-512x512.png",
  description:
    "Neuro-symbolic AI for auditable insurance claims decisions. Combine agentic AI with deterministic logic for compliant, explainable claims automation.",
  foundingDate: "2023",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Metallstrasse 9",
    postalCode: "6300",
    addressLocality: "Zug",
    addressCountry: "CH",
  },
  sameAs: ["https://www.linkedin.com/company/true-aim-ag"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    url: "https://trueaim.ai/en/contact/",
  },
  knowsAbout: [
    "Neuro-symbolic AI",
    "Insurance claims automation",
    "EU AI Act compliance",
    "Deterministic decisioning",
    "Claims quality assurance",
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "True Aim",
  url: "https://trueaim.ai",
  description:
    "Neuro-symbolic AI for auditable insurance claims decisions.",
  publisher: {
    "@type": "Organization",
    name: "True Aim AG",
  },
};

export const siteNavigationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Primary navigation",
  itemListElement: [
    { "@type": "SiteNavigationElement", position: 1, name: "Platform", url: "https://trueaim.ai/en/platform/" },
    { "@type": "SiteNavigationElement", position: 2, name: "Invoice Benchmarking", url: "https://trueaim.ai/en/platform/invoice-benchmarking/" },
    { "@type": "SiteNavigationElement", position: 3, name: "Claims Decisioning", url: "https://trueaim.ai/en/platform/claims-decisioning/" },
    { "@type": "SiteNavigationElement", position: 4, name: "Damage Reporting", url: "https://trueaim.ai/en/platform/damage-reporting/" },
    { "@type": "SiteNavigationElement", position: 5, name: "Otus", url: "https://trueaim.ai/en/platform/otus/" },
    { "@type": "SiteNavigationElement", position: 6, name: "Technology", url: "https://trueaim.ai/en/technology/" },
    { "@type": "SiteNavigationElement", position: 7, name: "Case Studies", url: "https://trueaim.ai/en/case-studies/" },
    { "@type": "SiteNavigationElement", position: 8, name: "Trust Center", url: "https://trueaim.ai/en/trust/" },
    { "@type": "SiteNavigationElement", position: 9, name: "Impact Estimator", url: "https://trueaim.ai/en/impact-estimator/" },
    { "@type": "SiteNavigationElement", position: 10, name: "Blog", url: "https://trueaim.ai/en/blog/" },
    { "@type": "SiteNavigationElement", position: 11, name: "About", url: "https://trueaim.ai/en/about/" },
    { "@type": "SiteNavigationElement", position: 12, name: "Contact", url: "https://trueaim.ai/en/contact/" },
  ],
};
