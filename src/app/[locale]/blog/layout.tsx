import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { defaultOgImages } from "@/lib/og-image";
import { blogPosts } from "@/lib/blog-posts";
import { englishOnlyStaticParams } from "@/i18n/page-locales";

// English only until the translation lands; see src/i18n/page-locales.ts.
export const generateStaticParams = englishOnlyStaticParams;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on auditable AI, claims automation, and the future of insurance technology from True Aim.",
  openGraph: {
    title: "Blog | True Aim",
    description:
      "Insights on auditable AI, claims automation, and the future of insurance technology.",
    url: "https://trueaim.ai/en/blog/",
    type: "website",
    images: defaultOgImages,
  },
  alternates: {
    canonical: "https://trueaim.ai/en/blog/",
    types: {
      "application/rss+xml": "https://trueaim.ai/feed.xml",
    },
  },
};

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": "https://trueaim.ai/en/blog/",
  name: "True Aim Blog",
  url: "https://trueaim.ai/en/blog/",
  description:
    "Insights on auditable AI, claims automation, and the future of insurance technology.",
  publisher: {
    "@type": "Organization",
    name: "True Aim AG",
    url: "https://trueaim.ai",
  },
  blogPost: blogPosts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    url: `https://trueaim.ai/en/blog/${post.slug}/`,
    datePublished: post.publishedIso,
    description: post.excerpt,
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://trueaim.ai/en/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: "https://trueaim.ai/en/blog/",
    },
  ],
};

export default async function BlogLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <JsonLd data={blogJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {children}
    </>
  );
}
