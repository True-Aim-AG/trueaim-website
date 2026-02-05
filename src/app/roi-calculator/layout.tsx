import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ROI Calculator",
  description:
    "Calculate your potential ROI with True Aim's AI-powered claims automation. Estimate savings based on real pilot data - no commitment required.",
  openGraph: {
    title: "ROI Calculator | True Aim",
    description:
      "Calculate your potential ROI with AI-powered claims automation. Estimate savings based on real pilot data.",
    url: "https://trueaim.ai/roi-calculator",
  },
  alternates: {
    canonical: "https://trueaim.ai/roi-calculator",
  },
};

export default function ROICalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
