"use client";

import { useEffect } from "react";
import { GoogleAnalytics as NextGA } from "@next/third-parties/google";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const STORAGE_KEY = "cookie-consent";

function hasAnalyticsConsent(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return false;
    const prefs = JSON.parse(stored);
    return prefs.analytics === true;
  } catch {
    return false;
  }
}

function updateConsent() {
  if (hasAnalyticsConsent()) {
    window.gtag?.("consent", "update", {
      analytics_storage: "granted",
    });
  }
}

export function GoogleAnalyticsWrapper() {
  useEffect(() => {
    if (!GA_ID) return;

    // Check existing consent on mount
    updateConsent();

    // Listen for consent changes from cookie banner
    const handleConsent = () => updateConsent();
    window.addEventListener("cookie-consent-update", handleConsent);
    return () => window.removeEventListener("cookie-consent-update", handleConsent);
  }, []);

  if (!GA_ID) return null;

  return (
    <>
      {/* Default consent to denied — upgraded when user accepts analytics cookies */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              analytics_storage: 'denied',
            });
          `,
        }}
      />
      <NextGA gaId={GA_ID} />
    </>
  );
}
