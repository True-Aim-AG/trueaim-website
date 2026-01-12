import Link from "next/link";
import { Linkedin, Github } from "lucide-react";

const footerLinks = {
  company: [
    { name: "About", href: "/company" },
    { name: "Team", href: "/company#team" },
    { name: "Careers", href: "#", comingSoon: true },
    { name: "Contact", href: "/contact" },
  ],
  products: [
    { name: "MIRA", href: "/products/mira" },
    { name: "ContextBuilder", href: "/products/contextbuilder" },
    { name: "ClaimEval", href: "/products/claimeval" },
  ],
  resources: [
    { name: "Documentation", href: "#", comingSoon: true },
    { name: "Blog", href: "#", comingSoon: true },
    { name: "Whitepapers", href: "#", comingSoon: true },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[var(--text-primary)] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <img
                src="/images/logo.png"
                alt="TrueAim.ai Logo"
                className="h-12 w-auto"
              />
              <span className="text-2xl font-bold tracking-tight">
                TrueAim<span className="text-[var(--primary)]">.ai</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Swiss Precision. Auditable AI.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm inline-flex items-center gap-2"
                  >
                    {link.name}
                    {link.comingSoon && (
                      <span className="text-xs text-gray-500">(Coming Soon)</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">
              Products
            </h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm inline-flex items-center gap-2"
                  >
                    {link.name}
                    {link.comingSoon && (
                      <span className="text-xs text-gray-500">(Coming Soon)</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} TrueAim.ai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
