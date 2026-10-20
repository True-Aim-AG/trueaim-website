import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

/**
 * Pill buttons. Reuben's pick from the 12 October review: the primary button
 * is the blue sweep with a split arrow disc, the secondary the outline with a
 * light disc. The disc belongs to the large size used in heroes and bands;
 * small and medium buttons (navigation, forms, the cookie banner) stay plain.
 */
export type ButtonVariant = "primary" | "secondary" | "ghost" | "on-dark";
export type ButtonSize = "sm" | "md" | "lg";

export const buttonClasses = (variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) =>
  cn(
    "group inline-flex items-center justify-center rounded-pill font-body font-medium leading-[1.1] whitespace-nowrap",
    "transition-[background-color,background-image,color,box-shadow] duration-150 ease-brand",
    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-focus",
    "disabled:pointer-events-none disabled:opacity-50",
    size === "sm" && "gap-2 px-5 py-2.5 text-sm",
    size === "md" && "gap-2 px-7 py-3.5 text-base",
    size === "lg" && "gap-4 py-2 pl-7 pr-2 text-base",
    variant === "primary" &&
      "bg-[linear-gradient(100deg,var(--ta-blue-500)_0%,var(--ta-blue-600)_55%,var(--ta-blue-700)_100%)] text-on-brand shadow-swatch hover:bg-[linear-gradient(100deg,var(--ta-blue-600)_0%,var(--ta-blue-700)_60%,var(--ta-blue-800)_100%)] active:bg-[linear-gradient(100deg,var(--ta-blue-800),var(--ta-blue-800))]",
    variant === "secondary" && "text-ta-blue-700 shadow-[inset_0_0_0_1.5px_var(--ta-blue-300)] hover:bg-ta-blue-50 active:bg-ta-blue-100",
    variant === "ghost" && "text-ta-blue-700 hover:bg-ta-blue-50 active:bg-ta-blue-100",
    variant === "on-dark" && "text-on-brand shadow-[inset_0_0_0_1.5px_rgba(255,255,255,.45)] hover:bg-[rgba(255,255,255,.08)]",
    className,
  );

const DISC: Record<ButtonVariant, string> = {
  primary: "bg-ta-blue-800 text-on-brand group-hover:bg-ta-blue-900",
  secondary: "bg-ta-blue-100 text-ta-blue-700",
  ghost: "bg-ta-blue-100 text-ta-blue-700",
  "on-dark": "bg-[rgba(255,255,255,.14)] text-on-brand",
};

/** The arrow disc at the end of a large button. */
function Disc({ variant }: { variant: ButtonVariant }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors duration-150 ease-brand",
        DISC[variant],
      )}
    >
      <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
    </span>
  );
}

type LinkHref = ComponentProps<typeof Link>["href"];

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

type ButtonLinkProps = BaseProps & { href: LinkHref; external?: boolean; onClick?: () => void; target?: string; rel?: string };
type ButtonButtonProps = BaseProps & Omit<ComponentProps<"button">, "className" | "children">;

export function ButtonLink({ variant = "primary", size = "md", className, children, href, external, target, rel, onClick }: ButtonLinkProps) {
  const classes = buttonClasses(variant, size, className);
  const body = (
    <>
      {children}
      {size === "lg" && <Disc variant={variant} />}
    </>
  );
  if (external || typeof href === "string" && /^(https?:|mailto:|tel:)/.test(href)) {
    return (
      <a href={href as string} className={classes} target={target} rel={rel} onClick={onClick}>
        {body}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} onClick={onClick}>
      {body}
    </Link>
  );
}

export function Button({ variant = "primary", size = "md", className, children, type = "button", ...rest }: ButtonButtonProps) {
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...rest}>
      {children}
      {size === "lg" && <Disc variant={variant} />}
    </button>
  );
}
