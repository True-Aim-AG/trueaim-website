import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog | True Aim AG",
  description:
    "Public release history of the True Aim Platform. Features, fixes, and security improvements by release.",
  alternates: {
    canonical: "https://trueaim.ai/en/changelog/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function ChangelogLayout({
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
