import Link from "next/link";
import { Icon } from "@/components/ui/Icons";

interface AffiliateDisclosureProps {
  /** Override the default disclosure copy. */
  children?: React.ReactNode;
}

/**
 * Top-of-page affiliate disclosure callout — required near the top of any page
 * with affiliate links (G2/D5). Mint, teal-bordered, never hidden.
 */
export function AffiliateDisclosure({ children }: AffiliateDisclosureProps) {
  return (
    <div className="disclosure not-prose">
      <Icon name="info" />
      <div>
        {children ?? (
          <>
            <strong>Affiliate disclosure:</strong> We earn a commission if you
            buy through links on this page, at no extra cost to you. This never
            affects our scores or rankings.{" "}
            <Link href="/affiliate-disclosure">Learn more</Link>
          </>
        )}
      </div>
    </div>
  );
}
