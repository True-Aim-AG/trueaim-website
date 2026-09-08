import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { defaultOgImages, DEFAULT_OG_IMAGE } from "@/lib/og-image";

function getLocaleUrl(locale: string, path: string): string {
  const prefix = locale === "en" ? "" : `/${locale}`;
  return `https://trueaim.ai${prefix}${path}`;
}

type MetadataProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.impact" });

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = getLocaleUrl(loc, "/impact-estimator");
  }

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: getLocaleUrl(locale, "/impact-estimator"),
      images: defaultOgImages,
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
      canonical: getLocaleUrl(locale, "/impact-estimator"),
      languages,
    },
  };
}

export default async function ImpactEstimatorLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return children;
}
