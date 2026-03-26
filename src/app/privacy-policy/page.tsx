import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description: "All About Creatine privacy policy — how we collect, use, and protect your data.",
  path: "/privacy-policy",
  noIndex: true,
});

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

      <article className="prose prose-lg">
        <h1>Privacy Policy</h1>
        <p>
          <em>Last updated: March 2026</em>
        </p>

        <p>
          All About Creatine (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;)
          is committed to protecting your privacy. This Privacy Policy explains
          how we collect, use, and safeguard your information when you visit our
          website allaboutcreatine.com.
        </p>

        <h2>Information We Collect</h2>
        <h3>Automatically Collected Information</h3>
        <p>
          When you visit our website, we may automatically collect certain
          information including your IP address, browser type, operating system,
          referring URLs, and pages visited. This information is collected through
          cookies and similar technologies.
        </p>

        <h3>Information You Provide</h3>
        <p>
          If you subscribe to our newsletter, we collect your email address. If
          you contact us, we collect the information you include in your message.
        </p>

        <h2>How We Use Your Information</h2>
        <ul>
          <li>To operate and improve our website</li>
          <li>To send newsletters (if you subscribed)</li>
          <li>To respond to your inquiries</li>
          <li>To analyze website traffic and usage patterns</li>
        </ul>

        <h2>Third-Party Services</h2>
        <p>We use the following third-party services:</p>
        <ul>
          <li>
            <strong>Vercel Analytics</strong> — for website analytics and
            performance monitoring
          </li>
          <li>
            <strong>Affiliate Networks</strong> — when you click affiliate links,
            you may be redirected through affiliate tracking services
          </li>
        </ul>

        <h2>Cookies</h2>
        <p>
          We use essential cookies to ensure our website functions properly. We
          may also use analytics cookies to understand how visitors interact with
          our website.
        </p>

        <h2>Your Rights</h2>
        <p>
          You may opt out of our newsletter at any time by clicking the
          unsubscribe link in any email. You may also contact us to request access
          to, correction of, or deletion of your personal data.
        </p>

        <h2>Contact</h2>
        <p>
          For privacy-related questions, contact us at{" "}
          <a href="mailto:privacy@allaboutcreatine.com">
            privacy@allaboutcreatine.com
          </a>
        </p>
      </article>
    </div>
  );
}
