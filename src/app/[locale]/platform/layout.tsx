import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { englishOnlyStaticParams } from "@/i18n/page-locales";

// English only until the translation lands; see src/i18n/page-locales.ts.
export const generateStaticParams = englishOnlyStaticParams;

export const metadata: Metadata = {
  title: "The True Aim Platform — Product Overview | True Aim AG",
  description:
    "The True Aim Platform: AI-assisted claims and case processing for insurers, brokers, and the broader insurance value chain. Capabilities, users, data residency, and workflow fit.",
  alternates: {
    canonical: "https://trueaim.ai/en/platform/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function ProductLayout({
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
