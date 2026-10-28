import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { FaqItem } from "@/components/content";
import { PageSeo } from "@/components/seo/PageSeo";
import { pageMetadata } from "@/lib/seo/metadata";
import { englishOnlyStaticParams } from "@/i18n/page-locales";

// English only until the translation lands; see src/i18n/page-locales.ts.
export const generateStaticParams = englishOnlyStaticParams;

const PATH = "/technology";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, PATH);
}

export default async function TechnologyLayout({ children, params }: Props & { children: React.ReactNode }) {
  const { locale } = await params;
  setRequestLocale(locale);
  // The same FAQ the page renders feeds FAQPage, as on the Trust page.
  const t = await getTranslations("technology");
  const faqs = t.raw("faq.items") as FaqItem[];
  return (
    <>
      <PageSeo locale={locale} path={PATH} template="technology" faqs={faqs} />
      {children}
    </>
  );
}
