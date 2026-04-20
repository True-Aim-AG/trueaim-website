"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
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

export function HubSpotTracking() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    setConsented(hasAnalyticsConsent());
    const handleConsent = () => setConsented(hasAnalyticsConsent());
    window.addEventListener("cookie-consent-update", handleConsent);
    return () => window.removeEventListener("cookie-consent-update", handleConsent);
  }, []);

  if (!PORTAL_ID || !consented) return null;

  return (
    <Script
      id="hs-script-loader"
      strategy="afterInteractive"
      src={`https://js-eu1.hs-scripts.com/${PORTAL_ID}.js`}
    />
  );
}
