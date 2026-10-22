import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo/metadata";
import { englishOnlyStaticParams } from "@/i18n/page-locales";

// English only until the translation lands; see src/i18n/page-locales.ts.
export const generateStaticParams = englishOnlyStaticParams;

const PATH = "/trust";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, PATH);
}

// The JSON-LD graph and breadcrumb live in page.tsx, where the FAQ data is.
export default async function TrustLayout({ children, params }: Props & { children: React.ReactNode }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return children;
}
