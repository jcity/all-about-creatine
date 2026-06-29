import { BuyButton } from "@/components/affiliate/AffiliateLink";
import { ProductThumb } from "@/components/product/ProductThumb";
import { StarRating } from "@/components/ui/StarRating";

interface InlineAffiliateCTAProps {
  label?: string;
  name: string;
  rating: number;
  meta?: string;
  href: string;
  retailer?: string;
  image?: string;
  /** Per-instance disclosure shown beneath the strip (G2). */
  note?: string;
}

/**
 * In-article product strip placed where a recommendation is relevant
 * (REDESIGN_SPEC §3.15), with its own small disclosure.
 */
export function InlineAffiliateCTA({
  label = "Editor's choice · Best overall",
  name,
  rating,
  meta,
  href,
  retailer = "Amazon",
  image,
  note = "We may earn a commission if you buy through this link, at no extra cost to you. It never affects our recommendations.",
}: InlineAffiliateCTAProps) {
  return (
    <>
      <div className="inline-cta not-prose">
        <span className="pthumb">
          <ProductThumb image={image} name={name} size={60} />
        </span>
        <div className="ic-info">
          <span className="lbl">{label}</span>
          <b>{name}</b>
          <span className="stars">
            <StarRating rating={rating} />{" "}
            {meta && <span>{meta}</span>}
          </span>
        </div>
        <BuyButton
          href={href}
          retailer={retailer}
          label="Check price"
          productName={name}
        />
      </div>
      <p className="disc-inline not-prose">{note}</p>
    </>
  );
}
