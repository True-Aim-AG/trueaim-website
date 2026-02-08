import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Build vs Buy: What to Demand from IDP Vendors",
  description:
    "A practical evaluation framework for insurance teams evaluating claims automation solutions. Learn when to build, when to buy, and how to evaluate vendors objectively.",
  keywords: [
    "IDP vendors",
    "claims automation",
    "build vs buy",
    "vendor evaluation",
    "insurance AI",
    "document processing",
    "claims AI",
    "vendor selection",
  ],
  openGraph: {
    title: "Build vs Buy: What to Demand from IDP Vendors",
    description:
      "A practical evaluation framework for insurance teams evaluating claims automation solutions.",
    url: "https://trueaim.ai/blog/build-vs-buy-idp-vendors",
    type: "article",
    publishedTime: "2025-02-01T00:00:00.000Z",
    authors: ["True Aim"],
    tags: ["AI", "Vendor Evaluation", "Insurance", "Claims Automation", "IDP"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Build vs Buy: What to Demand from IDP Vendors",
    description:
      "A practical evaluation framework for insurance teams evaluating claims automation solutions.",
  },
  alternates: {
    canonical: "https://trueaim.ai/blog/build-vs-buy-idp-vendors",
  },
};

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
