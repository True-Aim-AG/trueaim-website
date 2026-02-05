import { Hero, TrustBar, ProductsGrid, CTA, DecisionDossier, SocialProof } from "@/components/sections";

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
