import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { MDXContent } from "@/components/content/MDXContent";
import { ComparisonTable } from "@/components/product/ComparisonTable";
import { Methodology } from "@/components/product/Methodology";
import { TableOfContents } from "@/components/content/TableOfContents";
import { TopPickCard } from "@/components/product/SidebarCards";
import { StickyMobileCTA } from "@/components/product/StickyMobileCTA";
import { MedicallyReviewedByline } from "@/components/content/Bylines";
import { AffiliateDisclosure } from "@/components/affiliate/AffiliateDisclosure";
import { AuthorBio } from "@/components/content/AuthorBio";
import { Icon } from "@/components/ui/Icons";
import {
  ArticleJsonLd,
  BreadcrumbJsonLd,
  ItemListJsonLd,
} from "@/components/seo/JsonLd";
import { createMetadata } from "@/lib/metadata";
import { siteConfig, testingCriteria, topPick } from "@/lib/constants";
import { productHref } from "@/lib/products";
import { formatDate } from "@/lib/utils";
import type { ListProduct } from "@/lib/products";

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
    image: item.products?.[0]?.image ?? item.image,
  });
}

export default async function BestSlugPage({ params }: Props) {
  const { slug } = await params;
  const item = await getBest(slug);
  if (!item) notFound();

  const products: ListProduct[] = item.products ?? [];
  const sorted = [...products].sort((a, b) => a.rank - b.rank);
  const number1 = sorted[0];
  const updated = item.updatedDate ?? item.date;
  const verifiedDate = formatDate(updated);

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
        image={item.products?.[0]?.image ?? item.image}
      />
      {sorted.length > 0 && (
        <ItemListJsonLd
          items={sorted.map((p) => ({
            name: p.name,
            url: `${siteConfig.url}/best/${item.slug}`,
          }))}
        />
      )}

      <Breadcrumbs items={[{ label: "Best Creatine", href: "/best" }, { label: "Best of 2026" }]} />

      <div className="pagehead">
        <span className="kicker">
          <Icon name="trend" /> 2026 Buyer&apos;s Guide
        </span>
        <h1 className="serif">{item.title}</h1>
        <p className="dek">{item.description}</p>
        <MedicallyReviewedByline
          author={item.author}
          dateLabel={`Updated ${verifiedDate}`}
          center
        />
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 24px" }}>
        <AffiliateDisclosure />
      </div>

      <div className="layout">
        <div className="content">
          <ComparisonTable
            products={products}
            verifiedNote={`Prices shown are approximate and may vary at the retailer. Last verified ${verifiedDate}.`}
          />

          <Methodology
            intro="We evaluated more than 20 creatine supplements over a minimum two-week trial each, scoring every product against five weighted criteria:"
            criteria={[...testingCriteria]}
          />

          <div className="prose-article">
            <MDXContent code={item.body} />
          </div>

          <AuthorBio />
        </div>

        <aside className="rail">
          <TopPickCard
            heading="Our #1 Pick"
            name={number1?.name}
            rating={number1?.rating}
            price={number1?.price}
            href={number1 ? productHref(number1) : topPick.affiliateUrl}
            image={number1?.image}
          />
          {item.toc?.length > 0 && <TableOfContents items={item.toc} />}
        </aside>
      </div>

      <StickyMobileCTA
        name={`#1 ${number1?.name ?? topPick.name}`}
        sub={`Best overall · ${(number1?.rating ?? topPick.rating).toFixed(1)}/5`}
        href={number1 ? productHref(number1) : topPick.affiliateUrl}
        retailer={topPick.retailer}
      />
    </>
  );
}
