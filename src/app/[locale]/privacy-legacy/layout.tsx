import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy (Previous Version) | True Aim AG",
  description:
    "Previous version of True Aim AG's privacy policy. The current policy is at trueaim.ai/privacy.",
  alternates: {
    canonical: "https://trueaim.ai/privacy-legacy",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyLegacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
