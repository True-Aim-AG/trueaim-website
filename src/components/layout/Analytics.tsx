"use client";

import { useEffect } from "react";
import {
  CONSENT_UPDATED_EVENT,
  GA_MEASUREMENT_ID,
  GTM_ID,
  gtag,
  hasAnalyticsConsent,
  pushDataLayer,
} from "@/lib/consent";

let loaded = false;

function loadScript(src: string) {
  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

/**
 * Grants analytics storage (the ad signals stay denied) and then loads the
 * tags, in that order, so GTM reads the update before any tag fires. With
 * NEXT_PUBLIC_GTM_ID set, Google Tag Manager carries GA4 and every other
 * tag; the direct GA4 tag is only the fallback while that variable is unset,
 * so the two never run together and nothing is counted twice.
 */
function grantAnalytics() {
  gtag("consent", "update", { analytics_storage: "granted" });
  if (loaded) return;
  loaded = true;
  if (GTM_ID) {
    pushDataLayer({ "gtm.start": Date.now(), event: "gtm.js" });
    loadScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`);
  } else if (GA_MEASUREMENT_ID) {
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`);
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID);
  }
}

/**
 * Strict consent: no request to Google before the visitor accepts analytics
 * cookies. The consent defaults are set by the inline <head> script in the
 * locale layout; this component only reacts to the stored choice.
 */
export function Analytics() {
  useEffect(() => {
    if (!GTM_ID && !GA_MEASUREMENT_ID) return;
    const apply = () => {
      if (hasAnalyticsConsent()) grantAnalytics();
    };
    apply();
    window.addEventListener(CONSENT_UPDATED_EVENT, apply);
    return () => window.removeEventListener(CONSENT_UPDATED_EVENT, apply);
  }, []);

  return null;
}
