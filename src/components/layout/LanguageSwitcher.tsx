"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Globe, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
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
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "flex items-center gap-1.5 h-9 px-2.5 rounded-lg border border-[var(--border)] bg-[var(--background-secondary)] hover:bg-[var(--primary-light)] transition-all duration-200 text-[var(--text-secondary)]",
          isOpen && "bg-[var(--primary-light)] border-[var(--border-hover)]"
        )}
        aria-label="Switch language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe className="w-4 h-4" />
        <span className="text-xs font-semibold tracking-wide">
          {localeConfig[locale]?.short}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full right-0 mt-2 py-1.5 min-w-[176px] nav-dropdown backdrop-blur-xl border border-[var(--border)] rounded-xl shadow-2xl overflow-hidden z-50"
            role="listbox"
            aria-label="Select language"
          >
            {routing.locales.map((loc) => (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                role="option"
                aria-selected={loc === locale}
                className={cn(
                  "w-full flex items-center justify-between px-3.5 py-2.5 text-sm transition-colors",
                  loc === locale
                    ? "text-[var(--primary)] bg-[var(--primary-light)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--subtle-bg)]"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={cn(
                      "text-xs font-bold tracking-wider w-6",
                      loc === locale
                        ? "text-[var(--primary)]"
                        : "text-[var(--text-muted)]"
                    )}
                  >
                    {localeConfig[loc]?.short}
                  </span>
                  <span
                    className={cn(
                      "font-medium",
                      loc === locale && "font-semibold"
                    )}
                  >
                    {localeConfig[loc]?.name}
                  </span>
                </div>
                {loc === locale && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  >
                    <Check className="w-4 h-4 text-[var(--primary)]" />
                  </motion.div>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
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
    <div className="flex rounded-lg border border-[var(--border)] overflow-hidden">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={cn(
            "relative flex-1 px-3 py-2 text-xs font-semibold tracking-wide transition-all duration-200",
            loc === locale
              ? "bg-[var(--primary)] text-white"
              : "text-[var(--text-secondary)] hover:bg-[var(--primary-light)]"
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
