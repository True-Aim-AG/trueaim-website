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
    <div className="border-b border-hairline bg-lilac px-6 py-2 text-center">
      <p className="text-sm text-body">
        {messages[locale] || "This page is available in English only"}
      </p>
    </div>
  );
}
