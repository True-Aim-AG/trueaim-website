import type { Metadata } from "next";
import { Inter_Tight, IBM_Plex_Sans } from "next/font/google";
import "../globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { GoogleAnalyticsWrapper } from "@/components/layout/GoogleAnalytics";
import { HubSpotTracking } from "@/components/layout/HubSpotTracking";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { JsonLd, organizationJsonLd, websiteJsonLd, siteNavigationJsonLd } from "@/components/seo/JsonLd";
import { defaultOgImages } from "@/lib/og-image";
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

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

function getLocaleUrl(locale: string, path: string): string {
  const prefix = locale === "en" ? "" : `/${locale}`;
  return `https://trueaim.ai${prefix}${path}`;
}

type MetadataProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.root" });

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = getLocaleUrl(loc, "");
  }

  return {
    metadataBase: new URL("https://trueaim.ai"),
    title: {
      default: t("titleDefault"),
      template: t("titleTemplate"),
    },
    description: t("description"),
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
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : locale,
      url: getLocaleUrl(locale, ""),
      siteName: "True Aim",
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: defaultOgImages,
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: defaultOgImages.map((i) => i.url),
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: getLocaleUrl(locale, ""),
      languages,
    },
  };
}

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
    <html lang={locale} data-theme="dark" suppressHydrationWarning>
      <head>
        <JsonLd data={{ ...organizationJsonLd, inLanguage: locale }} />
        <JsonLd data={{ ...websiteJsonLd, inLanguage: locale }} />
        <JsonLd data={siteNavigationJsonLd} />
        <link rel="preconnect" href="https://mira-travel-demo.vercel.app" />
        <link rel="preconnect" href="https://claimeval.vercel.app" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://js-eu1.hs-scripts.com" />
      </head>
      <body className={`${interTight.variable} ${ibmPlexSans.variable} antialiased`}>
        <GoogleAnalyticsWrapper />
        <HubSpotTracking />
        <ThemeProvider>
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
        </ThemeProvider>
      </body>
    </html>
  );
}
