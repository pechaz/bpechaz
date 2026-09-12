import Link from "next/link";
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "sm";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[var(--accent-primary)] text-[var(--accent-primary-foreground)] hover:bg-[var(--accent-primary-hover)] border border-transparent",
  secondary:
    "bg-transparent text-[var(--foreground)] border-2 border-[var(--border-hover)] hover:bg-[var(--hover-bg)]",
  ghost:
    "bg-transparent text-[var(--foreground)] border border-transparent hover:bg-[var(--hover-bg)]",
};

const sizeClasses: Record<Size, string> = {
  md: "px-6 py-3 text-base",
  sm: "px-3 py-2 text-sm",
};

function baseClass(variant: Variant, size: Size, className: string) {
  return [
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-150",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
    "disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={baseClass(variant, size, className)}
      {...props}
    />
  );
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: Variant;
  size?: Size;
  external?: boolean;
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className = "",
  external = false,
  ...props
}: ButtonLinkProps) {
  const classes = baseClass(variant, size, className);

  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={classes}
        target={external || href.startsWith("http") ? "_blank" : undefined}
        rel={
          external || href.startsWith("http")
            ? "noopener noreferrer"
            : undefined
        }
        {...props}
      />
    );
  }

  return <Link href={href} className={classes} {...props} />;
}
