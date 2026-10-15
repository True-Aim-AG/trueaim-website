import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { englishOnlyStaticParams } from "@/i18n/page-locales";

// English only until the translation lands; see src/i18n/page-locales.ts.
export const generateStaticParams = englishOnlyStaticParams;

export const metadata: Metadata = {
  title: "Security | True Aim AG",
  description:
    "True Aim AG security program: compliance frameworks, data residency, encryption, access control, monitoring, vulnerability management, and responsible disclosure.",
  alternates: {
    canonical: "https://trueaim.ai/en/security/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function SecurityLayout({
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
