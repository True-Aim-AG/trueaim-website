import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ContextBuilder - Claims Document Pipeline",
  description:
    "Turn messy claim documents into structured, trusted data. AI-powered document ingestion with human review when needed. 97% accuracy, 97% document coverage.",
  openGraph: {
    title: "ContextBuilder - Claims Document Pipeline | TrueAim.ai",
    description:
      "Turn messy claim documents into structured, trusted data. AI-powered document ingestion with human review when needed.",
    url: "https://trueaim.ai/products/contextbuilder",
  },
};

export default function ContextBuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
