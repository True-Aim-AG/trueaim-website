import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

/**
 * Pill buttons (Button text style + radius 40). Hover → Blue 700, active → Blue 800, focus ring Blue 300.
 * Primary: True Aim Blue fill. Secondary: 1.5px True Aim Blue outline. Ghost: text only.
 */
export type ButtonVariant = "primary" | "secondary" | "ghost" | "on-dark";
export type ButtonSize = "sm" | "md" | "lg";

export const buttonClasses = (variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) =>
  cn(
    "inline-flex items-center justify-center gap-2 rounded-pill font-body font-medium leading-[1.1] whitespace-nowrap",
    "transition-[background-color,color,border-color,box-shadow] duration-150 ease-brand",
    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-focus",
    "disabled:pointer-events-none disabled:opacity-50",
    size === "sm" && "px-5 py-2.5 text-sm",
    size === "md" && "px-7 py-3.5 text-base",
    size === "lg" && "px-8 py-4 text-base",
    variant === "primary" && "bg-ta-blue text-on-brand hover:bg-ta-blue-700 active:bg-ta-blue-800",
    variant === "secondary" && "border-[1.5px] border-ta-blue text-ta-blue hover:bg-accent-soft active:bg-ta-blue-200",
    variant === "ghost" && "text-ta-blue hover:bg-accent-soft active:bg-ta-blue-200",
    variant === "on-dark" && "border-[1.5px] border-light-blue text-light-blue hover:bg-accent-soft active:bg-accent-soft",
    className,
  );

type LinkHref = ComponentProps<typeof Link>["href"];

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

type ButtonLinkProps = BaseProps & { href: LinkHref; external?: boolean; onClick?: () => void; target?: string; rel?: string };
type ButtonButtonProps = BaseProps & Omit<ComponentProps<"button">, "className" | "children">;

export function ButtonLink({ variant, size, className, children, href, external, target, rel, onClick }: ButtonLinkProps) {
  const classes = buttonClasses(variant, size, className);
  if (external || typeof href === "string" && /^(https?:|mailto:|tel:)/.test(href)) {
    return (
      <a href={href as string} className={classes} target={target} rel={rel} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
}

export function Button({ variant, size, className, children, type = "button", ...rest }: ButtonButtonProps) {
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
