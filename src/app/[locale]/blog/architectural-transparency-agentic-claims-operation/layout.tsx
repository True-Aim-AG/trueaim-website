import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageSeo } from "@/components/seo/PageSeo";
import { pageMetadata } from "@/lib/seo/metadata";
import { article } from "./article";
import { faqs } from "./faqs";
import { faqs as faqsDe } from "./faqs.de";
import { faqs as faqsFr } from "./faqs.fr";
import { faqs as faqsIt } from "./faqs.it";

const PATH = "/blog/architectural-transparency-agentic-claims-operation";
const FAQS: Record<string, typeof faqs> = { en: faqs, de: faqsDe, fr: faqsFr, it: faqsIt };

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, PATH, { publishedTime: article.datePublished, authors: article.author ? [article.author.name] : undefined });
}

export default async function BlogPostLayout({ children, params }: Props & { children: React.ReactNode }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <PageSeo locale={locale} path={PATH} template="blogPost" article={article} faqs={FAQS[locale] ?? faqs} />
      {children}
    </>
  );
}
