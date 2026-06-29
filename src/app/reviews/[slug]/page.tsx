import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { MDXContent } from "@/components/content/MDXContent";
import { ProsConsList } from "@/components/product/ProsConsList";
import { VerdictBox } from "@/components/product/VerdictBox";
import { SpecTable, type SpecRow } from "@/components/product/SpecTable";
import { StarRating } from "@/components/ui/StarRating";
import { BuyButton } from "@/components/affiliate/AffiliateLink";
import { MedicallyReviewedByline } from "@/components/content/Bylines";
import { AffiliateDisclosure } from "@/components/affiliate/AffiliateDisclosure";
import { AuthorBio } from "@/components/content/AuthorBio";
import { TableOfContents } from "@/components/content/TableOfContents";
import {
  CompareAlternatives,
  type Alternative,
} from "@/components/product/SidebarCards";
import { StickyMobileCTA } from "@/components/product/StickyMobileCTA";
import { Icon } from "@/components/ui/Icons";
import { ProductJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/constants";
import { monthYear, titleCase } from "@/lib/utils";
import { productHref, productRetailer } from "@/lib/products";

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

  let alternatives: Alternative[] = [];
  try {
    const { reviews } = await import("#content");
    alternatives = reviews
      .filter((r: { slug: string; draft: boolean }) => r.slug !== slug && !r.draft)
      .slice(0, 3)
      .map((r: { slug: string; productName: string; price: string; rating: number; formType: string }) => ({
        name: r.productName,
        meta: `${titleCase(r.formType)} · ${r.price}`,
        rating: r.rating,
        href: `/reviews/${r.slug}`,
      }));
  } catch {}
  if (alternatives.length === 0) {
    alternatives = [
      { name: "Compare all picks", meta: "Best Creatine 2026", rating: 4.9, href: "/best" },
    ];
  }

  const href = productHref(review);
  const retailer = productRetailer(review) ?? "Amazon";
  const dateLabel = review.updatedDate
    ? `Published ${monthYear(review.date)} · Updated ${monthYear(review.updatedDate)}`
    : `Published ${monthYear(review.date)}`;

  const specRows: SpecRow[] = [
    { label: "Form", value: titleCase(review.formType) },
    ...(review.servings
      ? [{ label: "Servings per container", value: String(review.servings) }]
      : []),
    { label: "Price", value: review.price },
    { label: "Brand", value: review.brand },
  ];

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
          { name: review.productName, url: `${siteConfig.url}/reviews/${review.slug}` },
        ]}
      />

      <Breadcrumbs items={[{ label: "Reviews", href: "/reviews" }, { label: review.productName }]} />

      <div className="wrap">
        <div className="rev-hero">
          <div className="rev-gallery">
            <span className="award">★ Editor&apos;s Choice</span>
            <div className="bigjar">
              <div className="lid" />
              <Icon name="jar" strokeWidth={1.6} />
              <span>CREATINE</span>
            </div>
          </div>
          <div className="rev-main">
            <span className="lbl">
              <Icon name="shield" /> {titleCase(review.formType)} · 2026
            </span>
            <h1 className="serif">{review.productName} Review</h1>
            <div className="brandline">
              by {review.brand}
              {review.servings ? ` · ${review.servings} servings` : ""}
            </div>

            <div className="scorebox">
              <div>
                <div className="bigscore">
                  {review.rating.toFixed(1)}
                  <small>/5</small>
                </div>
                <div className="scoremeta">
                  <StarRating rating={review.rating} />
                  <div>Based on hands-on testing</div>
                </div>
              </div>
            </div>

            <div className="buy-row">
              <div className="priceblock">
                <span className="price">{review.price}</span>
              </div>
              <BuyButton
                href={href}
                retailer={retailer}
                productName={review.productName}
              />
            </div>
            <div className="updated">
              Price last verified {monthYear(review.updatedDate ?? review.date)} ·
              We may earn a commission
            </div>
          </div>
        </div>

        <MedicallyReviewedByline author={review.author} dateLabel={dateLabel} />
        <AffiliateDisclosure>
          <strong>Affiliate disclosure:</strong> We earn a commission if you buy
          through links on this page, at no extra cost to you. Our score is based
          on independent testing, not the partnership.
        </AffiliateDisclosure>
      </div>

      <div className="layout">
        <div className="content">
          <VerdictBox score={review.rating}>{review.verdict}</VerdictBox>

          <ProsConsList variant="box" pros={review.pros} cons={review.cons} />

          <div className="prose-article">
            <MDXContent code={review.body} />
          </div>

          <h2 className="serif" id="specs" style={{ fontSize: 28, color: "var(--navy)", margin: "40px 0 14px", letterSpacing: "-.02em" }}>
            Specifications
          </h2>
          <SpecTable rows={specRows} />

          <AuthorBio />
        </div>

        <aside className="rail">
          {review.toc?.length > 0 && <TableOfContents items={review.toc} />}
          <CompareAlternatives items={alternatives} />
        </aside>
      </div>

      <StickyMobileCTA
        name={`${review.productName} — ${review.price}`}
        sub={`Editor's Choice · ${review.rating.toFixed(1)}/5`}
        href={href}
        retailer={retailer}
      />
    </>
  );
}
