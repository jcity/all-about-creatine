"use client";

import * as runtime from "react/jsx-runtime";
import Link from "next/link";
import { Callout } from "@/components/ui/Callout";
import { Accordion } from "@/components/ui/Accordion";
import { ProductCard } from "@/components/product/ProductCard";
import { ComparisonTable } from "@/components/product/ComparisonTable";
import { ProsConsList } from "@/components/product/ProsConsList";
import { ProductReviewCard } from "@/components/product/ProductReviewCard";
import { RatingBreakdown } from "@/components/product/RatingBreakdown";
import { VerdictBox } from "@/components/product/VerdictBox";
import { SpecTable } from "@/components/product/SpecTable";
import { Methodology } from "@/components/product/Methodology";
import { StarRating } from "@/components/ui/StarRating";
import { BuyButton, AffiliateLink } from "@/components/affiliate/AffiliateLink";
import { AffiliateDisclosure } from "@/components/affiliate/AffiliateDisclosure";
import { KeyTakeaways } from "@/components/content/KeyTakeaways";
import { InlineAffiliateCTA } from "@/components/content/InlineAffiliateCTA";
import { References, Cite } from "@/components/content/References";

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

const mdxComponents = {
  // Internal links route through next/link; external open in a new tab.
  a: ({ href, children, ...props }: AnchorProps) => {
    if (href && href.startsWith("/")) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }
    if (href && href.startsWith("#")) {
      return (
        <a href={href} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },
  img: ({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt ?? ""} loading="lazy" {...props} />
  ),
  // Trust / evidence components
  Callout,
  Accordion,
  KeyTakeaways,
  Cite,
  References,
  AffiliateDisclosure,
  InlineAffiliateCTA,
  // Product components
  ProductCard,
  ComparisonTable,
  ProsConsList,
  ProductReviewCard,
  RatingBreakdown,
  VerdictBox,
  SpecTable,
  Methodology,
  StarRating,
  BuyButton,
  AffiliateLink,
};

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

interface MDXContentProps {
  code: string;
}

export function MDXContent({ code }: MDXContentProps) {
  // Velite compiles MDX to a function we evaluate at render time. This is the
  // intended pattern for `s.mdx()` output, not a dynamically-defined component.
  const Component = useMDXComponent(code);
  return <Component components={mdxComponents} />;
}
