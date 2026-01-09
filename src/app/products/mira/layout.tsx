import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MIRA - Neuro-Symbolic Decisioning Engine",
  description:
    "Transform complex policy terms into automated, fully-deterministic claim decisions. Every outcome traceable to the legal text. The world's first neuro-symbolic engine for claims.",
  openGraph: {
    title: "MIRA - Neuro-Symbolic Decisioning Engine | TrueAim.ai",
    description:
      "Transform complex policy terms into automated, fully-deterministic claim decisions. Every outcome traceable to the legal text.",
    url: "https://trueaim.ai/products/mira",
  },
};

export default function MiraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
