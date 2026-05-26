import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog | True Aim AG",
  description:
    "Public release history of the True Aim Platform. Features, fixes, and security improvements by release.",
  alternates: {
    canonical: "https://trueaim.ai/changelog",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ChangelogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
