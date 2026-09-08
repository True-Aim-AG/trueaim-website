"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Cookie, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
}

const STORAGE_KEY = "cookie-consent";

export function CookieBanner() {
  const t = useTranslations("cookie");
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Read browser-only state after hydration, preserving the server render.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    setVisible(false);
    window.dispatchEvent(new Event("cookie-consent-update"));
  };

  const handleAcceptAll = () => {
    savePreferences({ essential: true, analytics: true });
  };

  const handleDecline = () => {
    savePreferences({ essential: true, analytics: false });
  };

  const handleSavePreferences = () => {
    savePreferences(preferences);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div
            className="max-w-4xl mx-auto glass-panel p-6 shadow-2xl border border-[var(--border)] cookie-banner-bg"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Cookie className="w-5 h-5 text-[var(--primary)]" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[var(--text-primary)] mb-1">{t("title")}</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  {t("description")}{" "}
                  <Link href="/cookies" className="text-[var(--primary)] hover:underline">
                    {t("learnMore")}
                  </Link>
                </p>

                {/* Manage Preferences Toggle */}
                <AnimatePresence>
                  {showPreferences && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden mb-4"
                    >
                      <div className="space-y-3 p-4 rounded-lg bg-[var(--subtle-bg)] border border-[var(--border)]">
                        <label className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium text-[var(--text-primary)]">{t("essential")}</span>
                            <p className="text-xs text-[var(--text-muted)]">{t("essentialDesc")}</p>
                          </div>
                          <div className="w-10 h-6 rounded-full bg-[var(--primary)] flex items-center justify-end px-0.5 cursor-not-allowed opacity-70">
                            <div className="w-5 h-5 rounded-full bg-white" />
                          </div>
                        </label>
                        <label className="flex items-center justify-between cursor-pointer">
                          <div>
                            <span className="text-sm font-medium text-[var(--text-primary)]">{t("analytics")}</span>
                            <p className="text-xs text-[var(--text-muted)]">{t("analyticsDesc")}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setPreferences(prev => ({ ...prev, analytics: !prev.analytics }))}
                            className={`w-10 h-6 rounded-full flex items-center px-0.5 transition-colors ${
                              preferences.analytics ? "bg-[var(--primary)] justify-end" : "bg-white/20 justify-start"
                            }`}
                          >
                            <div className="w-5 h-5 rounded-full bg-white transition-transform" />
                          </button>
                        </label>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Buttons */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleAcceptAll}
                    className="px-5 py-2.5 rounded-lg bg-[var(--primary)] text-white text-sm font-medium hover:bg-[var(--primary-hover)] transition-colors"
                  >
                    {t("acceptAll")}
                  </button>
                  <button
                    onClick={handleDecline}
                    className="px-5 py-2.5 rounded-lg border border-[var(--border)] text-[var(--text-primary)] text-sm font-medium hover:bg-[var(--subtle-bg)] transition-colors"
                  >
                    {t("decline")}
                  </button>
                  <button
                    onClick={showPreferences ? handleSavePreferences : () => setShowPreferences(true)}
                    className="px-5 py-2.5 rounded-lg border border-[var(--border)] text-[var(--text-secondary)] text-sm font-medium hover:bg-[var(--subtle-bg)] transition-colors inline-flex items-center gap-1"
                  >
                    {showPreferences ? t("savePreferences") : t("managePreferences")}
                    {!showPreferences && <ChevronDown className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
