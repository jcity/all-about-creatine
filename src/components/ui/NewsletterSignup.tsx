"use client";

import { useState } from "react";
import { Mail, Check, Loader2 } from "lucide-react";

interface NewsletterSignupProps {
  variant?: "inline" | "card";
}

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterSignup({ variant = "card" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
        return;
      }

      setStatus("success");
      setMessage("You're subscribed!");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    const successEl = (
      <div className="flex items-center gap-2 text-sm font-medium text-emerald-600">
        <Check className="h-4 w-4" />
        <span>{message}</span>
      </div>
    );

    if (variant === "inline") return successEl;

    return (
      <div className="rounded-xl border border-border bg-surface-raised p-6">
        <div className="mb-3 flex items-center gap-2">
          <Mail className="h-5 w-5 text-primary-600" />
          <h3 className="font-semibold">Stay Updated</h3>
        </div>
        {successEl}
      </div>
    );
  }

  const isLoading = status === "loading";

  if (variant === "inline") {
    return (
      <div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={isLoading}
            className="flex-1 rounded-lg border border-border bg-surface-raised px-3 py-2 text-sm outline-none transition-colors focus:border-primary-400 focus:ring-2 focus:ring-primary-100 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700 disabled:opacity-50"
          >
            {isLoading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            Subscribe
          </button>
        </form>
        {status === "error" && (
          <p className="mt-2 text-sm text-red-600">{message}</p>
        )}
      </div>
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
          disabled={isLoading}
          className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none transition-colors focus:border-primary-400 focus:ring-2 focus:ring-primary-100 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-700 disabled:opacity-50"
        >
          {isLoading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
          Subscribe
        </button>
      </form>
      {status === "error" && (
        <p className="mt-2 text-sm text-red-600">{message}</p>
      )}
      <p className="mt-2 text-xs text-text-muted">No spam. Unsubscribe anytime.</p>
    </div>
  );
}
