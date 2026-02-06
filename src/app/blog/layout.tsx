import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on auditable AI, claims automation, and the future of insurance technology from True Aim.",
  openGraph: {
    title: "Blog | True Aim",
    description:
      "Insights on auditable AI, claims automation, and the future of insurance technology.",
    url: "https://trueaim.ai/blog",
  },
  alternates: {
    canonical: "https://trueaim.ai/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
