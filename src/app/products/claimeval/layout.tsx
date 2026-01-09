import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ClaimEval - Claims Quality Assurance",
  description:
    "Scale QA beyond sampling. Run consistent inspections across your entire claims portfolio. Surface exceptions, prioritize human effort with intelligent risk scoring.",
  openGraph: {
    title: "ClaimEval - Claims Quality Assurance | TrueAim.ai",
    description:
      "Scale QA beyond sampling. Run consistent inspections across your entire claims portfolio. Surface exceptions, prioritize human effort.",
    url: "https://trueaim.ai/products/claimeval",
  },
};

export default function ClaimEvalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
