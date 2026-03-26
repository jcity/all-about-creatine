import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Accordion } from "@/components/ui/Accordion";
import { MDXContent } from "@/components/content/MDXContent";
import { FAQJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getFAQ(slug: string) {
  try {
    const { faqs } = await import("#content");
    return faqs.find((f: { slug: string }) => f.slug === slug) || null;
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const { faqs } = await import("#content");
    return faqs
      .filter((f: { draft: boolean }) => !f.draft)
      .map((f: { slug: string }) => ({ slug: f.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const faq = await getFAQ(slug);
  if (!faq) return {};

  return createMetadata({
    title: faq.title,
    description: faq.description,
    path: `/faq/${faq.slug}`,
  });
}

export default async function FAQSlugPage({ params }: Props) {
  const { slug } = await params;
  const faq = await getFAQ(slug);
  if (!faq) notFound();

  return (
    <>
      <FAQJsonLd questions={faq.questions} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "FAQ", url: `${siteConfig.url}/faq` },
          { name: faq.title, url: `${siteConfig.url}/faq/${faq.slug}` },
        ]}
      />
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <Breadcrumbs
          items={[
            { label: "FAQ", href: "/faq" },
            { label: faq.title },
          ]}
        />

        <header className="mb-8">
          <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {faq.title}
          </h1>
          <p className="text-lg text-text-secondary">{faq.description}</p>
        </header>

        {/* Quick answers accordion */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold">Quick Answers</h2>
          <Accordion items={faq.questions} />
        </section>

        {/* Detailed content */}
        <div className="prose prose-lg">
          <MDXContent code={faq.body} />
        </div>
      </div>
    </>
  );
}
