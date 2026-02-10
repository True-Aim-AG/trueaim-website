import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
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
  const t = await getTranslations({ locale, namespace: "metadata.contextBuilder" });

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = getLocaleUrl(loc, "/products/contextbuilder");
  }

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: getLocaleUrl(locale, "/products/contextbuilder"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
    alternates: {
      canonical: getLocaleUrl(locale, "/products/contextbuilder"),
      languages,
    },
  };
}

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

export default async function ContextBuilderLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <>
      <JsonLd data={{ ...contextBuilderJsonLd, inLanguage: locale }} />
      <JsonLd data={breadcrumbJsonLd} />
      {children}
    </>
  );
}
