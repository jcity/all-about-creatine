import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ArrowRight } from "lucide-react";
import { createMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = createMetadata({
  title: "Creatine Guides",
  description:
    "Comprehensive, evidence-based guides about creatine supplementation. Learn about benefits, dosing, safety, and more.",
  path: "/guides",
});

export default async function GuidesPage() {
  let guides: { slug: string; title: string; description: string; date: string; category: string; draft: boolean }[] = [];
  try {
    const content = await import("#content");
    guides = content.guides.filter((g: { draft: boolean }) => !g.draft);
  } catch {
    // Content not built yet
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Guides" }]} />

      <header className="mb-12">
        <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Creatine Guides
        </h1>
        <p className="text-lg text-text-secondary">
          Everything you need to know about creatine, backed by science.
        </p>
      </header>

      {guides.length === 0 ? (
        <p className="text-text-secondary">No guides published yet. Check back soon!</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group flex flex-col rounded-xl border border-border bg-surface-raised p-6 transition-colors hover:border-primary/30 hover:shadow-sm"
            >
              <span className="mb-4 text-xs font-medium uppercase tracking-widest text-primary">
                {guide.category}
              </span>
              <h2 className="mb-2.5 text-xl font-semibold group-hover:text-primary">
                {guide.title}
              </h2>
              <p className="mb-5 flex-1 text-sm leading-relaxed text-text-secondary">
                {guide.description}
              </p>
              <div className="flex items-center justify-between text-sm">
                <time className="text-text-muted">{formatDate(guide.date)}</time>
                <span className="inline-flex items-center gap-1 font-medium text-primary">
                  Read <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
