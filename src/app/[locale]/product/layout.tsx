import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The True Aim Platform — Product Overview | True Aim AG",
  description:
    "The True Aim Platform: AI-assisted claims and case processing for insurers, brokers, and the broader insurance value chain. Capabilities, users, data residency, and workflow fit.",
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
