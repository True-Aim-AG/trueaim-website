import { Hero, TrustBar, ValueProps, ProductsGrid, CTA, DecisionDossier, SocialProof } from "@/components/sections";
import { ClaimsWorkflowMap } from "@/components/workflow";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ValueProps />
      <ClaimsWorkflowMap variant="compact" />
      <ProductsGrid />
      <DecisionDossier variant="teaser" />
      <SocialProof />
      <CTA />
    </>
  );
}
