import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageSeo } from "@/components/seo/PageSeo";
import { pageMetadata } from "@/lib/seo/metadata";
import { blogPosts } from "@/lib/blog-posts";
import type { ArticleData } from "@/lib/seo/schema";

const PATH = "/blog/build-vs-buy-idp-vendors";
const post = blogPosts.find((entry) => entry.slug === PATH.split("/").pop())!;
const article: ArticleData = { datePublished: post.publishedIso, section: post.category, keywords: post.tags };

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, PATH, { publishedTime: article.datePublished });
}

export default async function BlogPostLayout({ children, params }: Props & { children: React.ReactNode }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <PageSeo locale={locale} path={PATH} template="blogPost" article={article} />
      {children}
    </>
  );
}
