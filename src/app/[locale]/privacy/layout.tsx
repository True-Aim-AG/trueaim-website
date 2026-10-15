import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { englishOnlyStaticParams } from "@/i18n/page-locales";

// English only until the translation lands; see src/i18n/page-locales.ts.
export const generateStaticParams = englishOnlyStaticParams;

export const metadata: Metadata = {
  title: "Privacy Policy | True Aim AG",
  description:
    "How True Aim AG collects, uses, and protects personal data in compliance with Swiss FADP and GDPR. Includes processor roles, sub-processors, retention, and rights.",
  alternates: {
    canonical: "https://trueaim.ai/en/privacy/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function PrivacyLayout({
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
