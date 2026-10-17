"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemedLogo } from "@/components/brand/Logo";
import { buttonClasses } from "@/components/brand/Button";
import { LanguageSwitcher, LanguageSwitcherMobile } from "@/components/layout/LanguageSwitcher";
import { useTranslations } from "next-intl";

const platform = [
  { nameKey: "platformDropdown.overview" as const, href: "/platform", descKey: "platformDropdown.overviewDesc" as const },
  { nameKey: "platformDropdown.claimsDecisioning" as const, href: "/platform/claims-decisioning", descKey: "platformDropdown.claimsDecisioningDesc" as const },
  { nameKey: "platformDropdown.invoiceBenchmarking" as const, href: "/platform/invoice-benchmarking", descKey: "platformDropdown.invoiceBenchmarkingDesc" as const },
  { nameKey: "platformDropdown.damageReporting" as const, href: "/platform/damage-reporting", descKey: "platformDropdown.damageReportingDesc" as const },
  { nameKey: "platformDropdown.otus" as const, href: "/platform/otus", descKey: "platformDropdown.otusDesc" as const },
];

const resources = [
  { nameKey: "resourcesDropdown.caseStudies" as const, href: "/case-studies", descKey: "resourcesDropdown.caseStudiesDesc" as const },
  { nameKey: "resourcesDropdown.blog" as const, href: "/blog", descKey: "resourcesDropdown.blogDesc" as const },
  { nameKey: "resourcesDropdown.news" as const, href: "/news", descKey: "resourcesDropdown.newsDesc" as const },
  { nameKey: "resourcesDropdown.impactEstimator" as const, href: "/impact-estimator", descKey: "resourcesDropdown.impactEstimatorDesc" as const },
];

type DropdownType = "platform" | "resources";

const navigation: { nameKey: "platform" | "technology" | "trust" | "resources" | "about" | "contact"; href: string; dropdown?: DropdownType }[] = [
  { nameKey: "platform", href: "/platform", dropdown: "platform" },
  { nameKey: "technology", href: "/technology" },
  { nameKey: "trust", href: "/trust" },
  { nameKey: "resources", href: "/case-studies", dropdown: "resources" },
  { nameKey: "about", href: "/about" },
  { nameKey: "contact", href: "/contact" },
];

const dropdownItems = { platform, resources };

type DropdownItem = { nameKey: string; href: string; descKey: string };

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
  const [openDropdown, setOpenDropdown] = useState<DropdownType | null>(null);

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
            {navigation.map((item) => (
              <div key={item.nameKey} className="relative">
                {item.dropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.dropdown!)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      type="button"
                      className="flex items-center gap-1 text-button text-body transition-colors duration-150 ease-brand hover:text-accent"
                      aria-expanded={openDropdown === item.dropdown}
                      onClick={() => setOpenDropdown((v) => (v === item.dropdown ? null : item.dropdown!))}
                    >
                      {t(item.nameKey)}
                      <ChevronDown
                        strokeWidth={1.5}
                        className={cn(
                          "w-4 h-4 transition-transform duration-150 ease-brand",
                          openDropdown === item.dropdown && "rotate-180",
                        )}
                      />
                    </button>
                    <Dropdown open={openDropdown === item.dropdown} items={dropdownItems[item.dropdown]} t={t} />
                  </div>
                ) : (
                  <Link href={item.href} className="text-button text-body transition-colors duration-150 ease-brand hover:text-accent">
                    {t(item.nameKey)}
                  </Link>
                )}
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
            <div className="py-2">
              <div className="text-caption-sm text-subtle px-4 mb-2">{t("platform")}</div>
              {platform.map((item) => (
                <Link key={item.nameKey} href={item.href} className="block rounded-pill px-4 py-2.5 text-body hover:bg-accent-soft hover:text-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  {t(item.nameKey)}
                </Link>
              ))}
            </div>
            <div className="py-2 border-t border-hairline">
              <div className="text-caption-sm text-subtle px-4 mb-2 mt-2">{t("resources")}</div>
              {resources.map((item) => (
                <Link key={item.nameKey} href={item.href} className="block rounded-pill px-4 py-2.5 text-body hover:bg-accent-soft hover:text-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  {t(item.nameKey)}
                </Link>
              ))}
            </div>
            <div className="py-2 border-t border-hairline">
              {navigation.filter((n) => !n.dropdown).map((item) => (
                <Link key={item.nameKey} href={item.href} className="block rounded-pill px-4 py-2.5 text-body hover:bg-accent-soft hover:text-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  {t(item.nameKey)}
                </Link>
              ))}
            </div>
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
