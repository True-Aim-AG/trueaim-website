import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ClaimPilot: AI-Assisted Motor Warranty Claims | True Aim",
  description:
    "How a European motor warranty insurer reduced claim handling from 55 minutes to under 10 with 52% straight-through processing and 97%+ verdict accuracy.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ClaimPilotCaseStudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
