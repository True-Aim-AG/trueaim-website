import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "ClaimPilot: Multilingual B2B Support Scaled 35% with 40% Smaller Team | True Aim",
  description:
    "How a Swiss insurance services platform scaled multilingual L1 support 35% while reducing team size by 40%, achieving 43% full automation, 93% faster first response, and 90% AI draft acceptance.",
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
