import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PAIA Manual",
  description:
    "TrueAim AG PAIA manual. Promotion of Access to Information Act compliance documentation for TrueAim AG.",
  alternates: {
    canonical: "https://trueaim.ai/paia",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PAIALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
