import Image from "next/image";
import { StarRating } from "@/components/ui/StarRating";
import { BuyButton } from "@/components/affiliate/AffiliateLink";

interface Product {
  name: string;
  rank: number;
  rating: number;
  price: string;
  amazonUrl?: string;
  image: string;
  oneLiner: string;
}

interface ComparisonTableProps {
  products: Product[];
}

export function ComparisonTable({ products }: ComparisonTableProps) {
  const sorted = [...products].sort((a, b) => a.rank - b.rank);

  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-x-auto rounded-xl border border-border md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-surface-muted text-left text-sm font-medium text-text-secondary">
              <th className="px-4 py-3 w-12">#</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3 w-40"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sorted.map((product) => (
              <tr key={product.rank} className="transition-colors hover:bg-surface-muted/50">
                <td className="px-4 py-4">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                    {product.rank}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-text-muted">{product.oneLiner}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <StarRating rating={product.rating} size="sm" />
                </td>
                <td className="px-4 py-4 font-semibold">{product.price}</td>
                <td className="px-4 py-4">
                  {product.amazonUrl && (
                    <BuyButton href={product.amazonUrl} retailer="Amazon" size="sm" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {sorted.map((product) => (
          <div key={product.rank} className="flex items-center gap-3 rounded-lg border border-border bg-surface-raised p-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
              {product.rank}
            </span>
            <div className="relative h-14 w-14 shrink-0">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
                sizes="56px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate font-medium">{product.name}</p>
              <StarRating rating={product.rating} size="sm" />
              <div className="mt-1 flex items-center justify-between">
                <span className="font-semibold">{product.price}</span>
                {product.amazonUrl && (
                  <BuyButton href={product.amazonUrl} size="sm" label="Buy" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
