import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | True Aim AG",
  description:
    "How True Aim AG collects, uses, and protects personal data in compliance with Swiss FADP and GDPR. Includes processor roles, sub-processors, retention, and rights.",
  alternates: {
    canonical: "https://trueaim.ai/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
