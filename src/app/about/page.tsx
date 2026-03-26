import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "About",
  description: "Learn about All About Creatine — our mission, editorial standards, and commitment to evidence-based supplement information.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: "About" }]} />

      <article className="prose prose-lg">
        <h1>About All About Creatine</h1>

        <p>
          All About Creatine is your trusted resource for evidence-based
          information about creatine supplementation. We exist to cut through the
          noise and give you clear, honest, science-backed answers.
        </p>

        <h2>Our Mission</h2>
        <p>
          The supplement industry is full of hype and misinformation. Our mission
          is simple: provide the most accurate, comprehensive, and accessible
          information about creatine available anywhere on the internet.
        </p>

        <h2>Editorial Standards</h2>
        <p>Every article we publish follows these principles:</p>
        <ul>
          <li>
            <strong>Evidence-based</strong> — We cite peer-reviewed research and
            rely on scientific consensus, not anecdotes or marketing claims.
          </li>
          <li>
            <strong>Transparent</strong> — When we recommend products, we clearly
            disclose our affiliate relationships. Our editorial judgments are never
            influenced by affiliate partnerships.
          </li>
          <li>
            <strong>Up-to-date</strong> — We regularly review and update our
            content as new research emerges.
          </li>
          <li>
            <strong>Accessible</strong> — We translate complex science into
            practical, actionable information anyone can understand.
          </li>
        </ul>

        <h2>Product Reviews</h2>
        <p>
          Our product reviews and rankings are based on thorough evaluation of
          ingredients, third-party testing, brand reputation, value, and real-world
          user experiences. We purchase products ourselves and evaluate them using
          consistent criteria.
        </p>

        <h2>Contact Us</h2>
        <p>
          Have questions, corrections, or feedback? We&apos;d love to hear from
          you. Visit our <a href="/contact">contact page</a> to get in touch.
        </p>
      </article>
    </div>
  );
}
