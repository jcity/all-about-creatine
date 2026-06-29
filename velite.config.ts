import { defineConfig, defineCollection, s } from "velite";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";

const guides = defineCollection({
  name: "Guide",
  pattern: "guides/**/*.mdx",
  schema: s.object({
    title: s.string().max(120),
    description: s.string().max(260),
    date: s.isodate(),
    updatedDate: s.isodate().optional(),
    author: s.string(),
    category: s.enum([
      "basics",
      "women",
      "dosage",
      "benefits",
      "safety",
      "science",
      "types",
    ]),
    tags: s.array(s.string()).default([]),
    image: s.string().optional(),
    imageAlt: s.string().optional(),
    draft: s.boolean().default(false),
    slug: s.path().transform((p) => p.split("/").pop()!),
    body: s.mdx(),
    toc: s.toc(),
    metadata: s.metadata(),
  }),
});

const reviews = defineCollection({
  name: "Review",
  pattern: "reviews/**/*.mdx",
  schema: s.object({
    title: s.string().max(120),
    description: s.string().max(260),
    date: s.isodate(),
    updatedDate: s.isodate().optional(),
    author: s.string(),
    productName: s.string(),
    brand: s.string(),
    rating: s.number().min(1).max(5),
    price: s.string(),
    servings: s.number().optional(),
    formType: s.enum([
      "monohydrate",
      "hcl",
      "buffered",
      "micronized",
      "liquid",
    ]),
    amazonUrl: s.string().optional(),
    iherbUrl: s.string().optional(),
    brandUrl: s.string().optional(),
    impactUrl: s.string().optional(),
    image: s.string(),
    pros: s.array(s.string()),
    cons: s.array(s.string()),
    verdict: s.string(),
    draft: s.boolean().default(false),
    slug: s.path().transform((p) => p.split("/").pop()!),
    body: s.mdx(),
    toc: s.toc(),
    metadata: s.metadata(),
  }),
});

const best = defineCollection({
  name: "Best",
  pattern: "best/**/*.mdx",
  schema: s.object({
    title: s.string().max(120),
    description: s.string().max(260),
    date: s.isodate(),
    updatedDate: s.isodate().optional(),
    author: s.string(),
    category: s.string(),
    products: s.array(
      s.object({
        name: s.string(),
        rank: s.number(),
        productSlug: s.string().optional(),
        rating: s.number().min(1).max(5),
        price: s.string(),
        amazonUrl: s.string().optional(),
        iherbUrl: s.string().optional(),
        brandUrl: s.string().optional(),
        impactUrl: s.string().optional(),
        image: s.string(),
        oneLiner: s.string(),
      })
    ),
    draft: s.boolean().default(false),
    slug: s.path().transform((p) => p.split("/").pop()!),
    body: s.mdx(),
    toc: s.toc(),
    metadata: s.metadata(),
  }),
});

const faqs = defineCollection({
  name: "FAQ",
  pattern: "faqs/**/*.mdx",
  schema: s.object({
    title: s.string().max(120),
    description: s.string().max(260),
    date: s.isodate(),
    updatedDate: s.isodate().optional(),
    category: s.string().optional(),
    questions: s.array(
      s.object({
        question: s.string(),
        answer: s.string(),
      })
    ),
    draft: s.boolean().default(false),
    slug: s.path().transform((p) => p.split("/").pop()!),
    body: s.mdx(),
    toc: s.toc(),
    metadata: s.metadata(),
  }),
});

const pages = defineCollection({
  name: "Page",
  pattern: "pages/**/*.mdx",
  schema: s.object({
    title: s.string().max(120),
    description: s.string().max(260),
    slug: s.path().transform((p) => p.split("/").pop()!),
    body: s.mdx(),
  }),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { guides, reviews, best, faqs, pages },
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["anchor"],
          },
        },
      ],
    ],
  },
});
