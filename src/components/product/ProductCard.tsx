import Image from "next/image";
import { StarRating } from "@/components/ui/StarRating";
import { BuyButton } from "@/components/affiliate/AffiliateLink";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  rank?: number;
  name: string;
  image: string;
  rating: number;
  price: string;
  oneLiner: string;
  amazonUrl?: string;
  badge?: string;
  className?: string;
}

export function ProductCard({
  rank,
  name,
  image,
  rating,
  price,
  oneLiner,
  amazonUrl,
  badge,
  className,
}: ProductCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface-raised p-5 transition-shadow hover:shadow-md sm:flex-row sm:gap-5",
        className
      )}
    >
      {rank && (
        <div className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white sm:static sm:shrink-0">
          {rank}
        </div>
      )}

      <div className="mb-4 flex shrink-0 items-center justify-center sm:mb-0 sm:w-32">
        <div className="relative h-28 w-28">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain"
            sizes="112px"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="mb-1 flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-tight">{name}</h3>
          {badge && <Badge variant="accent">{badge}</Badge>}
        </div>

        <StarRating rating={rating} size="sm" className="mb-2" />

        <p className="mb-3 text-sm text-text-secondary">{oneLiner}</p>

        <div className="mt-auto flex items-center justify-between gap-3">
          <span className="text-lg font-bold text-text">{price}</span>
          {amazonUrl && (
            <BuyButton href={amazonUrl} retailer="Amazon" size="sm" />
          )}
        </div>
      </div>
    </div>
  );
}
