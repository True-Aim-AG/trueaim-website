"use client";

import { useParams } from "next/navigation";

export function EnglishOnlyBanner() {
  const params = useParams();
  const locale = typeof params?.locale === "string" ? params.locale : "en";

  if (locale === "en") return null;

  const messages: Record<string, string> = {
    de: "Diese Seite ist nur auf Englisch verfügbar",
    fr: "Cette page est disponible uniquement en anglais",
    it: "Questa pagina è disponibile solo in inglese",
  };

  return (
    <div className="bg-amber-500/10 border-b border-amber-500/20 py-2 px-6 text-center">
      <p className="text-sm text-amber-600 dark:text-amber-400">
        {messages[locale] || "This page is available in English only"}
      </p>
    </div>
  );
}
