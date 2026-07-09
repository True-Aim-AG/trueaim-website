import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { defaultOgImages } from "@/lib/og-image";
import { blogPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on auditable AI, claims automation, and the future of insurance technology from True Aim.",
  openGraph: {
    title: "Blog | True Aim",
    description:
      "Insights on auditable AI, claims automation, and the future of insurance technology.",
    url: "https://trueaim.ai/blog",
    type: "website",
    images: defaultOgImages,
  },
  alternates: {
    canonical: "https://trueaim.ai/blog",
    types: {
      "application/rss+xml": "https://trueaim.ai/feed.xml",
    },
  },
};

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": "https://trueaim.ai/blog",
  name: "True Aim Blog",
  url: "https://trueaim.ai/blog",
  description:
    "Insights on auditable AI, claims automation, and the future of insurance technology.",
  publisher: {
    "@type": "Organization",
    name: "TrueAim AG",
    url: "https://trueaim.ai",
  },
  blogPost: blogPosts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    url: `https://trueaim.ai/blog/${post.slug}`,
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
      item: "https://trueaim.ai",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: "https://trueaim.ai/blog",
    },
  ],
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={blogJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {children}
    </>
  );
}
