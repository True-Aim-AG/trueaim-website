import { Inter_Tight, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Logo } from "@/components/brand/Logo";
import { buttonClasses } from "@/components/brand/Button";

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

export default function RootNotFound() {
  return (
    <html lang="en" className={`${interTight.variable} ${ibmPlexSans.variable}`}>
      <body>
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="text-center">
            <Logo variant="symbol-blue" height={48} className="mx-auto mb-8" />
            <h1 className="font-display text-4xl font-bold text-strong mb-4">404</h1>
            <p className="text-body mb-8">Page not found</p>
            {/* Full document navigation restores the locale layout from the root 404. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/" className={buttonClasses("primary", "lg")}>
              Go home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
