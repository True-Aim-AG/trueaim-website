import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { englishOnlyStaticParams } from "@/i18n/page-locales";

// English only until the translation lands; see src/i18n/page-locales.ts.
export const generateStaticParams = englishOnlyStaticParams;

export const metadata: Metadata = {
  title: "Privacy Policy (Previous Version) | True Aim AG",
  description:
    "Previous version of True Aim AG's privacy policy. The current policy is at trueaim.ai/privacy.",
  alternates: {
    canonical: "https://trueaim.ai/en/privacy-legacy/",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default async function PrivacyLegacyLayout({
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
