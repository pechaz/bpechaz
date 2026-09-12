interface TagProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "primary" | "secondary";
}

export function Tag({
  children,
  className = "",
  variant = "default",
}: TagProps) {
  const baseStyles =
    "inline-flex items-center rounded-md px-2.5 py-0.5 text-sm font-medium";

  const variants = {
    default:
      "bg-[var(--tag-default-bg)] text-[var(--tag-default-text)]",
    primary:
      "bg-[var(--tag-primary-bg)] text-[var(--tag-primary-text)]",
    secondary:
      "bg-[var(--tag-secondary-bg)] text-[var(--tag-secondary-text)]",
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
