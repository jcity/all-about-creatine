import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ContentCard } from "@/components/content/ContentCard";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Best Creatine Supplements",
  description:
    "Expert rankings and comparisons of the best creatine supplements. Find the right creatine for your goals and budget.",
  path: "/best",
});

export default async function BestPage() {
  let items: {
    slug: string;
    title: string;
    description: string;
    draft: boolean;
    products: { name: string }[];
  }[] = [];
  try {
    const content = await import("#content");
    items = content.best.filter((b: { draft: boolean }) => !b.draft);
  } catch {}

  return (
    <>
      <Breadcrumbs items={[{ label: "Best Creatine" }]} />
      <div className="listing">
        <div className="listing-head">
          <h1>Best Creatine Supplements</h1>
          <p>Lab-checked rankings and head-to-head comparisons — scored on purity, testing, mixability, and value.</p>
        </div>

        {items.length === 0 ? (
          <p className="empty-state">Rankings coming soon!</p>
        ) : (
          <div className="grid-art">
            {items.map((item, i) => (
              <ContentCard
                key={item.slug}
                href={`/best/${item.slug}`}
                tag="Ranking"
                title={item.title}
                description={item.description}
                meta={`Updated Jun 2026 · ${item.products?.length ?? 0} products compared`}
                icon="trend"
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
