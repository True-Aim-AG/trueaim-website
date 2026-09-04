"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Cookie, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/brand/Button";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
}

const STORAGE_KEY = "cookie-consent";
const ease = [0.4, 0, 0.2, 1] as const;

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
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.3, ease }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="cookie-banner-bg mx-auto max-w-4xl rounded-pill p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-pill bg-lilac text-accent">
                <Cookie strokeWidth={1.5} className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="mb-1 font-semibold text-strong">{t("title")}</h3>
                <p className="mb-4 text-sm text-body">
                  {t("description")}{" "}
                  <Link href="/cookies" className="text-link hover:underline">
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
                      transition={{ duration: 0.3, ease }}
                      className="mb-4 overflow-hidden"
                    >
                      <div className="space-y-3 rounded-pill bg-surface-muted p-4">
                        <label className="flex items-center justify-between gap-4 px-2">
                          <div>
                            <span className="text-sm font-medium text-strong">{t("essential")}</span>
                            <p className="text-xs text-muted">{t("essentialDesc")}</p>
                          </div>
                          <input
                            type="checkbox"
                            checked
                            disabled
                            aria-label={t("essential")}
                            className="h-5 w-5 cursor-not-allowed opacity-70"
                          />
                        </label>
                        <label className="flex cursor-pointer items-center justify-between gap-4 px-2">
                          <div>
                            <span className="text-sm font-medium text-strong">{t("analytics")}</span>
                            <p className="text-xs text-muted">{t("analyticsDesc")}</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={preferences.analytics}
                            onChange={() => setPreferences((prev) => ({ ...prev, analytics: !prev.analytics }))}
                            aria-label={t("analytics")}
                            className="h-5 w-5 cursor-pointer"
                          />
                        </label>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" size="sm" onClick={handleAcceptAll}>
                    {t("acceptAll")}
                  </Button>
                  <Button variant="secondary" size="sm" onClick={handleDecline}>
                    {t("decline")}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="inline-flex items-center gap-1"
                    onClick={showPreferences ? handleSavePreferences : () => setShowPreferences(true)}
                  >
                    {showPreferences ? t("savePreferences") : t("managePreferences")}
                    {!showPreferences && <ChevronDown strokeWidth={1.5} className="h-3 w-3" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
