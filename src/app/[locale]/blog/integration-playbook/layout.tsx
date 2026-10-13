import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

const SLUG = "integration-playbook";
const PAGE_URL = `https://trueaim.ai/en/blog/${SLUG}/`;
const TITLE = "True Aim Integration Playbook";
const META_DESCRIPTION =
  "How True Aim plugs into existing landscapes, the integration patterns we use, and how a first integration unfolds in four to six weeks.";

export const metadata: Metadata = {
  title: TITLE,
  description: META_DESCRIPTION,
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  alternates: {
    canonical: PAGE_URL,
  },
};

export default async function IntegrationPlaybookLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <>{children}</>;
}
