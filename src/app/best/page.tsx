import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { createMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";
import { ArrowRight, Trophy } from "lucide-react";

export const metadata: Metadata = createMetadata({
  title: "Best Creatine Supplements",
  description:
    "Expert rankings and comparisons of the best creatine supplements. Find the right creatine for your goals and budget.",
  path: "/best",
});

export default async function BestPage() {
  let items: { slug: string; title: string; description: string; date: string; category: string; draft: boolean; products: { name: string }[] }[] = [];
  try {
    const content = await import("#content");
    items = content.best.filter((b: { draft: boolean }) => !b.draft);
  } catch {}

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: "Best Creatine" }]} />

      <header className="mb-10">
        <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Best Creatine Supplements
        </h1>
        <p className="text-lg text-text-secondary">
          Tested, reviewed, and ranked — find the perfect creatine for you.
        </p>
      </header>

      {items.length === 0 ? (
        <p className="text-text-secondary">Rankings coming soon!</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/best/${item.slug}`}
              className="group flex flex-col rounded-xl border border-border bg-surface-raised p-6 transition-shadow hover:shadow-md"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-100 text-accent-700">
                <Trophy className="h-5 w-5" />
              </div>
              <h2 className="mb-2 text-xl font-semibold group-hover:text-primary-600">
                {item.title}
              </h2>
              <p className="mb-4 flex-1 text-sm text-text-secondary">
                {item.description}
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-muted">
                  {item.products.length} products compared
                </span>
                <span className="inline-flex items-center gap-1 font-medium text-primary-600">
                  View rankings <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
