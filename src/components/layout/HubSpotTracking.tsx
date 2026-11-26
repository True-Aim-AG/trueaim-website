"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { CONSENT_UPDATED_EVENT, hasHubSpotConsent } from "@/lib/consent";

const PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;

/** The HubSpot tracker has its own consent category, separate from analytics (GA4). */
export function HubSpotTracking() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    // Read browser-only state after hydration, preserving the server render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsented(hasHubSpotConsent());
    const handleConsent = () => setConsented(hasHubSpotConsent());
    window.addEventListener(CONSENT_UPDATED_EVENT, handleConsent);
    return () => window.removeEventListener(CONSENT_UPDATED_EVENT, handleConsent);
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
