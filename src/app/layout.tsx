import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://trueaim.ai"),
  title: {
    default: "TrueAim.ai | Neuro-Symbolic AI for Auditable Claims Decisions",
    template: "%s | TrueAim.ai",
  },
  description:
    "Combine agentic AI with deterministic logic for claims automation. Every decision traceable, compliant with EU AI Act. Swiss precision meets auditable AI.",
  keywords: [
    "AI claims automation",
    "neuro-symbolic AI",
    "insurance claims",
    "EU AI Act compliance",
    "auditable AI",
    "claims decisioning",
  ],
  authors: [{ name: "TrueAim.ai" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://trueaim.ai",
    siteName: "TrueAim.ai",
    title: "TrueAim.ai | Neuro-Symbolic AI for Auditable Claims Decisions",
    description:
      "Combine agentic AI with deterministic logic for claims automation. Every decision traceable, compliant with EU AI Act.",
  },
  twitter: {
    card: "summary_large_image",
    title: "TrueAim.ai | Neuro-Symbolic AI for Auditable Claims Decisions",
    description:
      "Combine agentic AI with deterministic logic for claims automation. Every decision traceable, compliant with EU AI Act.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {/* Skip to main content link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--primary)] focus:text-white focus:rounded-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <Navigation />
        <main id="main-content" className="pt-[73px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
