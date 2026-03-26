import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { StarRating } from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/Badge";
import { createMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = createMetadata({
  title: "Creatine Reviews",
  description:
    "Honest, detailed reviews of popular creatine supplements. Find out which products are worth your money.",
  path: "/reviews",
});

export default async function ReviewsPage() {
  let reviews: { slug: string; title: string; description: string; date: string; productName: string; brand: string; rating: number; price: string; formType: string; verdict: string; draft: boolean }[] = [];
  try {
    const content = await import("#content");
    reviews = content.reviews.filter((r: { draft: boolean }) => !r.draft);
  } catch {}

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: "Reviews" }]} />

      <header className="mb-10">
        <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Creatine Reviews
        </h1>
        <p className="text-lg text-text-secondary">
          Honest, hands-on reviews of the most popular creatine supplements.
        </p>
      </header>

      {reviews.length === 0 ? (
        <p className="text-text-secondary">Reviews coming soon!</p>
      ) : (
        <div className="grid gap-6">
          {reviews.map((review) => (
            <Link
              key={review.slug}
              href={`/reviews/${review.slug}`}
              className="group flex flex-col rounded-xl border border-border bg-surface-raised p-6 transition-shadow hover:shadow-md sm:flex-row sm:gap-6"
            >
              <div className="flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge variant="primary">{review.formType}</Badge>
                  <Badge>{review.brand}</Badge>
                </div>
                <h2 className="mb-1 text-xl font-semibold group-hover:text-primary-600">
                  {review.productName}
                </h2>
                <StarRating rating={review.rating} size="sm" className="mb-2" />
                <p className="mb-3 text-sm text-text-secondary">{review.verdict}</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">{review.price}</span>
                    <time className="text-text-muted">{formatDate(review.date)}</time>
                  </div>
                  <span className="inline-flex items-center gap-1 font-medium text-primary-600">
                    Full review <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
