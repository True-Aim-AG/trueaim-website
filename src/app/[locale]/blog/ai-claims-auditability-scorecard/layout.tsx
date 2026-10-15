import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageSeo } from "@/components/seo/PageSeo";
import { pageMetadata } from "@/lib/seo/metadata";
import { article, list } from "./article";
import { faqs } from "./faqs";

const PATH = "/blog/ai-claims-auditability-scorecard";

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
      <PageSeo locale={locale} path={PATH} template="blogPost" article={article} faqs={faqs} lists={[list]} />
      {children}
    </>
  );
}
