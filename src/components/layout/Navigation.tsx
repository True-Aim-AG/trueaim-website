"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemedLogo } from "@/components/brand/Logo";
import { buttonClasses } from "@/components/brand/Button";
import { LanguageSwitcher, LanguageSwitcherMobile } from "@/components/layout/LanguageSwitcher";
import { useTranslations } from "next-intl";

/**
 * The four groups of the V5 prototype: Platform, Solutions, Resources and
 * Company, each a drop-down with a name and a line per entry. Labels and
 * lines come from messages/<locale>/common.json under "nav".
 */
type Group = { key: "platform" | "solutions" | "resources" | "company"; items: { key: string; href: string }[] };

const groups: Group[] = [
  {
    key: "platform",
    items: [
      { key: "claimsDecisioning", href: "/platform/claims-decisioning" },
      { key: "invoiceBenchmarking", href: "/platform/invoice-benchmarking" },
      { key: "damageReporting", href: "/platform/damage-reporting" },
      { key: "otus", href: "/platform/otus" },
    ],
  },
  {
    key: "solutions",
    items: [
      { key: "insurers", href: "/solutions/insurers" },
      { key: "brokers", href: "/solutions/brokers" },
      { key: "tpas", href: "/solutions/third-party-administrators" },
      { key: "warranty", href: "/solutions/warranty-providers" },
      { key: "claimsTech", href: "/solutions/claims-technology-providers" },
    ],
  },
  {
    key: "resources",
    items: [
      { key: "caseStudies", href: "/case-studies" },
      { key: "blog", href: "/blog" },
      { key: "impactEstimator", href: "/impact-estimator" },
      { key: "trustCenter", href: "/trust" },
    ],
  },
  {
    key: "company",
    items: [
      { key: "about", href: "/about" },
      { key: "partners", href: "/partners" },
      { key: "contact", href: "/contact" },
    ],
  },
];

type Translate = ReturnType<typeof useTranslations<"nav">>;

/* eslint-disable @typescript-eslint/no-explicit-any */
const name = (t: Translate, key: string) => t(`menu.${key}.name` as any);
const desc = (t: Translate, key: string) => t(`menu.${key}.desc` as any);
/* eslint-enable @typescript-eslint/no-explicit-any */

function Dropdown({ open, group, right, t }: { open: boolean; group: Group; right: boolean; t: Translate }) {
  return (
    <div
      className={cn(
        "absolute top-full pt-3 transition-[opacity,transform,visibility] duration-150 ease-brand",
        right ? "right-[-24px]" : "left-[-24px]",
        open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1.5 opacity-0",
      )}
    >
      <div className="min-w-[390px] rounded-[12px] border border-line bg-white p-3 shadow-card">
        {group.items.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className="block rounded-[8px] px-4 py-3.5 transition-colors duration-150 ease-brand hover:bg-ta-blue-50"
          >
            <span className="block font-medium text-strong">{name(t, item.key)}</span>
            <span className="mt-1 block text-sm text-muted">{desc(t, item.key)}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Navigation() {
  const t = useTranslations("nav");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openKey, setOpenKey] = useState<Group["key"] | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-[60] nav-header border-b border-hairline" data-menu-open={mobileMenuOpen ? "true" : "false"}>
      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex h-[78px] items-center justify-between">
          <Link href="/" className="flex items-center py-2" aria-label={t("logoAlt")}>
            <ThemedLogo kind="horizontal" height={34} priority />
          </Link>

          {/* Desktop navigation: the four groups */}
          <div className="hidden items-center gap-8 md:flex">
            {groups.map((group, index) => {
              const open = openKey === group.key;
              return (
                <div
                  key={group.key}
                  className="relative"
                  onMouseEnter={() => setOpenKey(group.key)}
                  onMouseLeave={() => setOpenKey((current) => (current === group.key ? null : current))}
                >
                  <button
                    type="button"
                    className={cn(
                      "flex items-center gap-1.5 py-7 text-button text-body transition-colors duration-150 ease-brand hover:text-accent",
                      open && "text-accent",
                    )}
                    aria-haspopup="true"
                    aria-expanded={open}
                    onClick={() => setOpenKey(open ? null : group.key)}
                  >
                    {t(group.key)}
                    <ChevronDown
                      strokeWidth={1.5}
                      className={cn("h-4 w-4 transition-transform duration-150 ease-brand", open && "rotate-180")}
                    />
                  </button>
                  <Dropdown open={open} group={group} right={index >= groups.length - 2} t={t} />
                </div>
              );
            })}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitcher />
            <Link href="/contact" className={buttonClasses("primary", "sm")}>
              {t("bookDemo")}
            </Link>
          </div>

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

        {/* Mobile menu: the same four groups as a panel */}
        <div className={cn("md:hidden overflow-hidden transition-[max-height] duration-300 ease-brand", mobileMenuOpen ? "max-h-[80vh] overflow-y-auto" : "max-h-0")}>
          <div className="flex flex-col pb-6 pt-2">
            {groups.map((group) => (
              <div key={group.key} className="py-2 [&+&]:border-t [&+&]:border-hairline">
                <div className="mb-1 mt-2 px-4 text-caption-sm text-accent">{t(group.key)}</div>
                {group.items.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="block border-b border-hairline px-4 py-3 last:border-b-0"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="block font-medium text-strong">{name(t, item.key)}</span>
                    <span className="block text-sm text-muted">{desc(t, item.key)}</span>
                  </Link>
                ))}
              </div>
            ))}
            <div className="mt-3 flex flex-col gap-3 px-1">
              <LanguageSwitcherMobile />
              <Link href="/contact" className={buttonClasses("primary", "md", "w-full")} onClick={() => setMobileMenuOpen(false)}>
                {t("bookDemo")}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
