import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageSeo } from "@/components/seo/PageSeo";
import { pageMetadata } from "@/lib/seo/metadata";
import type { ArticleData } from "@/lib/seo/schema";
import { newsItems } from "../items";

const PATH = "/news/true-aim-wins-insurathon-2026";
const item = newsItems.find((entry) => entry.slug === PATH.split("/").pop())!;
const article: ArticleData = { datePublished: item.datePublished, section: "News" };

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, PATH, { publishedTime: article.datePublished });
}

export default async function NewsItemLayout({ children, params }: Props & { children: React.ReactNode }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <PageSeo locale={locale} path={PATH} template="news" article={article} />
      {children}
    </>
  );
}
