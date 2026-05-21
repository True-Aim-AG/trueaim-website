import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ethics & Confidential Reporting | True Aim AG",
  description:
    "Confidential channel to report ethical concerns, misconduct, or security and privacy issues to True Aim AG. Anonymous reporting and non-retaliation commitment.",
  alternates: {
    canonical: "https://trueaim.ai/ethics",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function EthicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
