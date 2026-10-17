"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { pageLocales } from "@/i18n/page-locales";
import { cn } from "@/lib/utils";

const localeConfig: Record<string, { name: string; short: string }> = {
  en: { name: "English", short: "EN" },
  de: { name: "Deutsch", short: "DE" },
  fr: { name: "Français", short: "FR" },
  it: { name: "Italiano", short: "IT" },
};

/**
 * Plain links to the same page in each language it exists in, so crawlers
 * can follow them without JavaScript. Nothing is rendered on a page that
 * exists in English only.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("nav");
  const locales = pageLocales(pathname);
  if (locales.length < 2) return null;

  return (
    <nav aria-label={t("languageLabel")} className={cn("flex items-center rounded-pill bg-surface-muted p-1 gap-1", className)}>
      {locales.map((loc) => {
        const current = loc === locale;
        return (
          <Link
            key={loc}
            href={pathname}
            locale={loc}
            hrefLang={loc}
            lang={loc}
            aria-current={current ? "page" : undefined}
            aria-label={localeConfig[loc]?.name}
            className={cn(
              "flex-1 rounded-pill px-3 py-2 text-center text-xs font-medium tracking-[0.08em] transition-colors duration-150 ease-brand",
              current ? "bg-ta-blue text-on-brand" : "text-body hover:bg-accent-soft hover:text-accent",
            )}
          >
            {localeConfig[loc]?.short ?? loc.toUpperCase()}
          </Link>
        );
      })}
    </nav>
  );
}
