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

export default function VehicleWarrantyClaimsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
