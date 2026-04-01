import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "ClaimPilot: Auditability & Regulatory Alignment for AI Claims | True Aim",
  description:
    "How a European pet insurer achieved full decision reconstruction, regulator-ready decisioning and compliance embedded into every pipeline run.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ComplianceAuditabilityCaseStudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
