import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ContentCard } from "@/components/content/ContentCard";
import { createMetadata } from "@/lib/metadata";
import { titleCase } from "@/lib/utils";

export const metadata: Metadata = createMetadata({
  title: "Creatine Guides",
  description:
    "Comprehensive, evidence-based guides about creatine supplementation. Learn about benefits, dosing, safety, and more.",
  path: "/guides",
});

export default async function GuidesPage() {
  let guides: {
    slug: string;
    title: string;
    description: string;
    category: string;
    draft: boolean;
    metadata?: { readingTime?: string };
  }[] = [];
  try {
    const content = await import("#content");
    guides = content.guides.filter((g: { draft: boolean }) => !g.draft);
  } catch {}

  return (
    <>
      <Breadcrumbs items={[{ label: "Guides" }]} />
      <div className="listing">
        <div className="listing-head">
          <h1>Creatine Guides</h1>
          <p>Everything you need to know about creatine, backed by science and medically reviewed.</p>
        </div>

        {guides.length === 0 ? (
          <p className="empty-state">No guides published yet. Check back soon!</p>
        ) : (
          <div className="grid-art">
            {guides.map((guide, i) => (
              <ContentCard
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                tag={guide.category ? titleCase(guide.category) : "Guide"}
                title={guide.title}
                description={guide.description}
                meta={`Medically reviewed · ${guide.metadata?.readingTime ?? "8"} min read`}
                icon="book"
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
