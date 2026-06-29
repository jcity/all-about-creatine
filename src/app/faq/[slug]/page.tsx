import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArticleLayout } from "@/components/content/ArticleLayout";
import { MDXContent } from "@/components/content/MDXContent";
import { Accordion } from "@/components/ui/Accordion";
import { FAQJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/constants";
import { monthYear } from "@/lib/utils";
import type { IconName } from "@/components/ui/Icons";

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

  let related: { title: string; href: string; meta?: string; icon?: IconName }[] = [];
  try {
    const { faqs } = await import("#content");
    related = faqs
      .filter((f: { slug: string; draft: boolean }) => f.slug !== slug && !f.draft)
      .slice(0, 4)
      .map((f: { slug: string; title: string }) => ({
        title: f.title,
        href: `/faq/${f.slug}`,
        icon: "question" as IconName,
      }));
  } catch {}

  const readingTime = faq.metadata?.readingTime ?? "5";
  const readMeta = `${readingTime} min read · ${monthYear(faq.updatedDate ?? faq.date)}`;

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
        breadcrumbs={[
          { label: "FAQ", href: "/faq" },
          { label: faq.title },
        ]}
        category="FAQ"
        title={faq.title}
        dek={faq.description}
        author={siteConfig.author}
        readMeta={readMeta}
        shareUrl={`${siteConfig.url}/faq/${faq.slug}`}
        toc={faq.toc}
        related={related}
        preBody={
          faq.questions?.length ? (
            <div className="faq not-prose" style={{ marginTop: 0 }}>
              <h2 className="sec serif">Quick answers</h2>
              <Accordion items={faq.questions} />
            </div>
          ) : undefined
        }
      >
        <MDXContent code={faq.body} />
      </ArticleLayout>
    </>
  );
}
