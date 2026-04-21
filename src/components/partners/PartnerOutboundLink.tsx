"use client";

import { trackOutboundClick } from "@/lib/tracking/outbound";

type Props = {
  href: string;
  label: string;
  className?: string;
  children: React.ReactNode;
};

export function PartnerOutboundLink({ href, label, className, children }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackOutboundClick(href, label)}
    >
      {children}
    </a>
  );
}
