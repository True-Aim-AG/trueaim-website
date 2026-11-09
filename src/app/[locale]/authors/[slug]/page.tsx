import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Linkedin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { authors, findAuthor } from "@/data/authors";
import { PageHero, SECTION } from "@/components/content";
import { PageSeo } from "@/components/seo/PageSeo";
import { pageMetadata } from "@/lib/seo/metadata";

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
 * An author page, reached from an article byline: the standard compact hero with the
 * person's name and role and the portrait in the second column, then the About page
 * bio with the LinkedIn profile, the blog and the team below it.
 */
export default async function AuthorPage({ params }: Props) {
  const { locale, slug } = await params;
  const author = findAuthor(slug);
  if (!author) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("company");
  const name = t(`team.members.${author.key}.name`);
  const jobTitle = t(`team.members.${author.key}.title`);
  const path = `/authors/${author.slug}`;

  return (
    <>
      <PageSeo
        locale={locale}
        path={path}
        template="person"
        person={{ name, jobTitle, image: author.image, sameAs: [author.linkedin] }}
      />
      <PageHero
        compact
        eyebrow={t("authors.eyebrow")}
        title={name}
        summary={jobTitle}
        texture={{ name: "circ", position: "72% 18%" }}
        visualWidth={320}
        visual={
          <Image
            src={author.image}
            alt={name}
            width={320}
            height={320}
            priority
            className="h-auto w-full bg-lilac object-cover shadow-[var(--shadow-card)]"
          />
        }
      />
      <section className={SECTION}>
        <div className="mx-auto max-w-7xl">
          <p className="max-w-[72ch] text-[18px] leading-[1.6] text-body md:text-[20px] md:leading-[1.5]">
            {t(`team.members.${author.key}.bio`)}
          </p>
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            <a href={author.linkedin} target="_blank" rel="noopener noreferrer" className={LINK}>
              <Linkedin strokeWidth={1.5} className="h-4 w-4" />
              {t("team.linkedin")}
            </a>
            <Link href="/blog" className={LINK}>
              {t("authors.blogLink")}
              <ArrowRight strokeWidth={1.5} className="h-4 w-4" />
            </Link>
            <Link href="/about" className={LINK}>
              {t("authors.teamLink")}
              <ArrowRight strokeWidth={1.5} className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
