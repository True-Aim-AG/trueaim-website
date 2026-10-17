"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Check, Globe } from "lucide-react";
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
 * The globe button opens a list of plain links to the same page in each
 * language it exists in. The list is in the HTML whether open or closed, so
 * crawlers follow the links without JavaScript. Nothing renders on a page
 * that exists in English only.
 */
export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("nav");
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function close(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) setIsOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const locales = pageLocales(pathname);
  if (locales.length < 2) return null;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className={cn(
          "flex h-10 items-center gap-1.5 rounded-pill px-3.5 text-body transition-colors duration-150 ease-brand hover:bg-accent-soft hover:text-accent",
          isOpen && "bg-accent-soft text-accent",
        )}
        aria-label={t("languageLabel")}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe strokeWidth={1.5} className="h-4 w-4" />
        <span className="text-xs font-medium tracking-[0.08em]">{localeConfig[locale]?.short ?? locale.toUpperCase()}</span>
      </button>

      <nav
        aria-label={t("languageLabel")}
        className={cn(
          "nav-dropdown absolute right-0 top-full z-50 mt-3 min-w-[196px] rounded-pill p-2 transition-[opacity,transform,visibility] duration-150 ease-brand",
          isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
        )}
      >
        <ul>
          {locales.map((loc) => {
            const current = loc === locale;
            return (
              <li key={loc}>
                <Link
                  href={pathname}
                  locale={loc}
                  hrefLang={loc}
                  lang={loc}
                  aria-current={current ? "page" : undefined}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-pill px-4 py-2.5 text-sm transition-colors duration-150 ease-brand",
                    current ? "bg-accent-soft text-accent" : "text-body hover:bg-surface-muted",
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    <span className={cn("w-6 text-xs font-medium tracking-[0.08em]", current ? "text-accent" : "text-subtle")}>
                      {localeConfig[loc]?.short ?? loc.toUpperCase()}
                    </span>
                    <span className={cn("font-medium", current && "font-semibold")}>{localeConfig[loc]?.name ?? loc}</span>
                  </span>
                  {current && <Check strokeWidth={1.5} className="h-4 w-4 text-accent" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

/** The same links as a pill group, for the mobile menu. */
export function LanguageSwitcherMobile() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("nav");
  const locales = pageLocales(pathname);
  if (locales.length < 2) return null;

  return (
    <nav aria-label={t("languageLabel")} className="flex gap-1 rounded-pill bg-surface-muted p-1">
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
            aria-label={localeConfig[loc]?.name ?? loc}
            className={cn(
              "flex-1 rounded-pill px-3 py-2 text-center text-xs font-medium tracking-[0.08em] transition-colors duration-150 ease-brand",
              current ? "bg-ta-blue text-on-brand" : "text-body hover:bg-accent-soft",
            )}
          >
            {localeConfig[loc]?.short ?? loc.toUpperCase()}
          </Link>
        );
      })}
    </nav>
  );
}
