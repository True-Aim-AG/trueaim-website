import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { GoogleAnalyticsWrapper } from "@/components/layout/GoogleAnalytics";
import { AuroraBackground } from "@/components/layout/AuroraBackground";
import { ThemeProvider } from "@/components/theme";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/components/seo/JsonLd";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://trueaim.ai"),
  title: {
    default: "True Aim | Neuro-Symbolic AI for Auditable Claims Decisions",
    template: "%s | True Aim",
  },
  description:
    "Combine agentic AI with deterministic logic for claims automation. Every decision traceable, aligned with EU AI Act requirements. Swiss precision meets auditable AI.",
  keywords: [
    "AI claims automation",
    "neuro-symbolic AI",
    "insurance claims",
    "EU AI Act compliance",
    "auditable AI",
    "claims decisioning",
  ],
  authors: [{ name: "True Aim" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://trueaim.ai",
    siteName: "True Aim",
    title: "True Aim | Neuro-Symbolic AI for Auditable Claims Decisions",
    description:
      "Combine agentic AI with deterministic logic for claims automation. Every decision traceable, aligned with EU AI Act requirements.",
  },
  twitter: {
    card: "summary_large_image",
    title: "True Aim | Neuro-Symbolic AI for Auditable Claims Decisions",
    description:
      "Combine agentic AI with deterministic logic for claims automation. Every decision traceable, aligned with EU AI Act requirements.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://trueaim.ai",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (!theme) {
                    theme = (window.innerWidth < 768 || window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
                  }
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} antialiased`}>
        <GoogleAnalyticsWrapper />
        <ThemeProvider>
          {/* Skip to main content link for keyboard users */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--primary)] focus:text-white focus:rounded-lg focus:outline-none"
          >
            Skip to main content
          </a>
          <AuroraBackground />
          <Navigation />
          <main id="main-content" className="pt-[73px] relative z-10">{children}</main>
          <Footer />
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
