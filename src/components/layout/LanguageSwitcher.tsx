"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const localeNames: Record<string, string> = {
  en: "English",
  de: "Deutsch",
  fr: "Français",
  it: "Italiano",
};

const localeShort: Record<string, string> = {
  en: "EN",
  de: "DE",
  fr: "FR",
  it: "IT",
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
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
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--subtle-bg)] transition-colors text-sm font-medium"
        aria-label="Switch language"
      >
        <Globe className="w-4 h-4" />
        <span>{localeShort[locale]}</span>
      </button>

      {/* Dropdown */}
      <div
        className={cn(
          "absolute top-full right-0 mt-2 py-1 min-w-[160px] nav-dropdown backdrop-blur-xl border border-[var(--border)] rounded-xl shadow-2xl transition-all duration-200",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        {routing.locales.map((loc) => (
          <button
            key={loc}
            onClick={() => switchLocale(loc)}
            className={cn(
              "w-full text-left px-4 py-2.5 text-sm transition-colors",
              loc === locale
                ? "text-[var(--primary)] font-medium bg-[var(--primary-light)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--primary-light)]"
            )}
          >
            <span className="font-medium">{localeShort[loc]}</span>
            <span className="ml-2 text-[var(--text-muted)]">{localeNames[loc]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Mobile version - horizontal segmented control
export function LanguageSwitcherMobile() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <div className="flex rounded-lg border border-[var(--border)] overflow-hidden">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={cn(
            "flex-1 px-3 py-2 text-sm font-medium transition-colors",
            loc === locale
              ? "bg-[var(--primary)] text-white"
              : "text-[var(--text-secondary)] hover:bg-[var(--primary-light)]"
          )}
        >
          {localeShort[loc]}
        </button>
      ))}
    </div>
  );
}
