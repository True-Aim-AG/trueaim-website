import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { englishOnlyStaticParams } from "@/i18n/page-locales";

// English only until the translation lands; see src/i18n/page-locales.ts.
export const generateStaticParams = englishOnlyStaticParams;

export const metadata: Metadata = {
  title: "PAIA Manual",
  description:
    "True Aim AG PAIA manual. Promotion of Access to Information Act compliance documentation for True Aim AG.",
  alternates: {
    canonical: "https://trueaim.ai/en/paia/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function PAIALayout({
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
