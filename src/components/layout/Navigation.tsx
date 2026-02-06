"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme";

const products = [
  { name: "MIRA", href: "/products/mira", description: "Decisioning Engine" },
  { name: "ContextBuilder", href: "/products/contextbuilder", description: "Document Pipeline" },
  { name: "ClaimEval", href: "/products/claimeval", description: "Quality Assurance" },
];

const resources = [
  { name: "Case Studies", href: "/case-studies", description: "Customer success stories" },
  { name: "Impact Estimator", href: "/impact-estimator", description: "Explore potential value" },
  { name: "Trust Center", href: "/trust", description: "Security & compliance" },
  { name: "Blog", href: "/blog", description: "Insights and updates" },
];

const navigation = [
  { name: "Products", href: "/products", hasDropdown: true, dropdownType: "products" },
  { name: "Resources", href: "/resources", hasDropdown: true, dropdownType: "resources" },
  { name: "Technology", href: "/technology" },
  { name: "Company", href: "/company" },
  { name: "Contact", href: "/contact" },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 nav-header backdrop-blur-md border-b border-[var(--border)]">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-white rounded-lg p-1 shadow-lg shadow-white/10">
              <Image
                src="/images/logo.png"
                alt="True Aim Logo"
                width={36}
                height={36}
                className="object-contain"
                priority
                unoptimized
              />
            </div>
            <span className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              True <span className="text-[var(--primary)]">AI</span>m
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => item.dropdownType === "products" ? setProductsOpen(true) : setResourcesOpen(true)}
                    onMouseLeave={() => item.dropdownType === "products" ? setProductsOpen(false) : setResourcesOpen(false)}
                  >
                    <button
                      className="flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors font-medium"
                    >
                      {item.name}
                      <ChevronDown className={cn(
                        "w-4 h-4 transition-transform",
                        (item.dropdownType === "products" ? productsOpen : resourcesOpen) && "rotate-180"
                      )} />
                    </button>

                    {/* Products Dropdown */}
                    {item.dropdownType === "products" && (
                      <div className={cn(
                        "absolute top-full left-0 pt-2 transition-all duration-200",
                        productsOpen ? "opacity-100 visible" : "opacity-0 invisible"
                      )}>
                        <div className="nav-dropdown backdrop-blur-xl border border-[var(--border)] rounded-xl shadow-2xl p-2 min-w-[220px]">
                          {products.map((product) => (
                            <Link
                              key={product.name}
                              href={product.href}
                              className="block px-4 py-3 rounded-lg hover:bg-[var(--primary-light)] transition-colors"
                            >
                              <div className="font-medium text-[var(--text-primary)]">
                                {product.name}
                              </div>
                              <div className="text-sm text-[var(--text-muted)]">
                                {product.description}
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
                        resourcesOpen ? "opacity-100 visible" : "opacity-0 invisible"
                      )}>
                        <div className="nav-dropdown backdrop-blur-xl border border-[var(--border)] rounded-xl shadow-2xl p-2 min-w-[240px]">
                          {resources.map((resource) => (
                            <Link
                              key={resource.name}
                              href={resource.href}
                              className="block px-4 py-3 rounded-lg hover:bg-[var(--primary-light)] transition-colors"
                            >
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-[var(--text-primary)]">
                                  {resource.name}
                                </span>
                              </div>
                              <div className="text-sm text-[var(--text-muted)]">
                                {resource.description}
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
                    className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button & Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-all shadow-lg shadow-[var(--primary)]/30 hover:shadow-[var(--primary)]/50"
            >
              Book a Demo
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
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
          mobileMenuOpen ? "max-h-[500px] pt-4" : "max-h-0"
        )}>
          <div className="flex flex-col gap-2 pb-4">
            {/* Products Section */}
            <div className="py-2">
              <div className="text-sm font-medium text-[var(--text-muted)] px-2 mb-2">
                Products
              </div>
              {products.map((product) => (
                <Link
                  key={product.name}
                  href={product.href}
                  className="block px-4 py-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--primary-light)] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {product.name}
                </Link>
              ))}
            </div>

            {/* Resources Section */}
            <div className="py-2 border-t border-[var(--border)]">
              <div className="text-sm font-medium text-[var(--text-muted)] px-2 mb-2">
                Resources
              </div>
              {resources.map((resource) => (
                <Link
                  key={resource.name}
                  href={resource.href}
                  className="block px-4 py-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--primary-light)] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {resource.name}
                </Link>
              ))}
            </div>

            {/* Other Links */}
            <div className="py-2 border-t border-[var(--border)]">
              {navigation.filter(n => !n.hasDropdown).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--primary-light)] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Theme Toggle & CTA */}
            <div className="flex items-center gap-3 mt-2">
              <ThemeToggle />
              <Link
                href="/contact"
                className="flex-1 inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-all shadow-lg shadow-[var(--primary)]/30"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book a Demo
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
