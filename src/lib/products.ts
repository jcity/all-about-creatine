/**
 * Flexible product shape consumed by the listicle/comparison components.
 * Matches the velite `best` collection's `products[]` (with a few optional
 * presentation fields the content team can add per the redesign).
 */
export interface ListProduct {
  name: string;
  rank: number;
  rating: number;
  price: string;
  pricePerServing?: string;
  oneLiner: string;
  image?: string;
  badge?: string;
  bestFor?: string;
  productSlug?: string;
  amazonUrl?: string;
  iherbUrl?: string;
  brandUrl?: string;
  impactUrl?: string;
}

/** First available affiliate destination, falling back to "#". */
export function productHref(p: {
  amazonUrl?: string;
  impactUrl?: string;
  brandUrl?: string;
  iherbUrl?: string;
}): string {
  return p.amazonUrl || p.impactUrl || p.brandUrl || p.iherbUrl || "#";
}

/** Preferred retailer label for the affiliate link. */
export function productRetailer(p: {
  amazonUrl?: string;
  impactUrl?: string;
  brandUrl?: string;
  iherbUrl?: string;
}): string | undefined {
  if (p.amazonUrl) return "Amazon";
  if (p.iherbUrl) return "iHerb";
  if (p.brandUrl) return undefined;
  return undefined;
}
