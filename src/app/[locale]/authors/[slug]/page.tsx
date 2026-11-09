import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Linkedin } from "lucide-react";
import { buttonClasses } from "@/components/brand/Button";
import { Link } from "@/i18n/navigation";
import { authors, findAuthor } from "@/data/authors";
import { localizedBlogPosts } from "@/lib/blog-posts";
import { CARD, CARD_HOVER, TextureBackdrop } from "@/components/content";
import { CARD_TEXT, CARD_TITLE } from "@/components/content/surface";
import { PageSeo } from "@/components/seo/PageSeo";
import { pageMetadata } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return authors.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!findAuthor(slug)) return {};
  return pageMetadata(locale, `/authors/${slug}`);
}

const LINK = "inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline";

/**
 * An author page, reached from an article byline. A short hero on the brand texture
 * carries the name, role and portrait; below it the About page bio and a card with the
 * author's articles on the blog.
 */
export default async function AuthorPage({ params }: Props) {
  const { locale, slug } = await params;
  const author = findAuthor(slug);
  if (!author) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("company");
  const nav = await getTranslations("nav");
  const name = t(`team.members.${author.key}.name`);
  const jobTitle = t(`team.members.${author.key}.title`);
  const path = `/authors/${author.slug}`;
  const articles = localizedBlogPosts(locale).filter((post) => post.author === author.slug);

  return (
    <>
      <PageSeo
        locale={locale}
        path={path}
        template="person"
        person={{ name, jobTitle, image: author.image, sameAs: [author.linkedin] }}
      />
      <section className="relative overflow-hidden border-b border-hairline bg-page-tint">
        <TextureBackdrop texture={{ name: "circ", position: "72% 18%" }} />
        <div className="relative mx-auto flex max-w-7xl flex-col-reverse gap-8 px-6 py-12 md:flex-row md:items-center md:justify-between md:py-16">
          <div>
            <p className="mb-4 font-body text-[14px] font-medium uppercase tracking-[0.16em] text-accent">{t("authors.eyebrow")}</p>
            <h1 className="font-display text-[34px] font-bold leading-[1.15] text-strong sm:text-[40px] lg:text-[48px] lg:leading-[1.1]">{name}</h1>
            <p className="mt-3 text-[18px] leading-[1.5] text-body md:text-[20px]">{jobTitle}, True Aim</p>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              <a href={author.linkedin} target="_blank" rel="noopener noreferrer" className={LINK}>
                <Linkedin strokeWidth={1.5} className="h-4 w-4" />
                {t("team.linkedin")}
              </a>
              <Link href="/blog" className={LINK}>
                {t("authors.blogLink")}
                <ArrowRight strokeWidth={1.5} className="h-4 w-4" />
              </Link>
            </div>
          </div>
          {/* The portrait's right edge lines up with the left edge of the header's demo button: an
              invisible copy of that button (same classes, same text) reserves exactly its width. */}
          <div className="flex shrink-0 items-center">
            <Image
              src={author.image}
              alt={name}
              width={240}
              height={240}
              priority
              className="h-40 w-40 rounded-full bg-lilac object-cover md:h-60 md:w-60"
            />
            <span aria-hidden="true" className={buttonClasses("primary", "sm", "invisible hidden shrink-0 md:inline-flex")}>
              {nav("bookDemo")}
            </span>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-[26px] font-bold leading-[1.2] text-strong md:text-[32px]">{t("authors.aboutHeading", { name })}</h2>
          <p className="mt-5 max-w-[72ch] text-[17px] leading-[1.65] text-body md:text-[18px]">{t(`team.members.${author.key}.bio`)}</p>
          <Link href="/about" className={cn(LINK, "mt-6")}>
            {t("authors.teamLink")}
            <ArrowRight strokeWidth={1.5} className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {articles.length > 0 && (
        <section className="border-t border-hairline bg-page-tint py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-display text-[26px] font-bold leading-[1.2] text-strong md:text-[32px]">{t("authors.articlesHeading", { name })}</h2>
            <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((post) => (
                <li key={post.slug} className="h-full">
                  <Link href={`/blog/${post.slug}`} className={cn(CARD, CARD_HOVER, "group flex h-full flex-col p-7")}>
                    <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-accent">
                      {post.displayDate} · {post.readTime}
                    </p>
                    <h3 className={cn(CARD_TITLE, "mt-3")}>{post.title}</h3>
                    <p className={cn(CARD_TEXT, "mt-3 line-clamp-3")}>{post.excerpt}</p>
                    <ArrowRight
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className="mt-auto h-5 w-5 self-end pt-0 text-accent transition-transform duration-150 ease-brand group-hover:translate-x-1"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
