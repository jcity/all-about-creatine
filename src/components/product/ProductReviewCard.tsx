import { StarRating } from "@/components/ui/StarRating";
import { ProsConsList } from "@/components/product/ProsConsList";
import { BuyButton } from "@/components/affiliate/AffiliateLink";
import { ProductThumb } from "@/components/product/ProductThumb";

interface ProductReviewCardProps {
  rank: number;
  label: string;
  name: string;
  score: number;
  price: string;
  href: string;
  retailer?: string;
  image?: string;
  pros: string[];
  cons: string[];
  whoFor: React.ReactNode;
  specLine?: string;
  children?: React.ReactNode;
}

/**
 * Detailed scored review card for the listicle (REDESIGN_SPEC §3.6).
 */
export function ProductReviewCard({
  rank,
  label,
  name,
  score,
  price,
  href,
  retailer,
  image,
  pros,
  cons,
  whoFor,
  specLine,
  children,
}: ProductReviewCardProps) {
  return (
    <div className="rev not-prose">
      <div className="rev-head">
        <span className={`rev-rank${rank === 1 ? " one" : ""}`}>{rank}</span>
        <span className="rev-img">
          <ProductThumb image={image} name={name} size={88} />
        </span>
        <div className="rev-titles">
          <span className="lbl">{label}</span>
          <h3>{name}</h3>
          <div className="sub">
            <span className="scorepill">{score.toFixed(1)} / 5</span>
            <StarRating rating={score} />
          </div>
        </div>
        <div className="rev-right">
          <span className="price">{price}</span>
        </div>
      </div>

      <div className="rev-body">
        {children}
        <ProsConsList variant="list" pros={pros} cons={cons} />
        <div className="whofor">
          <b>Who it&apos;s for:</b> {whoFor}
        </div>
      </div>

      <div className="rev-foot">
        {specLine && <span className="pp">{specLine}</span>}
        <BuyButton
          href={href}
          retailer={retailer ?? "Amazon"}
          size="lg"
          productName={name}
        />
      </div>
    </div>
  );
}
