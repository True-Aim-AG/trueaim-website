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
