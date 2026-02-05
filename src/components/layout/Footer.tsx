import Link from "next/link";
import { Linkedin, Github } from "lucide-react";

const footerLinks = {
  company: [
    { name: "About", href: "/company" },
    { name: "Contact", href: "/contact" },
  ],
  products: [
    { name: "MIRA", href: "/products/mira" },
    { name: "ContextBuilder", href: "/products/contextbuilder" },
    { name: "ClaimEval", href: "/products/claimeval" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "PAIA Manual", href: "/paia" },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--border)]">
      {/* Glass overlay */}
      <div className="absolute inset-0 footer-overlay backdrop-blur-sm" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <img
                src="/images/logo.png"
                alt="True Aim Logo"
                className="h-12 w-auto"
              />
              <span className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                True <span className="text-[var(--primary)]">AI</span>m
              </span>
            </Link>
            <p className="text-[var(--text-muted)] text-sm mb-4">
              Swiss Precision. Auditable AI.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/Fr3nn3r"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-[var(--text-primary)]">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-[var(--text-primary)]">
              Products
            </h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-[var(--text-primary)]">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--border)]">
          <p className="text-[var(--text-muted)] text-sm text-center">
            © {new Date().getFullYear()} True Aim. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
