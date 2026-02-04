import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Partners | TrueAim.ai",
    default: "Partners",
  },
  description:
    "TrueAim's strategic partners and ecosystem. Backed by Innosuisse, ZHAW, and Yarowa AG in Switzerland's innovation ecosystem.",
};

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
