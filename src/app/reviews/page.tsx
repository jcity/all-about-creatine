import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ContentCard } from "@/components/content/ContentCard";
import { createMetadata } from "@/lib/metadata";
import { titleCase } from "@/lib/utils";

export const metadata: Metadata = createMetadata({
  title: "Creatine Reviews",
  description:
    "Honest, detailed reviews of popular creatine supplements. Find out which products are worth your money.",
  path: "/reviews",
});

export default async function ReviewsPage() {
  let reviews: {
    slug: string;
    title: string;
    description: string;
    productName: string;
    rating: number;
    price: string;
    formType: string;
    draft: boolean;
  }[] = [];
  try {
    const content = await import("#content");
    reviews = content.reviews.filter((r: { draft: boolean }) => !r.draft);
  } catch {}

  return (
    <>
      <Breadcrumbs items={[{ label: "Reviews" }]} />
      <div className="listing">
        <div className="listing-head">
          <h1>Creatine Reviews</h1>
          <p>Honest, hands-on reviews of the most popular creatine supplements — independently tested and scored.</p>
        </div>

        {reviews.length === 0 ? (
          <p className="empty-state">
            Reviews are coming soon. In the meantime, see our{" "}
            <Link href="/best" style={{ color: "var(--teal)", fontWeight: 600 }}>
              Best Creatine of 2026
            </Link>{" "}
            rankings.
          </p>
        ) : (
          <div className="grid-art">
            {reviews.map((review, i) => (
              <ContentCard
                key={review.slug}
                href={`/reviews/${review.slug}`}
                tag={titleCase(review.formType)}
                title={`${review.productName} Review`}
                description={review.description}
                meta={`${review.rating.toFixed(1)} / 5 · ${review.price}`}
                icon="jar"
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
