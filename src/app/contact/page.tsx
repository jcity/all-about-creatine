import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { createMetadata } from "@/lib/metadata";
import { Mail } from "lucide-react";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description: "Get in touch with the All About Creatine team. We welcome feedback, corrections, and partnership inquiries.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: "Contact" }]} />

      <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
        Contact Us
      </h1>
      <p className="mb-8 text-lg text-text-secondary">
        We welcome your feedback, questions, and partnership inquiries.
      </p>

      <div className="space-y-6">
        <div className="rounded-xl border border-border bg-surface-raised p-6">
          <div className="flex items-center gap-3 mb-3">
            <Mail className="h-5 w-5 text-primary-600" />
            <h2 className="text-lg font-semibold">Email</h2>
          </div>
          <p className="text-text-secondary">
            For general inquiries, corrections, or feedback:
          </p>
          <a
            href="mailto:hello@allaboutcreatine.com"
            className="mt-1 inline-block font-medium text-primary-600 hover:text-primary-700"
          >
            hello@allaboutcreatine.com
          </a>
        </div>

        <div className="rounded-xl border border-border bg-surface-raised p-6">
          <h2 className="mb-3 text-lg font-semibold">Partnerships & Advertising</h2>
          <p className="text-text-secondary">
            Interested in sponsored content or advertising opportunities? Reach out
            to us at{" "}
            <a
              href="mailto:partnerships@allaboutcreatine.com"
              className="font-medium text-primary-600 hover:text-primary-700"
            >
              partnerships@allaboutcreatine.com
            </a>
          </p>
        </div>

        <div className="rounded-xl border border-border bg-surface-raised p-6">
          <h2 className="mb-3 text-lg font-semibold">Corrections</h2>
          <p className="text-text-secondary">
            Found an error in one of our articles? We take accuracy seriously.
            Please email us with the article URL and details of the correction
            needed, and we&apos;ll review it promptly.
          </p>
        </div>
      </div>
    </div>
  );
}
