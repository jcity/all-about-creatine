import { cn } from "@/lib/utils";

interface AffiliateLinkProps {
  href: string;
  children: React.ReactNode;
  retailer?: string;
  className?: string;
}

export function AffiliateLink({ href, children, retailer, className }: AffiliateLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow sponsored noopener"
      className={className}
      data-retailer={retailer}
    >
      {children}
    </a>
  );
}

interface BuyButtonProps {
  href: string;
  retailer?: string;
  label?: string;
  variant?: "primary" | "accent";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const buttonSizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export function BuyButton({
  href,
  retailer,
  label = "Check Price",
  variant = "accent",
  size = "md",
  className,
}: BuyButtonProps) {
  return (
    <AffiliateLink
      href={href}
      retailer={retailer}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-semibold transition-colors",
        variant === "accent"
          ? "bg-accent-600 text-white hover:bg-accent-700"
          : "bg-primary-600 text-white hover:bg-primary-700",
        buttonSizes[size],
        className
      )}
    >
      {label}
      {retailer && (
        <span className="ml-1.5 text-xs font-normal opacity-80">on {retailer}</span>
      )}
    </AffiliateLink>
  );
}
