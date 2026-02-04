import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "TrueAim AG privacy policy. Learn how we collect, process, and protect your personal data in compliance with GDPR and Swiss FADP.",
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
