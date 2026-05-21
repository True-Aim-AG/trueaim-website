import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ClaimPilot Product Overview | True Aim AG",
  description:
    "ClaimPilot by True Aim AG: AI-assisted claims processing for insurers. Capabilities, target users, data residency, and how it fits into the claims workflow.",
  alternates: {
    canonical: "https://trueaim.ai/product",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
