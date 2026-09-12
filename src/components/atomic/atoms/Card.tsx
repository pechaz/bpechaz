interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = false }: CardProps) {
  const hoverStyles = hover
    ? "transition-all duration-200 hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 hover:border-[var(--border-hover)]"
    : "";

  return (
    <div
      className={`rounded-xl border border-[var(--border)] bg-[var(--card-background)] p-6 shadow-[var(--shadow-sm)] ${hoverStyles} ${className}`}
    >
      {children}
    </div>
  );
}
