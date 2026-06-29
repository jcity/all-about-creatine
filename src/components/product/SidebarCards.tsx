import Link from "next/link";
import { Icon } from "@/components/ui/Icons";
import { StarRating } from "@/components/ui/StarRating";
import { BuyButton } from "@/components/affiliate/AffiliateLink";
import { ProductThumb } from "@/components/product/ProductThumb";
import { topPick } from "@/lib/constants";

interface TopPickCardProps {
  heading?: string;
  name?: string;
  rating?: number;
  price?: string;
  href?: string;
  retailer?: string;
  image?: string;
}

/** Sidebar "#1 pick" card (REDESIGN_SPEC §4.1/§4.2). */
export function TopPickCard({
  heading = "Our #1 Pick",
  name = topPick.name,
  rating = topPick.rating,
  price = topPick.price,
  href = topPick.affiliateUrl,
  retailer = topPick.retailer,
  image,
}: TopPickCardProps) {
  return (
    <div className="side-card">
      <div className="sc-top">
        <Icon name="trophy" /> {heading}
      </div>
      <div className="side-pick">
        <span className="pthumb">
          <ProductThumb image={image} name={name} size={64} />
        </span>
        <b>{name}</b>
        <StarRating rating={rating} />
        <span className="price">{price}</span>
        <BuyButton href={href} retailer={retailer} productName={name} />
      </div>
    </div>
  );
}

export interface Alternative {
  name: string;
  meta: string;
  rating: number;
  href: string;
  image?: string;
}

interface CompareAlternativesProps {
  heading?: string;
  items: Alternative[];
}

/** Sidebar "Compare alternatives" card for review pages (REDESIGN_SPEC §4.3). */
export function CompareAlternatives({
  heading = "Compare alternatives",
  items,
}: CompareAlternativesProps) {
  if (!items || items.length === 0) return null;
  return (
    <div className="alt-card">
      <div className="ac-top">{heading}</div>
      {items.map((alt) => (
        <Link className="alt-item" href={alt.href} key={alt.name}>
          <span className="pthumb">
            <ProductThumb image={alt.image} name={alt.name} size={42} />
          </span>
          <div>
            <b>{alt.name}</b>
            <br />
            <small>{alt.meta}</small>
            <br />
            <StarRating rating={alt.rating} />
          </div>
        </Link>
      ))}
    </div>
  );
}
