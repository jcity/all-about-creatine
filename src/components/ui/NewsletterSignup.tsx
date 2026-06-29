"use client";

import { useState } from "react";

interface NewsletterSignupProps {
  /** "card" = full mint band (home); "inline" = compact stacked form. */
  variant?: "inline" | "card";
  heading?: string;
  blurb?: string;
}

type Status = "idle" | "loading" | "success" | "error";

/**
 * Demoted, secondary newsletter capture (D6) — never the page's hero CTA, and
 * styled in teal (never amber, G3).
 */
export function NewsletterSignup({
  variant = "card",
  heading = "Stay current on creatine research",
  blurb = "One concise email a month: new studies decoded, fresh reviews, and price drops on our top picks.",
}: NewsletterSignupProps) {
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
      setMessage("You're subscribed! Check your inbox to confirm.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  const isLoading = status === "loading";

  const form = (
    <div>
      <form className="news-form" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          aria-label="Email address"
          required
          disabled={isLoading || status === "success"}
        />
        <button
          type="submit"
          className="btn btn-primary"
          style={{ whiteSpace: "nowrap" }}
          disabled={isLoading || status === "success"}
        >
          {isLoading ? "Subscribing…" : "Subscribe"}
        </button>
      </form>
      <div
        className="fine"
        style={status === "error" ? { color: "var(--amber-dark)" } : undefined}
        role={status === "error" ? "alert" : undefined}
      >
        {status === "success" || status === "error"
          ? message
          : "No spam. Unsubscribe anytime. We never sell your data."}
      </div>
    </div>
  );

  if (variant === "inline") {
    return (
      <div className="not-prose">
        <h3 className="serif" style={{ color: "var(--navy)", marginBottom: 8 }}>
          {heading}
        </h3>
        <p style={{ color: "var(--slate)", fontSize: 15, marginBottom: 14 }}>
          {blurb}
        </p>
        {form}
      </div>
    );
  }

  return (
    <div className="news not-prose">
      <div>
        <h3 className="serif">{heading}</h3>
        <p>{blurb}</p>
      </div>
      {form}
    </div>
  );
}
