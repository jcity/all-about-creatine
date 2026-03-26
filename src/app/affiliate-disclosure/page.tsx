import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Affiliate Disclosure",
  description: "FTC-compliant affiliate disclosure for All About Creatine. Learn how we earn commissions and maintain editorial integrity.",
  path: "/affiliate-disclosure",
});

export default function AffiliateDisclosurePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: "Affiliate Disclosure" }]} />

      <article className="prose prose-lg">
        <h1>Affiliate Disclosure</h1>

        <p>
          <em>
            In accordance with the Federal Trade Commission (FTC) guidelines, we
            want to be transparent about how this website earns revenue.
          </em>
        </p>

        <h2>How We Earn Money</h2>
        <p>
          All About Creatine participates in affiliate marketing programs. This
          means that when you click on certain links on our website and make a
          purchase, we may receive a small commission at no additional cost to you.
        </p>

        <h2>Our Affiliate Partners</h2>
        <p>We currently participate in the following affiliate programs:</p>
        <ul>
          <li>Amazon Associates Program</li>
          <li>Various supplement brand affiliate programs</li>
        </ul>

        <h2>Editorial Independence</h2>
        <p>
          <strong>
            Our affiliate relationships never influence our editorial content,
            product ratings, or recommendations.
          </strong>
        </p>
        <p>
          We evaluate products using consistent, objective criteria regardless of
          affiliate partnerships. If a product doesn&apos;t meet our standards, we
          won&apos;t recommend it — even if it would earn us a commission.
        </p>
        <p>
          Our editorial team operates independently of our business relationships.
          Product rankings and reviews are based solely on our evaluation criteria
          including ingredient quality, third-party testing, brand reputation,
          value, and user feedback.
        </p>

        <h2>How to Identify Affiliate Links</h2>
        <p>
          Affiliate links on our site are accompanied by a disclosure notice. Pages
          that contain affiliate links will display a notice at the top of the
          content informing you that the page includes affiliate links.
        </p>

        <h2>Questions?</h2>
        <p>
          If you have questions about our affiliate relationships or editorial
          policies, please <a href="/contact">contact us</a>.
        </p>
      </article>
    </div>
  );
}
