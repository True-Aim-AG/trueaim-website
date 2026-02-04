import Link from "next/link";
import { ArrowRight, Building2, Network, Globe, Handshake } from "lucide-react";

export default function YarowaPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
            <Building2 className="w-4 h-4" />
            Strategic Partner
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
            Yarowa AG
            <br />
            <span className="text-[var(--primary)]">Strategic Partner</span>
          </h1>

          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
            Yarowa AG is a Swiss InsurTech platform with enterprise distribution and 100+ insurer relationships. Together, we bring auditable AI to the insurance industry at scale.
          </p>
        </div>
      </section>

      {/* Partnership Value */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-12 text-center">
            Partnership Strengths
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-panel glass-panel-hover p-8">
              <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6">
                <Network className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                Direct Insurer Distribution
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Access to an established network of 100+ insurer relationships across Switzerland and Europe. Not just introductions &ndash; a proven distribution channel for enterprise software.
              </p>
            </div>

            <div className="glass-panel glass-panel-hover p-8">
              <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6">
                <Building2 className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                Enterprise Delivery Playbook
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Yarowa brings a battle-tested enterprise delivery methodology. From procurement through implementation, their playbook accelerates time-to-value for insurer clients.
              </p>
            </div>

            <div className="glass-panel glass-panel-hover p-8">
              <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6">
                <Globe className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                Swiss InsurTech Platform
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                A Swiss-based technology platform purpose-built for the insurance industry. Yarowa&apos;s infrastructure and market knowledge complement TrueAim.ai&apos;s decisioning capabilities.
              </p>
            </div>

            <div className="glass-panel glass-panel-hover p-8">
              <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6">
                <Handshake className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                Aligned Vision
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Both TrueAim.ai and Yarowa share the conviction that insurance needs transparent, auditable technology. This strategic alignment drives our joint go-to-market approach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-panel p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              See Our Products in Action
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-10">
              Discover how the TrueAim.ai and Yarowa partnership delivers auditable claims automation to insurers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products/mira"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors text-lg shadow-lg shadow-[var(--primary)]/30"
              >
                Learn About Our Products
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-[var(--border)] text-[var(--text-primary)] font-medium hover:bg-[var(--primary-light)] transition-colors text-lg"
              >
                Book a Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
