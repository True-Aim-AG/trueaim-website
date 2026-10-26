import { Link } from "@/i18n/navigation";
import { Linkedin } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Logo } from "@/components/brand/Logo";
import { CookieSettingsButton } from "@/components/layout/CookieSettingsButton";

// The columns mirror the navigation. The legal links include the sub-processor
// list, which the DPA requires to be reachable from the footer (REQ-SP-004).
const columns = [
  {
    titleKey: "platform",
    links: [
      { nameKey: "platformOverview", href: "/platform" },
      { nameKey: "claimsDecisioning", href: "/platform/claims-decisioning" },
      { nameKey: "invoiceBenchmarking", href: "/platform/invoice-benchmarking" },
      { nameKey: "damageReporting", href: "/platform/damage-reporting" },
      { nameKey: "otus", href: "/platform/otus" },
    ],
  },
  {
    titleKey: "resources",
    links: [
      { nameKey: "caseStudies", href: "/case-studies" },
      { nameKey: "blog", href: "/blog" },
      { nameKey: "impactEstimator", href: "/impact-estimator" },
      { nameKey: "trustCenter", href: "/trust" },
    ],
  },
  {
    titleKey: "company",
    links: [
      { nameKey: "about", href: "/about" },
      { nameKey: "partners", href: "/partners" },
      { nameKey: "contact", href: "/contact" },
    ],
  },
] as const;

const legal = [
  { nameKey: "privacy", href: "/privacy" },
  { nameKey: "terms", href: "/terms" },
  { nameKey: "cookies", href: "/cookies" },
  { nameKey: "paia", href: "/paia" },
  { nameKey: "aiTransparency", href: "/ai-transparency" },
] as const;

/**
 * Footer as the V5 prototype draws it: the dark gradient band, the logo with
 * the four lines and the LinkedIn button, three link columns, and the base
 * line with the company address and the legal links.
 */
export async function Footer() {
  const t = await getTranslations("footer");
  const tCookie = await getTranslations("cookie");
  const lines = t.raw("taglineLines") as string[];
  return (
    <footer data-theme="dark" className="relative bg-page-tint text-body">
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-16 md:pt-20">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block" aria-label={t("logoAlt")}>
              <Logo variant="horizontal-light" height={40} alt={t("logoAlt")} />
            </Link>
            <p className="mt-6 max-w-[34ch] text-[15px] font-medium leading-[1.65] text-strong">
              {lines.map((line, index) => (
                <span key={line}>
                  {line}
                  {index < lines.length - 1 && <br />}
                </span>
              ))}
            </p>
            <a
              href="https://www.linkedin.com/company/true-aim-ag"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2.5 rounded-pill border border-white/25 px-4 py-2.5 text-sm font-medium text-strong transition-colors duration-150 ease-brand hover:border-white"
            >
              <Linkedin strokeWidth={1.5} className="h-4 w-4" />
              {t("followLinkedin")}
            </a>
          </div>

          {columns.map((column) => (
            <div key={column.titleKey}>
              {/* A label, not a heading, as the prototype sets it: the page outline ends with the page's own sections. */}
              <p className="mb-[18px] font-body text-xs font-medium uppercase tracking-[0.14em] text-light-blue">
                {t(column.titleKey)}
              </p>
              <ul>
                {column.links.map((link) => (
                  <li key={link.nameKey}>
                    <Link
                      href={link.href}
                      className="block py-1.5 text-[15px] text-body transition-colors duration-150 ease-brand hover:text-strong"
                    >
                      {t(link.nameKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-white/12 pt-5 text-[13px] text-muted">
          <p>{t("copyright", { year: new Date().getFullYear() })}</p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legal.map((link) => (
              <li key={link.nameKey}>
                <Link href={link.href} className="transition-colors duration-150 ease-brand hover:text-strong">
                  {t(link.nameKey)}
                </Link>
              </li>
            ))}
            <li>
              <CookieSettingsButton label={tCookie("title")} />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
