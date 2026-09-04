import { Link } from "@/i18n/navigation";
import { ArrowRight, BookOpen, Calendar, Clock, Gavel, Shield, Scale, BarChart3 } from "lucide-react";
import { EnglishOnlyBanner } from "@/components/layout/EnglishOnlyBanner";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { ButtonLink } from "@/components/brand/Button";
import { GridPattern } from "@/components/brand/GridPattern";
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
      <section className="relative overflow-hidden">
        <GridPattern className="absolute right-0 top-0 hidden h-[600px] w-[746px] lg:block" />
        <div className="relative max-w-4xl mx-auto text-center px-6 pt-20 md:pt-28 pb-16">
          <Eyebrow className="mb-4">Insights &amp; Technical Deep Dives</Eyebrow>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-strong mb-6">
            Blog
          </h1>

          <p className="text-lede text-body max-w-2xl mx-auto">
            Exploring AI, automation, regulation and the practical challenges of operating in regulated industries.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <Eyebrow className="mb-6">Featured Article</Eyebrow>

            <Link href={`/blog/${featuredPost.slug}`} className="block group">
              <article className="bg-card shadow-card rounded-pill p-8 transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-swatch">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center gap-2 rounded-pill bg-accent-soft text-accent px-3 py-1 text-sm font-medium">
                    {(() => {
                      const Icon = iconBySlug[featuredPost.slug] ?? BookOpen;
                      return <Icon className="w-4 h-4" strokeWidth={1.5} />;
                    })()}
                    {featuredPost.category}
                  </span>
                </div>

                <h3 className="font-display text-2xl md:text-3xl font-bold text-strong mb-4">
                  {featuredPost.title}
                </h3>

                <p className="text-body leading-relaxed mb-6">
                  {featuredPost.excerpt}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-sm text-subtle">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" strokeWidth={1.5} />
                      {featuredPost.displayDate}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" strokeWidth={1.5} />
                      {featuredPost.readTime}
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-2 text-link font-medium">
                    Read Article
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-hairline">
                  {featuredPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-pill bg-accent-soft text-accent"
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
            <Eyebrow className="mb-6">All Articles</Eyebrow>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block group"
                >
                  <article className="bg-card shadow-card rounded-pill p-8 h-full transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-swatch">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 rounded-pill bg-accent-soft text-accent px-3 py-1 text-xs font-medium">
                        {(() => {
                          const Icon = iconBySlug[post.slug] ?? BookOpen;
                          return <Icon className="w-3 h-3" strokeWidth={1.5} />;
                        })()}
                        {post.category}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-strong mb-3 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-sm text-body leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-subtle">
                      <span>{post.displayDate}</span>
                      <span>&middot;</span>
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
          <h2 className="font-display text-2xl font-bold text-strong mb-8 text-center">
            <span className="block">Topics We Cover</span>
            <span className="block text-base font-normal text-muted mt-2">(and more)</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card shadow-card rounded-pill p-6">
              <h3 className="font-display font-semibold text-strong mb-2">
                Auditable AI
              </h3>
              <p className="text-sm text-muted">
                How to build AI systems that can be explained, traced and
                defended in regulated environments.
              </p>
            </div>

            <div className="bg-card shadow-card rounded-pill p-6">
              <h3 className="font-display font-semibold text-strong mb-2">
                Claims Automation
              </h3>
              <p className="text-sm text-muted">
                Best practices for automating insurance claims while maintaining
                quality and compliance.
              </p>
            </div>

            <div className="bg-card shadow-card rounded-pill p-6">
              <h3 className="font-display font-semibold text-strong mb-2">
                Regulatory Compliance
              </h3>
              <p className="text-sm text-muted">
                Navigating FINMA, EU AI Act, and other regulatory requirements
                for AI in insurance.
              </p>
            </div>

            <div className="bg-card shadow-card rounded-pill p-6">
              <h3 className="font-display font-semibold text-strong mb-2">
                Technical Architecture
              </h3>
              <p className="text-sm text-muted">
                Deep dives into hybrid AI architectures, document processing
                and decision systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section data-theme="dark" className="py-20 px-6 bg-page-tint">
        <div className="max-w-2xl mx-auto text-center">
          <BookOpen className="w-12 h-12 text-muted mx-auto mb-6" strokeWidth={1.5} />
          <h2 className="font-display text-2xl md:text-3xl font-bold text-strong mb-4">
            Want More Insights?
          </h2>
          <p className="text-body mb-8">
            Get in touch to discuss how auditable AI can work for your
            organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ButtonLink href="/contact" variant="primary" size="lg">
              Get in Touch
              <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
            </ButtonLink>
            <ButtonLink href="/case-studies" variant="on-dark" size="lg">
              View Case Studies
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
