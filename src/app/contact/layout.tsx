import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Request a Demo",
  description:
    "Request a demo of TrueAim.ai's neuro-symbolic AI for claims automation. Book a 30-minute discovery call to see auditable AI in action.",
  openGraph: {
    title: "Contact - Request a Demo | TrueAim.ai",
    description:
      "Request a demo of TrueAim.ai's neuro-symbolic AI for claims automation. Book a 30-minute discovery call.",
    url: "https://trueaim.ai/contact",
  },
  alternates: {
    canonical: "https://trueaim.ai/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
