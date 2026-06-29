import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { createMetadata } from "@/lib/metadata";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = createMetadata({
  title: "Creatine FAQ",
  description:
    "Frequently asked questions about creatine supplementation. Get clear, evidence-based answers.",
  path: "/faq",
});

export default async function FAQIndexPage() {
  let items: { slug: string; title: string; description: string; questions: { question: string }[]; draft: boolean }[] = [];
  try {
    const content = await import("#content");
    items = content.faqs.filter((f: { draft: boolean }) => !f.draft);
  } catch {}

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "FAQ" }]} />

      <header className="mb-12">
        <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Creatine FAQ
        </h1>
        <p className="text-lg text-text-secondary">
          Clear, evidence-based answers to your creatine questions.
        </p>
      </header>

      {items.length === 0 ? (
        <p className="text-text-secondary">FAQ content coming soon!</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/faq/${item.slug}`}
              className="group flex flex-col rounded-xl border border-border bg-surface-raised p-6 transition-colors hover:border-primary/30 hover:shadow-sm"
            >
              <span className="mb-4 text-xs font-medium uppercase tracking-widest text-primary">
                FAQ
              </span>
              <h2 className="mb-2.5 text-xl font-semibold group-hover:text-primary">
                {item.title}
              </h2>
              <p className="mb-5 flex-1 text-sm leading-relaxed text-text-secondary">
                {item.description}
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-muted">
                  {item.questions.length} questions
                </span>
                <span className="inline-flex items-center gap-1 font-medium text-primary">
                  Read answers <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
