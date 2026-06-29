import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArticleLayout } from "@/components/content/ArticleLayout";
import { MDXContent } from "@/components/content/MDXContent";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/constants";
import { monthYear, titleCase } from "@/lib/utils";
import type { IconName } from "@/components/ui/Icons";

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

  let related: { title: string; href: string; meta?: string; icon?: IconName }[] = [];
  try {
    const { guides } = await import("#content");
    related = guides
      .filter((g: { slug: string; draft: boolean; category?: string }) => g.slug !== slug && !g.draft)
      .sort((a: { category?: string }, b: { category?: string }) => {
        const aMatch = a.category === guide.category ? 1 : 0;
        const bMatch = b.category === guide.category ? 1 : 0;
        return bMatch - aMatch;
      })
      .slice(0, 4)
      .map((g: { slug: string; title: string; metadata?: { readingTime?: string } }) => ({
        title: g.title,
        href: `/guides/${g.slug}`,
        meta: `${g.metadata?.readingTime ?? "8"} min read`,
        icon: "book" as IconName,
      }));
  } catch {}

  const readingTime = guide.metadata?.readingTime ?? "8";
  const readMeta = `${readingTime} min read · ${monthYear(guide.updatedDate ?? guide.date)}`;

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
        breadcrumbs={[
          { label: "Guides", href: "/guides" },
          { label: guide.title },
        ]}
        category={guide.category ? titleCase(guide.category) : "Guide"}
        title={guide.title}
        dek={guide.description}
        author={guide.author}
        readMeta={readMeta}
        shareUrl={`${siteConfig.url}/guides/${guide.slug}`}
        heroIcon="logo"
        heroCaption="Illustrative — evidence-based creatine science, explained plainly."
        toc={guide.toc}
        related={related}
        showDisclosure
      >
        <MDXContent code={guide.body} />
      </ArticleLayout>
    </>
  );
}
