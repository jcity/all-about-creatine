import { Icon } from "@/components/ui/Icons";

interface AffiliateLinkProps {
  href: string;
  children: React.ReactNode;
  retailer?: string;
  className?: string;
  "aria-label"?: string;
}

export function AffiliateLink({
  href,
  children,
  retailer,
  className,
  "aria-label": ariaLabel,
}: AffiliateLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow sponsored noopener"
      className={className}
      data-retailer={retailer}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}

interface BuyButtonProps {
  href: string;
  retailer?: string;
  label?: string;
  /** "lg" renders the larger in-card CTA. */
  size?: "sm" | "md" | "lg";
  className?: string;
  productName?: string;
}

/**
 * The amber "Check price" affiliate CTA — the ONLY place amber appears (G3).
 */
export function BuyButton({
  href,
  retailer,
  label = "Check price",
  size = "md",
  className,
  productName,
}: BuyButtonProps) {
  const aria = productName
    ? `${label}${retailer ? ` on ${retailer}` : ""} — ${productName} (opens in a new tab)`
    : `${label}${retailer ? ` on ${retailer}` : ""} (opens in a new tab)`;

  return (
    <AffiliateLink
      href={href}
      retailer={retailer}
      aria-label={aria}
      className={`btn-amz${size === "lg" ? " lg" : ""}${className ? ` ${className}` : ""}`}
    >
      {label}
      {retailer ? ` on ${retailer}` : ""}
      <Icon name="external" />
    </AffiliateLink>
  );
}
