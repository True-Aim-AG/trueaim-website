"use client";

import { useEffect, useState } from "react";
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
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    if (!GA_ID) return;

    // Check existing consent on mount.
    // Read browser-only state after hydration, preserving the server render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsented(hasAnalyticsConsent());
    updateConsent();

    // Listen for consent changes from cookie banner
    const handleConsent = () => {
      setConsented(hasAnalyticsConsent());
      updateConsent();
    };
    window.addEventListener("cookie-consent-update", handleConsent);
    return () => window.removeEventListener("cookie-consent-update", handleConsent);
  }, []);

  if (!GA_ID) return null;

  return (
    <>
      {/* Consent Mode v2 default: all four signals denied. Analytics is granted
          when the user accepts analytics cookies; the ad signals stay denied. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
            });
          `,
        }}
      />
      {/* Basic consent mode: the Google tag is not loaded until consent is given */}
      {consented && <NextGA gaId={GA_ID} />}
    </>
  );
}
