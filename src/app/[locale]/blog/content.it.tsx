import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { ButtonLink } from "@/components/brand/Button";
import { CARD, CARD_HOVER, PageHero, SECTION, SECTION_LILAC } from "@/components/content";
import { localizedBlogPosts } from "@/lib/blog-posts";
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
  const posts = localizedBlogPosts(locale);
  const featuredPost = posts.find((post) => post.featured);
  const otherPosts = posts.filter((post) => !post.featured);

  return (
    <>
      <PageSeo locale={locale} path="/blog" template="collection" />

      <PageHero
        eyebrow="Blog"
        title="Approfondimenti e analisi tecniche"
        summary="IA, automazione, regolamentazione e le sfide pratiche di operare in settori regolamentati."
        texture={{ name: "circ", position: "88% 78%" }}
      />

      {/* Featured Post */}
      {featuredPost && (
        <section className={SECTION}>
          <div className="max-w-4xl mx-auto">
            <Eyebrow className="mb-6">In evidenza</Eyebrow>

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
                    Leggi l’articolo
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
            <Eyebrow className="mb-6">Tutti</Eyebrow>

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
                        Leggi l’articolo
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
            Volete altri approfondimenti?
          </h2>
          <p className="mt-6 max-w-[62ch] text-[18px] leading-[30px] text-body mb-8">
            Contattateci per discutere di come l’IA verificabile può funzionare nella vostra organizzazione.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <ButtonLink href="/contact" variant="primary" size="lg">
              Contattaci
            </ButtonLink>
            <ButtonLink href="/case-studies" variant="on-dark" size="lg">
              Vedi i casi studio
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
