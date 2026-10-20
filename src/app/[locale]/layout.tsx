import type { Metadata } from "next";
import { Inter_Tight, IBM_Plex_Sans } from "next/font/google";
import "../globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { Analytics } from "@/components/layout/Analytics";
import { FirstTouchCapture } from "@/components/layout/FirstTouchCapture";
import { HubSpotTracking } from "@/components/layout/HubSpotTracking";
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { analyticsConfigured, consentDefaultScript } from "@/lib/consent";

/* Brand type: Inter Tight for titles, IBM Plex Sans for everything else (docs/DESIGN_SYSTEM.md §4). */
const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Site-wide metadata only. Each page sets its own title, description,
// canonical, Open Graph and robots from messages/<locale>/metadata.json
// through pageMetadata() in src/lib/seo/metadata.ts.
export const metadata: Metadata = {
  metadataBase: new URL("https://trueaim.ai"),
  keywords: [
    "AI claims automation",
    "neuro-symbolic AI",
    "insurance claims",
    "EU AI Act compliance",
    "auditable AI",
    "claims decisioning",
  ],
  authors: [{ name: "True Aim" }],
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport = {
  themeColor: "#2C2B2A",
  colorScheme: "dark" as const,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <html lang={locale} data-theme="light" suppressHydrationWarning>
      <head>
        {/* Consent Mode v2 defaults, before anything else: all four signals denied. */}
        {analyticsConfigured && <script dangerouslySetInnerHTML={{ __html: consentDefaultScript }} />}
        {/* No preconnect to Google or HubSpot: a connection before consent is already a request. */}
      </head>
      <body className={`${interTight.variable} ${ibmPlexSans.variable} antialiased`}>
        <Analytics />
        <FirstTouchCapture />
        <HubSpotTracking />
        <NextIntlClientProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-5 focus:py-2.5 focus:rounded-pill focus:bg-ta-blue focus:text-on-brand focus:outline-none"
          >
            {t("skipToContent")}
          </a>
          <Navigation />
          <main id="main-content" className="pt-[76px] relative z-10">{children}</main>
          <Footer />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
