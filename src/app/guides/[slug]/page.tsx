import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArticleLayout } from "@/components/content/ArticleLayout";
import { MDXContent } from "@/components/content/MDXContent";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getGuide(slug: string) {
  try {
    const { guides } = await import("#content");
    return guides.find((g: { slug: string }) => g.slug === slug) || null;
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const { guides } = await import("#content");
    return guides
      .filter((g: { draft: boolean }) => !g.draft)
      .map((g: { slug: string }) => ({ slug: g.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuide(slug);
  if (!guide) return {};

  return createMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    image: guide.image,
    type: "article",
    publishedTime: guide.date,
    modifiedTime: guide.updatedDate,
  });
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = await getGuide(slug);
  if (!guide) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Guides", url: `${siteConfig.url}/guides` },
          { name: guide.title, url: `${siteConfig.url}/guides/${guide.slug}` },
        ]}
      />
      <ArticleJsonLd
        title={guide.title}
        description={guide.description}
        url={`${siteConfig.url}/guides/${guide.slug}`}
        image={guide.image}
        datePublished={guide.date}
        dateModified={guide.updatedDate}
        authorName={guide.author}
      />
      <ArticleLayout
        title={guide.title}
        description={guide.description}
        date={guide.date}
        updatedDate={guide.updatedDate}
        author={guide.author}
        category={guide.category}
        readingTime={guide.metadata?.readingTime ? `${guide.metadata.readingTime} min read` : undefined}
        breadcrumbs={[
          { label: "Guides", href: "/guides" },
          { label: guide.title },
        ]}
        toc={guide.toc}
      >
        <MDXContent code={guide.body} />
      </ArticleLayout>
    </>
  );
}
