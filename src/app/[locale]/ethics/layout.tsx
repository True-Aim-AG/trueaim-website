import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ethics & Confidential Reporting | True Aim AG",
  description:
    "Confidential channel to report ethical concerns, misconduct, or security and privacy issues to True Aim AG. Anonymous reporting and non-retaliation commitment.",
  alternates: {
    canonical: "https://trueaim.ai/en/ethics/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function EthicsLayout({
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
