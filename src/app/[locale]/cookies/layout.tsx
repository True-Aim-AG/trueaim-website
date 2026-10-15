import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { englishOnlyStaticParams } from "@/i18n/page-locales";

// English only until the translation lands; see src/i18n/page-locales.ts.
export const generateStaticParams = englishOnlyStaticParams;

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "True Aim AG cookie policy. Learn about the cookies we use, their purposes, and how to manage your cookie preferences.",
  alternates: {
    canonical: "https://trueaim.ai/en/cookies/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function CookiesLayout({
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
