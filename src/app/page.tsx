import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-[var(--background-secondary)] to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
            Neuro-Symbolic AI for
            <br />
            <span className="text-[var(--primary)]">Auditable Claims Decisions</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-10 leading-relaxed">
            Combine the adaptability of agentic AI with the precision of deterministic logic. 
            Deliver compliant, explainable decisions at scale—every outcome traceable to the source.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[#d01a7d] transition-colors text-lg"
            >
              Request a Demo
            </Link>
            <Link
              href="/technology"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-[var(--border)] text-[var(--text-primary)] font-medium hover:bg-[var(--background-secondary)] transition-colors text-lg"
            >
              See How It Works
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Placeholder for other sections */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[var(--text-muted)]">
            Additional sections will be added here: Trust Bar, Value Props, Products Grid, How It Works, Differentiator, and CTA.
          </p>
        </div>
      </section>
    </div>
  );
}
