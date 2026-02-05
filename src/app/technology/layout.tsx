import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technology - Neuro-Symbolic AI Architecture",
  description:
    "Not probabilistic. Not a black box. Our hybrid approach combines agentic AI execution with deterministic decision-making, purpose-built for regulated industries and EU AI Act compliance.",
  openGraph: {
    title: "Technology - Neuro-Symbolic AI Architecture | True Aim",
    description:
      "Our hybrid approach combines agentic AI execution with deterministic decision-making, purpose-built for regulated industries.",
    url: "https://trueaim.ai/technology",
  },
  alternates: {
    canonical: "https://trueaim.ai/technology",
  },
};

export default function TechnologyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
