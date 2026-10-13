import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "True Aim AG terms of service. Read the terms and conditions governing use of our website and AI-powered claims decisioning services.",
  alternates: {
    canonical: "https://trueaim.ai/en/terms/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function TermsLayout({
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
