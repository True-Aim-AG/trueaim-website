import type { Metadata } from "next";
import { getAllCaseStudySlugs } from "@/data/case-studies";
import { buildCaseStudyMetadata } from "@/lib/case-study-seo";

// Only real case studies are valid slugs; anything else 404s instead of
// rendering a soft-404 (HTTP 200) that Google could index.
export const dynamicParams = false;

export function generateStaticParams() {
  // vehicle-warranty-claims has its own dedicated route folder, so exclude it
  // here to avoid a duplicate static generation of the same path.
  return getAllCaseStudySlugs()
    .filter((slug) => slug !== "vehicle-warranty-claims")
    .map((slug) => ({ slug }));
}

type MetadataProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale, slug } = await params;
  return buildCaseStudyMetadata(locale, slug);
}

export default function CaseStudySlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
