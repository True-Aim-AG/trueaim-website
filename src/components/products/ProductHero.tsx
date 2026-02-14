import { Link } from "@/i18n/navigation";
import { MotionDiv } from "@/components/ui/MotionDiv";
import { ArrowRight } from "lucide-react";
import { type ReactNode } from "react";

interface ProductHeroCTA {
  label: string;
  href: string;
}

interface ProductHeroProps {
  badge: string;
  badgeIcon?: ReactNode;
  headline: string;
  description: string;
  supportingText?: string;
  primaryCTA: ProductHeroCTA;
  secondaryCTA?: ProductHeroCTA;
  badgeClassName?: string;
  primaryCTAClassName?: string;
}

export function ProductHero({
  badge,
  badgeIcon,
  headline,
  description,
  supportingText,
  primaryCTA,
  secondaryCTA,
  badgeClassName = "bg-[var(--primary)]/20 text-[var(--primary)]",
  primaryCTAClassName = "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] shadow-lg shadow-[var(--primary)]/30",
}: ProductHeroProps) {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-[820px] mx-auto text-center"
        >
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${badgeClassName}`}
          >
            {badgeIcon}
            {badge}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
            {headline}
          </h1>

          <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-4 leading-relaxed">
            {description}
          </p>

          {supportingText && (
            <p className="text-base text-[var(--text-muted)] mb-8 leading-relaxed">
              {supportingText}
            </p>
          )}

          <div className={`flex justify-center gap-4 flex-col sm:flex-row ${!supportingText ? "mt-8" : ""}`}>
            <Link
              href={primaryCTA.href}
              className={`inline-flex items-center justify-center px-8 py-4 rounded-lg font-medium transition-colors text-lg ${primaryCTAClassName}`}
            >
              {primaryCTA.label}
            </Link>
            {secondaryCTA && (
              <Link
                href={secondaryCTA.href}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-[var(--border)] text-[var(--text-primary)] font-medium hover:bg-[var(--primary-light)] transition-colors text-lg"
              >
                {secondaryCTA.label}
                <ArrowRight className="w-5 h-5" />
              </Link>
            )}
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}
