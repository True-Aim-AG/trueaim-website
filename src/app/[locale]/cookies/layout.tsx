import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "True Aim AG cookie policy. Learn about the cookies we use, their purposes, and how to manage your cookie preferences.",
  alternates: {
    canonical: "https://trueaim.ai/cookies",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
