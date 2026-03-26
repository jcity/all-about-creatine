"use client";

import * as runtime from "react/jsx-runtime";
import { Callout } from "@/components/ui/Callout";
import { Accordion } from "@/components/ui/Accordion";
import { ProductCard } from "@/components/product/ProductCard";
import { ComparisonTable } from "@/components/product/ComparisonTable";
import { ProsConsList } from "@/components/product/ProsConsList";
import { StarRating } from "@/components/ui/StarRating";
import { BuyButton, AffiliateLink } from "@/components/affiliate/AffiliateLink";
import { AffiliateDisclosure } from "@/components/affiliate/AffiliateDisclosure";

const mdxComponents = {
  Callout,
  Accordion,
  ProductCard,
  ComparisonTable,
  ProsConsList,
  StarRating,
  BuyButton,
  AffiliateLink,
  AffiliateDisclosure,
};

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

interface MDXContentProps {
  code: string;
}

export function MDXContent({ code }: MDXContentProps) {
  const Component = useMDXComponent(code);
  return <Component components={mdxComponents} />;
}
