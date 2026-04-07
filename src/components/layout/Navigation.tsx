"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LanguageSwitcher, LanguageSwitcherMobile } from "@/components/layout/LanguageSwitcher";
import { useTranslations } from "next-intl";

const products = [
  { nameKey: "productsDropdown.mira" as const, href: "/products/mira", descKey: "productsDropdown.miraDesc" as const },
  { nameKey: "productsDropdown.contextBuilder" as const, href: "/products/contextbuilder", descKey: "productsDropdown.contextBuilderDesc" as const },
  { nameKey: "productsDropdown.claimEval" as const, href: "/products/claimeval", descKey: "productsDropdown.claimEvalDesc" as const },
];

const resources = [
  { nameKey: "resourcesDropdown.caseStudies" as const, href: "/case-studies", descKey: "resourcesDropdown.caseStudiesDesc" as const },
  { nameKey: "resourcesDropdown.impactEstimator" as const, href: "/impact-estimator", descKey: "resourcesDropdown.impactEstimatorDesc" as const },
  { nameKey: "resourcesDropdown.trustCenter" as const, href: "/trust", descKey: "resourcesDropdown.trustCenterDesc" as const },
  { nameKey: "resourcesDropdown.blog" as const, href: "/blog", descKey: "resourcesDropdown.blogDesc" as const },
];

const navigation = [
  { nameKey: "products" as const, href: "/products", hasDropdown: true, dropdownType: "products" },
  { nameKey: "resources" as const, href: "/resources", hasDropdown: true, dropdownType: "resources" },
  { nameKey: "technology" as const, href: "/technology" },
  { nameKey: "company" as const, href: "/company" },
  { nameKey: "contact" as const, href: "/contact" },
];

export function Navigation() {
  const t = useTranslations("nav");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 nav-header backdrop-blur-xl border-b border-[var(--border)]">
      <nav className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo with hover glow */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              className="relative bg-white rounded-xl p-1.5 shadow-lg shadow-white/10"
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Image
                src="/images/logo.png"
                alt={t("logoAlt")}
                width={36}
                height={36}
                className="object-contain"
                priority
              />
              {/* Teal glow on hover */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.15)" }}
              />
            </motion.div>
            <Image
              src="/images/wordmark.png"
              alt="True AIm"
              width={120}
              height={20}
              className="h-5 w-auto object-contain light-only"
            />
            <Image
              src="/images/wordmark-dark.png"
              alt="True AIm"
              width={120}
              height={20}
              className="h-5 w-auto object-contain dark-only"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <div key={item.nameKey} className="relative">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => item.dropdownType === "products" ? setProductsOpen(true) : setResourcesOpen(true)}
                    onMouseLeave={() => item.dropdownType === "products" ? setProductsOpen(false) : setResourcesOpen(false)}
                  >
                    <button
                      className="flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--primary)] transition-all duration-200 font-medium hover:-translate-y-px"
                    >
                      {t(item.nameKey)}
                      <ChevronDown className={cn(
                        "w-4 h-4 transition-transform duration-200",
                        (item.dropdownType === "products" ? productsOpen : resourcesOpen) && "rotate-180"
                      )} />
                    </button>

                    {/* Products Dropdown */}
                    {item.dropdownType === "products" && (
                      <div className={cn(
                        "absolute top-full left-0 pt-2 transition-all duration-200",
                        productsOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1"
                      )}>
                        <div className="nav-dropdown backdrop-blur-xl border border-[var(--border)] rounded-xl shadow-2xl p-2 min-w-[240px]">
                          {products.map((product) => (
                            <Link
                              key={product.nameKey}
                              href={product.href}
                              className="block px-4 py-3 rounded-lg hover:bg-[var(--primary-light)] transition-all group/item"
                            >
                              <div className="font-medium text-[var(--text-primary)] group-hover/item:text-[var(--primary)] transition-colors">
                                {t(product.nameKey)}
                              </div>
                              <div className="text-sm text-[var(--text-muted)]">
                                {t(product.descKey)}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Resources Dropdown */}
                    {item.dropdownType === "resources" && (
                      <div className={cn(
                        "absolute top-full left-0 pt-2 transition-all duration-200",
                        resourcesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1"
                      )}>
                        <div className="nav-dropdown backdrop-blur-xl border border-[var(--border)] rounded-xl shadow-2xl p-2 min-w-[260px]">
                          {resources.map((resource) => (
                            <Link
                              key={resource.nameKey}
                              href={resource.href}
                              className="block px-4 py-3 rounded-lg hover:bg-[var(--primary-light)] transition-all group/item"
                            >
                              <div className="font-medium text-[var(--text-primary)] group-hover/item:text-[var(--primary)] transition-colors">
                                {t(resource.nameKey)}
                              </div>
                              <div className="text-sm text-[var(--text-muted)]">
                                {t(resource.descKey)}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-all duration-200 font-medium hover:-translate-y-px"
                  >
                    {t(item.nameKey)}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button, Language & Theme Toggle */}
          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <Link
              href="/contact"
              className="btn-shine inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold hover:bg-[var(--primary-hover)] transition-all shadow-lg shadow-[var(--primary)]/20 hover:shadow-[var(--primary)]/40 hover:scale-[1.02]"
            >
              {t("bookDemo")}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label={t("toggleMenu")}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          mobileMenuOpen ? "max-h-[80vh] overflow-y-auto pt-4" : "max-h-0"
        )}>
          <div className="flex flex-col gap-2 pb-4">
            {/* Products Section */}
            <div className="py-2">
              <div className="text-sm font-medium text-[var(--text-muted)] px-2 mb-2">
                {t("products")}
              </div>
              {products.map((product) => (
                <Link
                  key={product.nameKey}
                  href={product.href}
                  className="block px-4 py-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--primary-light)] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t(product.nameKey)}
                </Link>
              ))}
            </div>

            {/* Resources Section */}
            <div className="py-2 border-t border-[var(--border)]">
              <div className="text-sm font-medium text-[var(--text-muted)] px-2 mb-2">
                {t("resources")}
              </div>
              {resources.map((resource) => (
                <Link
                  key={resource.nameKey}
                  href={resource.href}
                  className="block px-4 py-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--primary-light)] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t(resource.nameKey)}
                </Link>
              ))}
            </div>

            {/* Other Links */}
            <div className="py-2 border-t border-[var(--border)]">
              {navigation.filter(n => !n.hasDropdown).map((item) => (
                <Link
                  key={item.nameKey}
                  href={item.href}
                  className="block px-4 py-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--primary-light)] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t(item.nameKey)}
                </Link>
              ))}
            </div>

            {/* Mobile Language, Theme Toggle & CTA */}
            <div className="flex flex-col gap-3 mt-2">
              <LanguageSwitcherMobile />
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <Link
                  href="/contact"
                  className="flex-1 btn-shine inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold hover:bg-[var(--primary-hover)] transition-all shadow-lg shadow-[var(--primary)]/20"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("bookDemo")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
