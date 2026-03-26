import type { Metadata } from "next";
import { siteConfig } from "./constants";

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "article" | "website";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
}

export function createMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || siteConfig.ogImage;

  return {
    title,
    description,
    ...(noIndex && { robots: { index: false, follow: false } }),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: type === "article" ? "article" : "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
