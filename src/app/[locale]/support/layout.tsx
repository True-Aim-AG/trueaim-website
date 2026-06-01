import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Support | True Aim AG",
  description:
    "How to reach True Aim customer support. Business hours, severity-based response time commitments, and contact channels for sales, privacy, security, and ethics.",
  alternates: {
    canonical: "https://trueaim.ai/support",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
