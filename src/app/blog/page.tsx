import Link from "next/link";
import { ArrowRight, BookOpen, Bell } from "lucide-react";

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/20 text-[var(--primary)] text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            Insights & Updates
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
            Blog
            <br />
            <span className="text-[var(--primary)]">Coming Soon</span>
          </h1>

          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed mb-12">
            We&apos;re preparing insights on auditable AI, claims automation, and the future of insurance technology. Check back soon for articles, case studies, and industry perspectives.
          </p>

          {/* Coming Soon Card */}
          <div className="glass-panel p-8 md:p-12 max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-[var(--primary)]/20 flex items-center justify-center mx-auto mb-6">
              <Bell className="w-8 h-8 text-[var(--primary)]" />
            </div>

            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
              Stay Updated
            </h2>

            <p className="text-[var(--text-secondary)] mb-8">
              Want to be notified when we publish new content? Get in touch and we&apos;ll keep you informed about our latest insights and product updates.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors text-lg shadow-lg shadow-[var(--primary)]/30"
              >
                Get in Touch
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-[var(--border)] text-[var(--text-primary)] font-medium hover:bg-[var(--primary-light)] transition-colors text-lg"
              >
                View Case Studies
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Topics Preview */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] mb-8 text-center">
            Topics We&apos;ll Cover
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel-light p-6">
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">Auditable AI</h3>
              <p className="text-sm text-[var(--text-muted)]">
                How to build AI systems that can be explained, traced, and defended in regulated environments.
              </p>
            </div>

            <div className="glass-panel-light p-6">
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">Claims Automation</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Best practices for automating insurance claims while maintaining quality and compliance.
              </p>
            </div>

            <div className="glass-panel-light p-6">
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">EU AI Act</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Navigating regulatory requirements and building AI systems that are compliant by design.
              </p>
            </div>

            <div className="glass-panel-light p-6">
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">Industry Insights</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Trends, challenges, and opportunities in insurance technology and digital transformation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
