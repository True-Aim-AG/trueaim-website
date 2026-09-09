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
  const t = await getTranslations({ locale, namespace: "metadata.claimEval" });

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = getLocaleUrl(loc, "/products/claimeval");
  }

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: getLocaleUrl(locale, "/products/claimeval"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
    alternates: {
      canonical: getLocaleUrl(locale, "/products/claimeval"),
      languages,
    },
  };
}

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

export default async function ClaimEvalLayout({
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
      <JsonLd data={{ ...claimEvalJsonLd, inLanguage: locale }} />
      <JsonLd data={breadcrumbJsonLd} />
      {children}
    </>
  );
}
