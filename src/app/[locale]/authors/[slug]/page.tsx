import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Linkedin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { authors, findAuthor } from "@/data/authors";
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
 * An author page: the person's name, role and bio from the About page copy, a portrait
 * on the right, and the LinkedIn profile. Reached from an article byline only.
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
      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[minmax(0,1fr)_280px] md:items-start">
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-accent">
              {t("authors.eyebrow")} · {jobTitle}
            </p>
            <h1 className="mt-3 font-display text-[40px] font-bold leading-[1.1] text-strong md:text-[56px]">{name}</h1>
            <p className="mt-6 max-w-2xl text-body leading-[1.6] text-muted">{t(`team.members.${author.key}.bio`)}</p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
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
          <Image
            src={author.image}
            alt={name}
            width={280}
            height={280}
            priority
            className="order-first h-56 w-56 bg-lilac object-cover md:order-none md:h-[280px] md:w-[280px] md:justify-self-end"
          />
        </div>
      </section>
    </>
  );
}
