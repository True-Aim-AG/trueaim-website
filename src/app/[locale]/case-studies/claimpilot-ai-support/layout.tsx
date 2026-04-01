import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "ClaimPilot: Multilingual B2B Support Scaled with AI | True Aim",
  description:
    "How a Swiss insurance services platform scaled multilingual L1 support 35% with zero headcount increase, achieving 38% full automation and 91% faster first response.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AISupportCaseStudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
