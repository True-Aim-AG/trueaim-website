import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Partners | True Aim",
    default: "Partners",
  },
  description:
    "True Aim's strategic partners and ecosystem. Backed by Innosuisse, ZHAW, and Yarowa AG in Switzerland's innovation ecosystem.",
};

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
