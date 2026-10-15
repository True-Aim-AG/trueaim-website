"use client";

import { OPEN_COOKIE_SETTINGS_EVENT } from "@/lib/consent";

/** Footer control that reopens the cookie banner so the choice can be changed. */
export function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))}
      className="text-left text-sm text-body transition-colors duration-150 ease-brand hover:text-strong hover:underline"
    >
      {label}
    </button>
  );
}
