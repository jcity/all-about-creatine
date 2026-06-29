import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { createMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";
import { ArrowRight, Star } from "lucide-react";

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
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Reviews" }]} />

      <header className="mb-12">
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <Link
              key={review.slug}
              href={`/reviews/${review.slug}`}
              className="group flex flex-col rounded-xl border border-border bg-surface-raised p-6 transition-colors hover:border-primary/30 hover:shadow-sm"
            >
              <div className="mb-4">
                <span className="text-xs font-medium uppercase tracking-widest text-primary">
                  {review.formType}
                </span>
              </div>
              <h2 className="mb-2 text-xl font-semibold group-hover:text-primary">
                {review.productName}
              </h2>
              <div className="mb-3 flex items-center gap-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.round(review.rating)
                        ? "fill-accent text-accent"
                        : "text-text-muted"
                    }`}
                  />
                ))}
                <span className="ml-1.5 text-sm text-text-muted">{review.rating.toFixed(1)}</span>
              </div>
              <p className="mb-5 flex-1 text-sm leading-relaxed text-text-secondary">
                {review.verdict}
              </p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <span className="font-semibold">{review.price}</span>
                  <time className="text-text-muted">{formatDate(review.date)}</time>
                </div>
                <span className="inline-flex items-center gap-1 font-medium text-primary">
                  Full review <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
