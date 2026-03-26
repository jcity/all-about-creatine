"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

interface NewsletterSignupProps {
  variant?: "inline" | "card";
}

export function NewsletterSignup({ variant = "card" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate with email service
    setEmail("");
  };

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1 rounded-lg border border-border bg-surface-raised px-3 py-2 text-sm outline-none transition-colors focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
        />
        <button
          type="submit"
          className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
        >
          Subscribe
        </button>
      </form>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-surface-raised p-6">
      <div className="mb-3 flex items-center gap-2">
        <Mail className="h-5 w-5 text-primary-600" />
        <h3 className="font-semibold">Stay Updated</h3>
      </div>
      <p className="mb-4 text-sm text-text-secondary">
        Get the latest creatine research, reviews, and guides delivered to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none transition-colors focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
        />
        <button
          type="submit"
          className="w-full rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-700"
        >
          Subscribe
        </button>
      </form>
      <p className="mt-2 text-xs text-text-muted">No spam. Unsubscribe anytime.</p>
    </div>
  );
}
