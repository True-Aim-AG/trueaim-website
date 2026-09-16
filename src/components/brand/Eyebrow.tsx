import { cn } from "@/lib/utils";

/** Caption-style eyebrow label: IBM Plex Sans Medium, uppercase, +16% tracking. */
export function Eyebrow({ children, className, as: Tag = "p" }: { children: React.ReactNode; className?: string; as?: "p" | "span" | "div" }) {
  return <Tag className={cn("text-caption-sm text-subtle", className)}>{children}</Tag>;
}
