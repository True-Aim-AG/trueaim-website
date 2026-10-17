"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemedLogo } from "@/components/brand/Logo";
import { buttonClasses } from "@/components/brand/Button";
import { LanguageSwitcher, LanguageSwitcherMobile } from "@/components/layout/LanguageSwitcher";
import { useTranslations } from "next-intl";

type DropdownKey = "platform" | "resources" | "company";
type DropdownItem = { nameKey: string; href: string; descKey: string };

// The drop-downs of the V5 prototype. Solutions follows once its pages exist.
const dropdowns: Record<DropdownKey, DropdownItem[]> = {
  platform: [
    { nameKey: "platformDropdown.overview", href: "/platform", descKey: "platformDropdown.overviewDesc" },
    { nameKey: "platformDropdown.claimsDecisioning", href: "/platform/claims-decisioning", descKey: "platformDropdown.claimsDecisioningDesc" },
    { nameKey: "platformDropdown.invoiceBenchmarking", href: "/platform/invoice-benchmarking", descKey: "platformDropdown.invoiceBenchmarkingDesc" },
    { nameKey: "platformDropdown.damageReporting", href: "/platform/damage-reporting", descKey: "platformDropdown.damageReportingDesc" },
    { nameKey: "platformDropdown.otus", href: "/platform/otus", descKey: "platformDropdown.otusDesc" },
  ],
  resources: [
    { nameKey: "resourcesDropdown.caseStudies", href: "/case-studies", descKey: "resourcesDropdown.caseStudiesDesc" },
    { nameKey: "resourcesDropdown.blog", href: "/blog", descKey: "resourcesDropdown.blogDesc" },
    { nameKey: "resourcesDropdown.impactEstimator", href: "/impact-estimator", descKey: "resourcesDropdown.impactEstimatorDesc" },
    { nameKey: "resourcesDropdown.trustCenter", href: "/trust", descKey: "resourcesDropdown.trustCenterDesc" },
  ],
  company: [
    { nameKey: "companyDropdown.about", href: "/about", descKey: "companyDropdown.aboutDesc" },
    { nameKey: "companyDropdown.partners", href: "/partners", descKey: "companyDropdown.partnersDesc" },
    { nameKey: "companyDropdown.contact", href: "/contact", descKey: "companyDropdown.contactDesc" },
  ],
};

const navigation: DropdownKey[] = ["platform", "resources", "company"];

function Dropdown({ open, items, t }: { open: boolean; items: DropdownItem[]; t: ReturnType<typeof useTranslations<"nav">> }) {
  return (
    <div
      className={cn(
        "absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-[opacity,transform,visibility] duration-150 ease-brand",
        open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1",
      )}
    >
      <div className="nav-dropdown rounded-pill p-3 min-w-[264px]">
        {items.map((item) => (
          <Link
            key={item.nameKey}
            href={item.href}
            className="block rounded-pill px-6 py-3 transition-colors duration-150 ease-brand hover:bg-accent-soft group/item"
          >
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <div className="font-medium text-strong">{t(item.nameKey as any)}</div>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <div className="text-sm text-muted">{t(item.descKey as any)}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Navigation() {
  const t = useTranslations("nav");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-[60] nav-header border-b border-hairline" data-menu-open={mobileMenuOpen ? "true" : "false"}>
      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex h-[75px] items-center justify-between">
          {/* Logo: horizontal dark lock-up, clear space = symbol height */}
          <Link href="/" className="flex items-center py-2" aria-label={t("logoAlt")}>
            <ThemedLogo kind="horizontal" height={34} priority />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-9">
            {navigation.map((key) => (
              <div
                key={key}
                className="relative"
                onMouseEnter={() => setOpenDropdown(key)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 text-button text-body transition-colors duration-150 ease-brand hover:text-accent"
                  aria-expanded={openDropdown === key}
                  onClick={() => setOpenDropdown((open) => (open === key ? null : key))}
                >
                  {t(key)}
                  <ChevronDown
                    strokeWidth={1.5}
                    className={cn("w-4 h-4 transition-transform duration-150 ease-brand", openDropdown === key && "rotate-180")}
                  />
                </button>
                <Dropdown open={openDropdown === key} items={dropdowns[key]} t={t} />
              </div>
            ))}
          </div>

          {/* CTA + language */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <Link href="/contact" className={buttonClasses("primary", "sm")}>
              {t("requestDemo")}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 -mr-2 text-body hover:text-strong transition-colors"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={t("toggleMenu")}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X strokeWidth={1.5} className="w-6 h-6" /> : <Menu strokeWidth={1.5} className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <div className={cn("md:hidden overflow-hidden transition-[max-height] duration-300 ease-brand", mobileMenuOpen ? "max-h-[80vh] overflow-y-auto" : "max-h-0")}>
          <div className="flex flex-col gap-1 pb-6 pt-2">
            {navigation.map((key, index) => (
              <div key={key} className={cn("py-2", index > 0 && "border-t border-hairline")}>
                <div className={cn("text-caption-sm text-subtle px-4 mb-2", index > 0 && "mt-2")}>{t(key)}</div>
                {dropdowns[key].map((item) => (
                  <Link
                    key={item.nameKey}
                    href={item.href}
                    className="block rounded-pill px-4 py-2.5 text-body hover:bg-accent-soft hover:text-accent transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {t(item.nameKey as any)}
                  </Link>
                ))}
              </div>
            ))}
            <div className="flex flex-col gap-3 mt-3 px-1">
              <LanguageSwitcherMobile />
              <Link href="/contact" className={buttonClasses("primary", "md", "w-full")} onClick={() => setMobileMenuOpen(false)}>
                {t("requestDemo")}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
