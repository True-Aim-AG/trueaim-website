import { Link } from "@/i18n/navigation";
import { Linkedin } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Logo } from "@/components/brand/Logo";
import { CookieSettingsButton } from "@/components/layout/CookieSettingsButton";
import packageJson from "../../../package.json";

const footerLinks = {
  company: [
    { nameKey: "about" as const, href: "/about" },
    { nameKey: "contact" as const, href: "/contact" },
  ],
  resources: [
    { nameKey: "caseStudies" as const, href: "/case-studies" },
    { nameKey: "impactEstimator" as const, href: "/impact-estimator" },
    { nameKey: "trustCenter" as const, href: "/trust" },
    { nameKey: "blog" as const, href: "/blog" },
  ],
  products: [
    { nameKey: "invoiceBenchmarking" as const, href: "/platform/invoice-benchmarking" },
    { nameKey: "claimsDecisioning" as const, href: "/platform/claims-decisioning" },
    { nameKey: "damageReporting" as const, href: "/platform/damage-reporting" },
    { nameKey: "otus" as const, href: "/platform/otus" },
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

type ColumnKey = keyof typeof footerLinks;
const columns: { key: ColumnKey; titleKey: "company" | "resources" | "products" | "trust" | "legal" }[] = [
  { key: "company", titleKey: "company" },
  { key: "resources", titleKey: "resources" },
  { key: "products", titleKey: "products" },
  { key: "trust", titleKey: "trust" },
  { key: "legal", titleKey: "legal" },
];

/** Dark band footer: dark gradient surface, light logo lock-up (docs/DESIGN_SYSTEM.md §7). */
export async function Footer() {
  const t = await getTranslations("footer");
  const tCookie = await getTranslations("cookie");
  return (
    <footer data-theme="dark" className="relative bg-dark text-body">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-[1.4fr_repeat(5,1fr)]">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block" aria-label={t("logoAlt")}>
              <Logo variant="vertical-light" height={96} alt={t("logoAlt")} />
            </Link>
            <p className="mt-6 max-w-[240px] text-sm text-muted">{t("tagline")}</p>
            <a
              href="https://www.linkedin.com/company/true-aim-ag"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-pill bg-lilac text-strong transition-colors duration-150 ease-brand hover:bg-accent-soft hover:text-light-blue"
              aria-label={t("linkedin")}
            >
              <Linkedin strokeWidth={1.5} className="w-4 h-4" />
            </a>
          </div>

          {columns.map((col) => (
            <div key={col.key}>
              <h3 className="font-body text-caption-sm text-subtle mb-5">{t(col.titleKey)}</h3>
              <ul className="space-y-3">
                {footerLinks[col.key].map((link) => (
                  <li key={link.nameKey}>
                    <Link href={link.href} className="text-sm text-body transition-colors duration-150 ease-brand hover:text-strong hover:underline">
                      {t(link.nameKey)}
                    </Link>
                  </li>
                ))}
                {col.key === "legal" && (
                  <li>
                    <CookieSettingsButton label={tCookie("title")} />
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-hairline pt-8 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>{t("copyright", { year: new Date().getFullYear() })}</p>
          <p>v{packageJson.version}</p>
        </div>
      </div>
    </footer>
  );
}
