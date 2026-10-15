import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { englishOnlyStaticParams } from "@/i18n/page-locales";

// English only until the translation lands; see src/i18n/page-locales.ts.
export const generateStaticParams = englishOnlyStaticParams;

export const metadata: Metadata = {
  title: "AI Transparency & Oversight",
  description:
    "How True Aim AG approaches the design and use of artificial intelligence within its products, including oversight mechanisms and data handling principles.",
  alternates: {
    canonical: "https://trueaim.ai/en/ai-transparency/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function AITransparencyLayout({
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
