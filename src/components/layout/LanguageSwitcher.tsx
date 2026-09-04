"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Globe, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const localeConfig: Record<string, { name: string; short: string }> = {
  en: { name: "English", short: "EN" },
  de: { name: "Deutsch", short: "DE" },
  fr: { name: "Français", short: "FR" },
  it: { name: "Italiano", short: "IT" },
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function switchLocale(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "flex items-center gap-1.5 h-10 px-3.5 rounded-pill text-body transition-colors duration-150 ease-brand hover:bg-accent-soft hover:text-accent",
          isOpen && "bg-accent-soft text-accent",
        )}
        aria-label="Switch language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe strokeWidth={1.5} className="w-4 h-4" />
        <span className="text-xs font-medium tracking-[0.08em]">{localeConfig[locale]?.short}</span>
      </button>

      <div
        className={cn(
          "absolute top-full right-0 mt-3 nav-dropdown rounded-pill p-2 min-w-[196px] z-50 transition-[opacity,transform,visibility] duration-150 ease-brand",
          isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1",
        )}
        role="listbox"
        aria-label="Select language"
      >
        {routing.locales.map((loc) => (
          <button
            key={loc}
            type="button"
            onClick={() => switchLocale(loc)}
            role="option"
            aria-selected={loc === locale}
            className={cn(
              "w-full flex items-center justify-between rounded-pill px-4 py-2.5 text-sm transition-colors duration-150 ease-brand",
              loc === locale ? "text-accent bg-accent-soft" : "text-body hover:bg-surface-muted",
            )}
          >
            <span className="flex items-center gap-2.5">
              <span className={cn("text-xs font-medium tracking-[0.08em] w-6", loc === locale ? "text-accent" : "text-subtle")}>{localeConfig[loc]?.short}</span>
              <span className={cn("font-medium", loc === locale && "font-semibold")}>{localeConfig[loc]?.name}</span>
            </span>
            {loc === locale && <Check strokeWidth={1.5} className="w-4 h-4 text-accent" />}
          </button>
        ))}
      </div>
    </div>
  );
}

export function LanguageSwitcherMobile() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <div className="flex rounded-pill bg-surface-muted p-1 gap-1">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => switchLocale(loc)}
          className={cn(
            "relative flex-1 px-3 py-2 rounded-pill text-xs font-medium tracking-[0.08em] transition-colors duration-150 ease-brand",
            loc === locale ? "bg-ta-blue text-on-brand" : "text-body hover:bg-accent-soft",
          )}
          aria-label={localeConfig[loc]?.name}
          aria-current={loc === locale ? "true" : undefined}
        >
          {localeConfig[loc]?.short}
        </button>
      ))}
    </div>
  );
}
