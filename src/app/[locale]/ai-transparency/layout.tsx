import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Transparency & Oversight",
  description:
    "How True Aim AG approaches the design and use of artificial intelligence within its products, including oversight mechanisms and data handling principles.",
  alternates: {
    canonical: "https://trueaim.ai/ai-transparency",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AITransparencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
