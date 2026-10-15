import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { englishOnlyStaticParams } from "@/i18n/page-locales";
import { PageSeo } from "@/components/seo/PageSeo";
import { pageMetadata } from "@/lib/seo/metadata";

// English only until the translation lands; see src/i18n/page-locales.ts.
export const generateStaticParams = englishOnlyStaticParams;

const PATH = "/privacy-legacy";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, PATH);
}

export default async function PrivacyLegacyLayout({ children, params }: Props & { children: React.ReactNode }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <PageSeo locale={locale} path={PATH} template="page" />
      {children}
    </>
  );
}
