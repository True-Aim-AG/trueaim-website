import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { ScrollVideoAnimation } from "@/components/sections/ScrollVideoAnimation";
import { TrustBar } from "@/components/sections/TrustBar";
import { ProductsGrid } from "@/components/sections/ProductsGrid";
import { ProcessFlow } from "@/components/sections/ProcessFlow";
import { ValueProps } from "@/components/sections/ValueProps";
import { CTA } from "@/components/sections/CTA";

const DossierShowcase = dynamic(
  () => import("@/components/sections/DossierShowcase").then((m) => m.DossierShowcase)
);

const SocialProof = dynamic(
  () => import("@/components/sections/SocialProof").then((m) => m.SocialProof)
);

export default function Home() {
  return (
    <>
      <Hero />
      <ScrollVideoAnimation />
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
