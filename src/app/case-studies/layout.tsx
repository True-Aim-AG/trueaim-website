import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "See how TrueAim's neuro-symbolic AI transforms claims processing. Real-world case studies from insurance companies using MIRA, ContextBuilder, and ClaimEval.",
  openGraph: {
    title: "Case Studies | TrueAim.ai",
    description:
      "Real-world case studies from insurance companies using TrueAim's neuro-symbolic AI for claims automation.",
    url: "https://trueaim.ai/case-studies",
  },
  alternates: {
    canonical: "https://trueaim.ai/case-studies",
  },
};

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
