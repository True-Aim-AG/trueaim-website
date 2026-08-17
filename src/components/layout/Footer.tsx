import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Linkedin } from "lucide-react";
import { getTranslations } from "next-intl/server";
import packageJson from "../../../package.json";

const footerLinks = {
  company: [
    { nameKey: "about" as const, href: "/company" },
    { nameKey: "contact" as const, href: "/contact" },
  ],
  resources: [
    { nameKey: "caseStudies" as const, href: "/case-studies" },
    { nameKey: "impactEstimator" as const, href: "/impact-estimator" },
    { nameKey: "trustCenter" as const, href: "/trust" },
    { nameKey: "blog" as const, href: "/blog" },
  ],
  products: [
    { nameKey: "mira" as const, href: "/products/mira" },
    { nameKey: "contextBuilder" as const, href: "/products/contextbuilder" },
    { nameKey: "claimEval" as const, href: "/products/claimeval" },
  ],
  trust: [
    { nameKey: "trustCenter" as const, href: "/trust" },
  ],
  legal: [
    { nameKey: "privacy" as const, href: "/privacy" },
    { nameKey: "terms" as const, href: "/terms" },
    { nameKey: "subProcessors" as const, href: "/sub-processors" },
    { nameKey: "cookies" as const, href: "/cookies" },
    { nameKey: "paia" as const, href: "/paia" },
    { nameKey: "aiTransparency" as const, href: "/ai-transparency" },
  ],
};

export async function Footer() {
  const t = await getTranslations("footer");
  return (
    <footer className="relative border-t border-[var(--border)]">
      {/* Glass overlay */}
      <div className="absolute inset-0 footer-overlay backdrop-blur-sm" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Link Sections */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-[var(--text-primary)]">
              {t("company")}
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.nameKey}>
                  <Link
                    href={link.href}
                    className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-sm"
                  >
                    {t(link.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-[var(--text-primary)]">
              {t("resources")}
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.nameKey}>
                  <Link
                    href={link.href}
                    className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-sm"
                  >
                    {t(link.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-[var(--text-primary)]">
              {t("products")}
            </h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.nameKey}>
                  <Link
                    href={link.href}
                    className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-sm"
                  >
                    {t(link.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust Links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-[var(--text-primary)]">
              {t("trust")}
            </h3>
            <ul className="space-y-3">
              {footerLinks.trust.map((link) => (
                <li key={link.nameKey}>
                  <Link
                    href={link.href}
                    className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-sm"
                  >
                    {t(link.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-[var(--text-primary)]">
              {t("legal")}
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.nameKey}>
                  <Link
                    href={link.href}
                    className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-sm"
                  >
                    {t(link.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Brand + Bottom Bar (centered) */}
        <div className="pt-10 border-t border-[var(--border)] flex flex-col items-center text-center gap-4">
          <Link href="/" className="inline-flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt={t("logoAlt")}
              width={48}
              height={48}
              className="h-10 w-auto object-contain"
            />
            <Image
              src="/images/wordmark.png"
              alt="True AIm"
              width={152}
              height={20}
              className="h-5 w-auto object-contain light-only"
            />
            <Image
              src="/images/wordmark-dark.png"
              alt="True AIm"
              width={152}
              height={20}
              className="h-5 w-auto object-contain dark-only"
            />
          </Link>
          <p className="text-[var(--text-muted)] text-sm">{t("tagline")}</p>
          <a
            href="https://www.linkedin.com/company/true-aim-ag"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            aria-label={t("linkedin")}
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <div className="flex flex-col items-center gap-1 mt-4">
            <p className="text-[var(--text-muted)] text-sm">
              {t("copyright", { year: new Date().getFullYear() })}
            </p>
            <p className="text-[var(--text-muted)] text-xs opacity-50">
              v{packageJson.version}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
