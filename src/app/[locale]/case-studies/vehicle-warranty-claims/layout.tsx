import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { buildCaseStudyMetadata } from "@/lib/case-study-seo";

type MetadataProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  return buildCaseStudyMetadata(locale, "vehicle-warranty-claims");
}

export default async function VehicleWarrantyClaimsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return children;
}
