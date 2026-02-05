import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink, Award, Shield, Landmark, Microscope } from "lucide-react";

export default function InnosuissePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/20 text-[var(--primary)] text-sm font-medium mb-6">
            <Award className="w-4 h-4" />
            Federal Innovation Partner
          </div>

          <div className="flex justify-center mb-8">
            <div className="bg-white p-4 rounded-xl">
              <Image
                src="/partners/innosuisse.png"
                alt="Innosuisse logo"
                width={340}
                height={96}
                className="object-contain"
              />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
            Innosuisse-Funded
            <br />
            <span className="text-[var(--primary)]">Innovation Partner</span>
          </h1>

          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
            True Aim&apos;s core technology is backed by Innosuisse, the Swiss Innovation Agency, through a competitive research grant - national-level validation of our approach to auditable AI.
          </p>
        </div>
      </section>

      {/* Key Points */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-panel glass-panel-hover p-8">
              <div className="w-14 h-14 rounded-xl bg-[var(--primary)]/20 flex items-center justify-center mb-6">
                <Landmark className="w-7 h-7 text-[var(--primary)]" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                Official Government Validation
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Innosuisse is the Swiss Confederation&apos;s official innovation agency, providing federal endorsement for research and development projects with commercial potential.
              </p>
            </div>

            <div className="glass-panel glass-panel-hover p-8">
              <div className="w-14 h-14 rounded-xl bg-[var(--primary)]/20 flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-[var(--primary)]" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                Competitive Excellence
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Innosuisse grants are awarded through rigorous selection criteria. Receiving funding demonstrates the technical merit and market viability of True Aim&apos;s neuro-symbolic approach.
              </p>
            </div>

            <div className="glass-panel glass-panel-hover p-8">
              <div className="w-14 h-14 rounded-xl bg-[var(--primary)]/20 flex items-center justify-center mb-6">
                <Award className="w-7 h-7 text-[var(--primary)]" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                National Strategic Priority
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                The grant reflects Switzerland&apos;s national commitment to advancing trustworthy AI in regulated industries. True Aim is at the forefront of this initiative.
              </p>
            </div>

            <div className="glass-panel glass-panel-hover p-8">
              <div className="w-14 h-14 rounded-xl bg-[var(--primary)]/20 flex items-center justify-center mb-6">
                <Microscope className="w-7 h-7 text-[var(--primary)]" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                ZHAW Collaboration
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                The research programme is conducted in partnership with ZHAW (School of Engineering, Institute of Applied IT, Centre for AI) and is led by Dr. Dandolo Flumini.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grant Details */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-panel p-8 md:p-12 text-center">
            <p className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">Research Grant</p>
            <p className="text-3xl font-bold text-[var(--primary)] mb-4">Innosuisse Research Grant</p>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
              Non-dilutive funding from the Swiss Confederation to advance neuro-symbolic AI for deterministic claims decisioning in regulated industries.
            </p>
            <div className="mt-6">
              <a
                href="https://www.innosuisse.ch"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[var(--primary)] font-medium hover:underline"
              >
                Visit Innosuisse
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-panel p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              Learn More About Our Technology
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-10">
              Discover how Innosuisse-backed research powers our claims decisioning engine.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/technology"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors text-lg shadow-lg shadow-[var(--primary)]/30"
              >
                Explore Our Technology
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
