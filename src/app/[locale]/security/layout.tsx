import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security | True Aim AG",
  description:
    "True Aim AG security program: compliance frameworks, data residency, encryption, access control, monitoring, vulnerability management, and responsible disclosure.",
  alternates: {
    canonical: "https://trueaim.ai/security",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
