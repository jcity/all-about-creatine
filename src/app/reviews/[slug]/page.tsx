import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArticleLayout } from "@/components/content/ArticleLayout";
import { MDXContent } from "@/components/content/MDXContent";
import { ProsConsList } from "@/components/product/ProsConsList";
import { StarRating } from "@/components/ui/StarRating";
import { BuyButton } from "@/components/affiliate/AffiliateLink";
import { AffiliateDisclosure } from "@/components/affiliate/AffiliateDisclosure";
import { ProductJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getReview(slug: string) {
  try {
    const { reviews } = await import("#content");
    return reviews.find((r: { slug: string }) => r.slug === slug) || null;
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const { reviews } = await import("#content");
    return reviews
      .filter((r: { draft: boolean }) => !r.draft)
      .map((r: { slug: string }) => ({ slug: r.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const review = await getReview(slug);
  if (!review) return {};

  return createMetadata({
    title: `${review.productName} Review`,
    description: review.description,
    path: `/reviews/${review.slug}`,
    image: review.image,
    type: "article",
    publishedTime: review.date,
    modifiedTime: review.updatedDate,
  });
}

export default async function ReviewSlugPage({ params }: Props) {
  const { slug } = await params;
  const review = await getReview(slug);
  if (!review) notFound();

  return (
    <>
      <ProductJsonLd
        name={review.productName}
        description={review.description}
        image={review.image}
        brand={review.brand}
        rating={review.rating}
        price={review.price}
        url={`${siteConfig.url}/reviews/${review.slug}`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Reviews", url: `${siteConfig.url}/reviews` },
          {
            name: review.productName,
            url: `${siteConfig.url}/reviews/${review.slug}`,
          },
        ]}
      />
      <ArticleLayout
        title={review.title}
        description={review.description}
        date={review.date}
        updatedDate={review.updatedDate}
        author={review.author}
        category={review.formType}
        breadcrumbs={[
          { label: "Reviews", href: "/reviews" },
          { label: review.productName },
        ]}
        toc={review.toc}
      >
        <AffiliateDisclosure />

        {/* Quick summary box */}
        <div className="not-prose mb-8 rounded-xl border border-border bg-surface-raised p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold">{review.productName}</h2>
              <p className="text-sm text-text-secondary">by {review.brand}</p>
              <StarRating rating={review.rating} className="mt-2" />
            </div>
            <div className="text-right">
              <p className="mb-2 text-2xl font-bold">{review.price}</p>
              {review.amazonUrl && (
                <BuyButton href={review.amazonUrl} retailer="Amazon" />
              )}
            </div>
          </div>
          <p className="mt-4 text-sm font-medium italic text-text-secondary">
            &ldquo;{review.verdict}&rdquo;
          </p>
        </div>

        <ProsConsList pros={review.pros} cons={review.cons} />

        <MDXContent code={review.body} />

        {/* Bottom CTA */}
        {review.amazonUrl && (
          <div className="not-prose mt-8 text-center">
            <BuyButton
              href={review.amazonUrl}
              retailer="Amazon"
              label={`Buy ${review.productName}`}
              size="lg"
            />
          </div>
        )}
      </ArticleLayout>
    </>
  );
}
