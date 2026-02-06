import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impact Estimator",
  description:
    "Explore potential value with True Aim's AI-powered claims automation. Estimate impact based on real pilot data - no commitment required.",
  openGraph: {
    title: "Impact Estimator | True Aim",
    description:
      "Explore potential value with AI-powered claims automation. Estimate impact based on real pilot data.",
    url: "https://trueaim.ai/impact-estimator",
  },
  alternates: {
    canonical: "https://trueaim.ai/impact-estimator",
  },
};

export default function ImpactEstimatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
