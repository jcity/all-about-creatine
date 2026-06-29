import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArticleLayout } from "@/components/content/ArticleLayout";
import { MDXContent } from "@/components/content/MDXContent";
import { ComparisonTable } from "@/components/product/ComparisonTable";
import { AffiliateDisclosure } from "@/components/affiliate/AffiliateDisclosure";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getBest(slug: string) {
  try {
    const { best } = await import("#content");
    return best.find((b: { slug: string }) => b.slug === slug) || null;
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const { best } = await import("#content");
    return best
      .filter((b: { draft: boolean }) => !b.draft)
      .map((b: { slug: string }) => ({ slug: b.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getBest(slug);
  if (!item) return {};

  return createMetadata({
    title: item.title,
    description: item.description,
    path: `/best/${item.slug}`,
    type: "article",
    publishedTime: item.date,
    modifiedTime: item.updatedDate,
    image: item.products?.[0]?.image,
  });
}

export default async function BestSlugPage({ params }: Props) {
  const { slug } = await params;
  const item = await getBest(slug);
  if (!item) notFound();

  let relatedPosts: { title: string; slug: string; description: string; category: string }[] = [];
  try {
    const { best } = await import("#content");
    relatedPosts = best
      .filter((b: { slug: string; draft: boolean }) => b.slug !== slug && !b.draft)
      .slice(0, 3)
      .map((b: { slug: string; title: string; description: string; category: string }) => ({
        title: b.title,
        slug: b.slug,
        description: b.description,
        category: b.category,
      }));
  } catch {}

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Best Creatine", url: `${siteConfig.url}/best` },
          { name: item.title, url: `${siteConfig.url}/best/${item.slug}` },
        ]}
      />
      <ArticleJsonLd
        title={item.title}
        description={item.description}
        url={`${siteConfig.url}/best/${item.slug}`}
        datePublished={item.date}
        dateModified={item.updatedDate}
        authorName={item.author}
        image={item.products?.[0]?.image}
      />
      <ArticleLayout
        title={item.title}
        description={item.description}
        date={item.date}
        updatedDate={item.updatedDate}
        author={item.author}
        category={item.category}
        readingTime={item.metadata?.readingTime ? `${item.metadata.readingTime} min read` : undefined}
        breadcrumbs={[
          { label: "Best Creatine", href: "/best" },
          { label: item.title },
        ]}
        toc={item.toc}
        relatedPosts={relatedPosts}
      >
        <AffiliateDisclosure />
        <ComparisonTable products={item.products} />
        <MDXContent code={item.body} />
      </ArticleLayout>
    </>
  );
}
