import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PAIA Manual",
  description:
    "True Aim AG PAIA manual. Promotion of Access to Information Act compliance documentation for True Aim AG.",
  alternates: {
    canonical: "https://trueaim.ai/paia",
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
