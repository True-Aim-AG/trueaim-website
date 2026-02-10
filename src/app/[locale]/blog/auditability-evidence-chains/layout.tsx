import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auditability in Claims AI: Building Evidence Chains That Auditors Actually Accept",
  description:
    "Learn how to build AI systems with complete audit trails that satisfy FINMA and EU AI Act requirements. Practical architecture for field-to-source provenance, decision audit trails, and human override capture.",
  keywords: [
    "AI auditability",
    "claims automation",
    "FINMA compliance",
    "EU AI Act",
    "evidence chains",
    "insurance AI",
    "regulatory compliance",
    "explainable AI",
  ],
  openGraph: {
    title: "Auditability in Claims AI: Building Evidence Chains That Auditors Actually Accept",
    description:
      "Everyone says their AI is explainable. Few can prove it to an auditor. Here's the architecture that makes it possible.",
    url: "https://trueaim.ai/blog/auditability-evidence-chains",
    type: "article",
    publishedTime: "2025-02-01T00:00:00.000Z",
    authors: ["True Aim"],
    tags: ["AI", "Compliance", "Insurance", "Auditability", "FINMA", "EU AI Act"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Auditability in Claims AI: Building Evidence Chains",
    description:
      "Learn how to build AI systems with complete audit trails that satisfy regulators.",
  },
  alternates: {
    canonical: "https://trueaim.ai/blog/auditability-evidence-chains",
  },
};

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
