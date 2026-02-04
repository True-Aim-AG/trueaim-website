import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company - About TrueAim.ai",
  description:
    "Swiss precision meets auditable AI. Meet our leadership team, advisors, and partners including Yarowa AG, ZHAW, and Innosuisse. Backed by Switzerland's innovation ecosystem.",
  openGraph: {
    title: "Company - About TrueAim.ai",
    description:
      "Swiss precision meets auditable AI. Meet our leadership team, advisors, and partners. Backed by Switzerland's innovation ecosystem.",
    url: "https://trueaim.ai/company",
  },
  alternates: {
    canonical: "https://trueaim.ai/company",
  },
};

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
