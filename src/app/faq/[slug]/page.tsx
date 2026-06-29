import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArticleLayout } from "@/components/content/ArticleLayout";
import { MDXContent } from "@/components/content/MDXContent";
import { Accordion } from "@/components/ui/Accordion";
import { ArticleJsonLd, FAQJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
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
    type: "article",
    publishedTime: faq.date,
    modifiedTime: faq.updatedDate,
  });
}

export default async function FAQSlugPage({ params }: Props) {
  const { slug } = await params;
  const faq = await getFAQ(slug);
  if (!faq) notFound();

  let relatedPosts: { title: string; slug: string; description: string; category: string }[] = [];
  try {
    const { faqs } = await import("#content");
    relatedPosts = faqs
      .filter((f: { slug: string; draft: boolean }) => f.slug !== slug && !f.draft)
      .slice(0, 3)
      .map((f: { slug: string; title: string; description: string; category?: string }) => ({
        title: f.title,
        slug: f.slug,
        description: f.description,
        category: f.category || "FAQ",
      }));
  } catch {}

  const readingTime = faq.metadata?.readingTime
    ? `${faq.metadata.readingTime} min read`
    : undefined;

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
      <ArticleLayout
        title={faq.title}
        description={faq.description}
        date={faq.date}
        updatedDate={faq.updatedDate}
        author="All About Creatine Editorial Team"
        category={faq.category}
        readingTime={readingTime}
        breadcrumbs={[
          { label: "FAQ", href: "/faq" },
          { label: faq.title },
        ]}
        toc={faq.toc}
        relatedPosts={relatedPosts}
      >
        {/* Quick answers accordion */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold">Quick Answers</h2>
          <Accordion items={faq.questions} />
        </section>

        {/* Detailed content */}
        <MDXContent code={faq.body} />
      </ArticleLayout>
    </>
  );
}
