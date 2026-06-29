import { BuyButton } from "@/components/affiliate/AffiliateLink";

interface StickyMobileCTAProps {
  name: string;
  sub?: string;
  href: string;
  retailer?: string;
}

/**
 * Fixed bottom bar on mobile for listicle + review pages (REDESIGN_SPEC §3.17).
 * Hidden ≥760px via CSS; the `.sticky-cta` selector also adds body bottom pad.
 */
export function StickyMobileCTA({ name, sub, href, retailer }: StickyMobileCTAProps) {
  return (
    <div className="sticky-cta">
      <div className="sc-info">
        <b>{name}</b>
        {sub && <small>{sub}</small>}
      </div>
      <BuyButton href={href} retailer={retailer} productName={name} />
    </div>
  );
}
