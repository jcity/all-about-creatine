"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    if (!res.ok) {
      setError("Invalid token");
      return;
    }
    router.push("/admin");
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-xl border border-border bg-surface-raised p-8 shadow-sm"
      >
        <h1 className="mb-6 text-2xl font-bold">Admin Login</h1>
        {error && (
          <p className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}
        <label className="mb-2 block text-sm font-medium">Admin Token</label>
        <input
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="mb-4 w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm outline-none transition focus:border-primary-600 focus:ring-2 focus:ring-primary-100"
          placeholder="Enter token"
        />
        <button
          type="submit"
          className="w-full rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
        >
          Unlock
        </button>
      </form>
    </div>
  );
}
