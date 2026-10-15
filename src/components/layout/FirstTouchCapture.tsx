"use client";

import { useEffect } from "react";
import { CONSENT_UPDATED_EVENT } from "@/lib/consent";
import { captureFirstTouch, persistFirstTouch } from "@/lib/tracking/first-touch";

/** Captures first-visit attribution on the first page view; stores it only after consent. */
export function FirstTouchCapture() {
  useEffect(() => {
    captureFirstTouch();
    window.addEventListener(CONSENT_UPDATED_EVENT, persistFirstTouch);
    return () => window.removeEventListener(CONSENT_UPDATED_EVENT, persistFirstTouch);
  }, []);
  return null;
}
