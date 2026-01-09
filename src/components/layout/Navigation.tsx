"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const products = [
  { name: "MIRA", href: "/products/mira", description: "Decisioning Engine" },
  { name: "ContextBuilder", href: "/products/contextbuilder", description: "Document Pipeline" },
  { name: "ClaimEval", href: "/products/claimeval", description: "Quality Assurance" },
];

const navigation = [
  { name: "Products", href: "/products", hasDropdown: true },
  { name: "Technology", href: "/technology" },
  { name: "Company", href: "/company" },
  { name: "Contact", href: "/contact" },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[var(--border)]">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              TrueAim<span className="text-[var(--primary)]">.ai</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setProductsOpen(true)}
                    onMouseLeave={() => setProductsOpen(false)}
                  >
                    <button
                      className="flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors font-medium"
                    >
                      {item.name}
                      <ChevronDown className={cn(
                        "w-4 h-4 transition-transform",
                        productsOpen && "rotate-180"
                      )} />
                    </button>
                    
                    {/* Dropdown */}
                    <div className={cn(
                      "absolute top-full left-0 pt-2 transition-all duration-200",
                      productsOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    )}>
                      <div className="bg-white rounded-lg shadow-lg border border-[var(--border)] p-2 min-w-[220px]">
                        {products.map((product) => (
                          <Link
                            key={product.name}
                            href={product.href}
                            className="block px-4 py-3 rounded-md hover:bg-[var(--background-secondary)] transition-colors"
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

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[#d01a7d] transition-colors"
            >
              Request Demo
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 text-[var(--text-secondary)]"
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
          mobileMenuOpen ? "max-h-96 pt-4" : "max-h-0"
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
                  className="block px-4 py-2 rounded-md text-[var(--text-secondary)] hover:bg-[var(--background-secondary)] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {product.name}
                </Link>
              ))}
            </div>
            
            {/* Other Links */}
            {navigation.filter(n => !n.hasDropdown).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-2 rounded-md text-[var(--text-secondary)] hover:bg-[var(--background-secondary)] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile CTA */}
            <Link
              href="/contact"
              className="mt-2 inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[#d01a7d] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Request Demo
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
