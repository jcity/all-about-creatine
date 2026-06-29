import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ContentCard } from "@/components/content/ContentCard";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Creatine FAQ",
  description:
    "Frequently asked questions about creatine supplementation. Get clear, evidence-based answers.",
  path: "/faq",
});

export default async function FAQIndexPage() {
  let items: {
    slug: string;
    title: string;
    description: string;
    questions: { question: string }[];
    draft: boolean;
  }[] = [];
  try {
    const content = await import("#content");
    items = content.faqs.filter((f: { draft: boolean }) => !f.draft);
  } catch {}

  return (
    <>
      <Breadcrumbs items={[{ label: "FAQ" }]} />
      <div className="listing">
        <div className="listing-head">
          <h1>Creatine FAQ</h1>
          <p>Clear, evidence-based answers to the questions people actually ask about creatine.</p>
        </div>

        {items.length === 0 ? (
          <p className="empty-state">FAQ content coming soon!</p>
        ) : (
          <div className="grid-art">
            {items.map((item, i) => (
              <ContentCard
                key={item.slug}
                href={`/faq/${item.slug}`}
                tag="FAQ"
                title={item.title}
                description={item.description}
                meta={`Medically reviewed · ${item.questions?.length ?? 0} questions`}
                icon="question"
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
