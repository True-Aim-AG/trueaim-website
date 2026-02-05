import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "True Aim AG terms of service. Read the terms and conditions governing use of our website and AI-powered claims decisioning services.",
  alternates: {
    canonical: "https://trueaim.ai/terms",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
