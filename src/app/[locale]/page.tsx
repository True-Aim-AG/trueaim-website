import { setRequestLocale } from "next-intl/server";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { PipelineRow } from "@/components/sections/PipelineRow";
import { TrustBar } from "@/components/sections/TrustBar";
import { ProductsGrid } from "@/components/sections/ProductsGrid";
import { ProcessFlow } from "@/components/sections/ProcessFlow";
import { ValueProps } from "@/components/sections/ValueProps";
import { CTA } from "@/components/sections/CTA";
import type { Metadata } from "next";
import { PageSeo } from "@/components/seo/PageSeo";
import { pageMetadata } from "@/lib/seo/metadata";

const DossierShowcase = dynamic(
  () => import("@/components/sections/DossierShowcase").then((m) => m.DossierShowcase)
);

const SocialProof = dynamic(
  () => import("@/components/sections/SocialProof").then((m) => m.SocialProof)
);

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/");
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <PageSeo locale={locale} path="/" template="home" />
      <Hero />
      <PipelineRow />
      <TrustBar />
      <ProcessFlow />
      <ProductsGrid />
      <DossierShowcase />
      <ValueProps />
      <SocialProof />
      <CTA />
    </>
  );
}
