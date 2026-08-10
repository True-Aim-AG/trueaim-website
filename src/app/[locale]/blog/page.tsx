import { Link } from "@/i18n/navigation";
import { ArrowRight, BookOpen, Calendar, Clock, Gavel, Shield, Scale, BarChart3 } from "lucide-react";
import { EnglishOnlyBanner } from "@/components/layout/EnglishOnlyBanner";
import { blogPosts } from "@/lib/blog-posts";

const iconBySlug: Record<string, typeof BarChart3> = {
  "ai-claims-handling-eu-ai-act-high-risk": Gavel,
  "why-claims-ai-pilots-stall": BarChart3,
  "auditability-evidence-chains": Shield,
  "build-vs-buy-idp-vendors": Scale,
};

export default function BlogPage() {
  const featuredPost = blogPosts.find((post) => post.featured);
  const otherPosts = blogPosts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen">
      <EnglishOnlyBanner />
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/20 text-[var(--primary)] text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            Insights & Technical Deep Dives
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
            Blog
          </h1>

          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Exploring AI, automation, regulation and the practical challenges of operating in regulated industries.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider mb-6">
              Featured Article
            </h2>

            <Link href={`/blog/${featuredPost.slug}`} className="block group">
              <article className="glass-panel p-8 hover:border-[var(--primary)]/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--primary)]/20 text-[var(--primary)] text-sm font-medium">
                    {(() => {
                      const Icon = iconBySlug[featuredPost.slug] ?? BookOpen;
                      return <Icon className="w-4 h-4" />;
                    })()}
                    {featuredPost.category}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4 group-hover:text-[var(--primary)] transition-colors">
                  {featuredPost.title}
                </h3>

                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  {featuredPost.excerpt}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.displayDate}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-2 text-[var(--primary)] font-medium group-hover:gap-3 transition-all">
                    Read Article
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-[var(--border)]">
                  {featuredPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded bg-[var(--subtle-bg)] text-[var(--text-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Link>
          </div>
        </section>
      )}

      {/* Other Posts */}
      {otherPosts.length > 0 && (
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider mb-6">
              All Articles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block group"
                >
                  <article className="glass-panel p-6 h-full hover:border-[var(--primary)]/50 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-[var(--primary)]/20 text-[var(--primary)] text-xs font-medium">
                        {(() => {
                          const Icon = iconBySlug[post.slug] ?? BookOpen;
                          return <Icon className="w-3 h-3" />;
                        })()}
                        {post.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3 group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                      <span>{post.displayDate}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Topics Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] mb-8 text-center">
            <span className="block">Topics We Cover</span>
            <span className="block text-base font-normal opacity-70 mt-2">(and more)</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel-light p-6">
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">
                Auditable AI
              </h3>
              <p className="text-sm text-[var(--text-muted)]">
                How to build AI systems that can be explained, traced and
                defended in regulated environments.
              </p>
            </div>

            <div className="glass-panel-light p-6">
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">
                Claims Automation
              </h3>
              <p className="text-sm text-[var(--text-muted)]">
                Best practices for automating insurance claims while maintaining
                quality and compliance.
              </p>
            </div>

            <div className="glass-panel-light p-6">
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">
                Regulatory Compliance
              </h3>
              <p className="text-sm text-[var(--text-muted)]">
                Navigating FINMA, EU AI Act, and other regulatory requirements
                for AI in insurance.
              </p>
            </div>

            <div className="glass-panel-light p-6">
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">
                Technical Architecture
              </h3>
              <p className="text-sm text-[var(--text-muted)]">
                Deep dives into hybrid AI architectures, document processing
                and decision systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-900 to-[var(--background)]">
        <div className="max-w-2xl mx-auto text-center">
          <BookOpen className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
            Want More Insights?
          </h2>
          <p className="text-[var(--text-secondary)] mb-8">
            Get in touch to discuss how auditable AI can work for your
            organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors text-lg"
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
      </section>
    </div>
  );
}
