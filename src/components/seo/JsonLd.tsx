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
  name: "TrueAim AG",
  legalName: "TrueAim AG",
  url: "https://trueaim.ai",
  logo: "https://trueaim.ai/logo.png",
  description:
    "Neuro-symbolic AI for auditable insurance claims decisions. Combine agentic AI with deterministic logic for compliant, explainable claims automation.",
  foundingDate: "2023",
  address: {
    "@type": "PostalAddress",
    addressCountry: "CH",
    addressLocality: "Zurich",
  },
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    url: "https://trueaim.ai/contact",
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
    name: "TrueAim AG",
  },
};

export const siteNavigationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Primary navigation",
  itemListElement: [
    { "@type": "SiteNavigationElement", position: 1, name: "Products", url: "https://trueaim.ai/products/mira" },
    { "@type": "SiteNavigationElement", position: 2, name: "MIRA", url: "https://trueaim.ai/products/mira" },
    { "@type": "SiteNavigationElement", position: 3, name: "ContextBuilder", url: "https://trueaim.ai/products/contextbuilder" },
    { "@type": "SiteNavigationElement", position: 4, name: "ClaimEval", url: "https://trueaim.ai/products/claimeval" },
    { "@type": "SiteNavigationElement", position: 5, name: "Technology", url: "https://trueaim.ai/technology" },
    { "@type": "SiteNavigationElement", position: 6, name: "Case Studies", url: "https://trueaim.ai/case-studies" },
    { "@type": "SiteNavigationElement", position: 7, name: "Trust Center", url: "https://trueaim.ai/trust" },
    { "@type": "SiteNavigationElement", position: 8, name: "Impact Estimator", url: "https://trueaim.ai/impact-estimator" },
    { "@type": "SiteNavigationElement", position: 9, name: "Blog", url: "https://trueaim.ai/blog" },
    { "@type": "SiteNavigationElement", position: 10, name: "Company", url: "https://trueaim.ai/company" },
    { "@type": "SiteNavigationElement", position: 11, name: "Contact", url: "https://trueaim.ai/contact" },
  ],
};
