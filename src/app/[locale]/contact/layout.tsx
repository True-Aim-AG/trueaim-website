import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageSeo } from "@/components/seo/PageSeo";
import { pageMetadata } from "@/lib/seo/metadata";

const PATH = "/contact";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, PATH);
}

export default async function ContactLayout({ children, params }: Props & { children: React.ReactNode }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <PageSeo locale={locale} path={PATH} template="contact" />
      {children}
    </>
  );
}
