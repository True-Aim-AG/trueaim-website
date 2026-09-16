import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { JsonLd } from "@/components/seo/JsonLd";

function getLocaleUrl(locale: string, path: string): string {
  const prefix = locale === "en" ? "" : `/${locale}`;
  return `https://trueaim.ai${prefix}${path}`;
}

type MetadataProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.mira" });

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = getLocaleUrl(loc, "/products/mira");
  }

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: getLocaleUrl(locale, "/products/mira"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
    alternates: {
      canonical: getLocaleUrl(locale, "/products/mira"),
      languages,
    },
  };
}

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
    name: "True Aim AG",
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

export default async function MiraLayout({
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
      <JsonLd data={{ ...miraJsonLd, inLanguage: locale }} />
      <JsonLd data={breadcrumbJsonLd} />
      {children}
    </>
  );
}
