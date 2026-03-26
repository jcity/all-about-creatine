interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        url,
        image: image || "https://allaboutcreatine.com/images/og/default.png",
        datePublished,
        dateModified: dateModified || datePublished,
        author: {
          "@type": "Person",
          name: authorName,
        },
        publisher: {
          "@type": "Organization",
          name: "All About Creatine",
          url: "https://allaboutcreatine.com",
        },
      }}
    />
  );
}

export function ProductJsonLd({
  name,
  description,
  image,
  brand,
  rating,
  price,
  url,
}: {
  name: string;
  description: string;
  image: string;
  brand: string;
  rating: number;
  price: string;
  url: string;
}) {
  const numericPrice = price.replace(/[^0-9.]/g, "");

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name,
        description,
        image,
        brand: { "@type": "Brand", name: brand },
        review: {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: rating,
            bestRating: 5,
          },
          author: {
            "@type": "Organization",
            name: "All About Creatine",
          },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: rating,
          bestRating: 5,
          ratingCount: 1,
        },
        offers: {
          "@type": "Offer",
          url,
          priceCurrency: "USD",
          price: numericPrice,
          availability: "https://schema.org/InStock",
        },
      }}
    />
  );
}

export function FAQJsonLd({
  questions,
}: {
  questions: { question: string; answer: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: questions.map((q) => ({
          "@type": "Question",
          name: q.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: q.answer,
          },
        })),
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}
