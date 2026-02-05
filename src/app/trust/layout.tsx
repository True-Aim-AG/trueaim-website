import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trust & Compliance",
  description:
    "True Aim's compliance architecture. EU AI Act alignment, GDPR, Swiss FADP compliance. Every decision auditable, every outcome traceable.",
  openGraph: {
    title: "Trust & Compliance | True Aim",
    description:
      "EU AI Act alignment, GDPR, Swiss FADP compliance. Every decision auditable, every outcome traceable.",
    url: "https://trueaim.ai/trust",
  },
  alternates: {
    canonical: "https://trueaim.ai/trust",
  },
};

export default function TrustLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
