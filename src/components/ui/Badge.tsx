interface BadgeProps {
  children: React.ReactNode;
  /** "accent" = gold award badge; otherwise mint. */
  variant?: "default" | "primary" | "accent";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const gold = variant === "accent";
  return (
    <span className={`badge-best${gold ? "" : " alt"}${className ? ` ${className}` : ""}`}>
      {children}
    </span>
  );
}
