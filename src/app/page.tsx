import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ProductsGrid } from "@/components/sections/ProductsGrid";
import { CTA } from "@/components/sections/CTA";

const DecisionDossier = dynamic(
  () => import("@/components/sections/DecisionDossier").then((m) => m.DecisionDossier)
);

const SocialProof = dynamic(
  () => import("@/components/sections/SocialProof").then((m) => m.SocialProof)
);

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ProductsGrid />
      <DecisionDossier variant="teaser" />
      <SocialProof />
      <CTA />
    </>
  );
}
