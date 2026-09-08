import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy (Previous Version) | True Aim AG",
  description:
    "Previous version of True Aim AG's privacy policy. The current policy is at trueaim.ai/privacy.",
  alternates: {
    canonical: "https://trueaim.ai/privacy-legacy",
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
