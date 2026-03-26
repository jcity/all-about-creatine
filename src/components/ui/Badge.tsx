import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "accent";
  className?: string;
}

const variants = {
  default: "bg-surface-muted text-text-secondary",
  primary: "bg-primary-100 text-primary-700",
  accent: "bg-accent-100 text-accent-800",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
