import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { EnglishOnlyBanner } from "@/components/layout/EnglishOnlyBanner";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { ButtonLink } from "@/components/brand/Button";
import { CARD, CARD_HOVER, PageHero, SECTION, SECTION_LILAC } from "@/components/content";
import { blogPosts } from "@/lib/blog-posts";
import type { Metadata } from "next";
import { PageSeo } from "@/components/seo/PageSeo";
import { pageMetadata } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const metadata = pageMetadata(locale, "/blog");
  return { ...metadata, alternates: { ...metadata.alternates, types: { "application/rss+xml": "https://trueaim.ai/feed.xml" } } };
}

const ARTICLE = cn(CARD, CARD_HOVER, "block h-full p-8");

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const featuredPost = blogPosts.find((post) => post.featured);
  const otherPosts = blogPosts.filter((post) => !post.featured);

  return (
    <>
      <EnglishOnlyBanner />
      <PageSeo locale={locale} path="/blog" template="collection" />

      <PageHero
        eyebrow="Blog"
        title="Insights and technical deep dives"
        summary="Exploring AI, automation, regulation and the practical challenges of operating in regulated industries."
        texture={{ name: "circ", position: "88% 78%" }}
      />

      {/* Featured Post */}
      {featuredPost && (
        <section className={SECTION}>
          <div className="max-w-4xl mx-auto">
            <Eyebrow className="mb-6">Featured</Eyebrow>

            <Link href={`/blog/${featuredPost.slug}`} className={ARTICLE}>
              <article>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-strong mb-4">
                  {featuredPost.title}
                </h2>

                <p className="text-body leading-relaxed mb-6">
                  {featuredPost.excerpt}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-sm text-subtle">
                    <Clock className="w-4 h-4" strokeWidth={1.5} />
                    {featuredPost.readTime}
                  </div>

                  <span className="inline-flex items-center gap-2 text-link font-medium">
                    Read Article
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </span>
                </div>
              </article>
            </Link>
          </div>
        </section>
      )}

      {/* Other Posts */}
      {otherPosts.length > 0 && (
        <section className={SECTION_LILAC}>
          <div className="max-w-4xl mx-auto">
            <Eyebrow className="mb-6">All</Eyebrow>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className={ARTICLE}>
                  {/* The read time sits bottom left and the link bottom right on every card. */}
                  <article className="flex h-full flex-col">
                    <h2 className="font-display text-lg font-bold text-strong mb-3 line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-sm text-body leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-2 text-xs text-subtle">
                        <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
                        {post.readTime}
                      </div>
                      <span className="inline-flex items-center gap-2 text-sm text-link font-medium">
                        Read Article
                        <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section data-theme="dark" className="bg-page-tint px-6 py-20 md:py-[120px]">
        <div className="mx-auto max-w-7xl">
          <BookOpen className="w-12 h-12 text-muted mb-6" strokeWidth={1.5} />
          <h2 className="font-display text-[30px] font-bold leading-[1.15] text-strong text-balance md:text-[40px] mb-4">
            Want More Insights?
          </h2>
          <p className="mt-6 max-w-[62ch] text-[18px] leading-[30px] text-body mb-8">
            Get in touch to discuss how auditable AI can work for your
            organisation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
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
    </>
  );
}
