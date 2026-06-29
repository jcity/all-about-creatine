import Link from "next/link";
import { Home, BookOpen, Award, HelpCircle, ArrowRight } from "lucide-react";

const popularLinks = [
  { label: "What Is Creatine?", href: "/guides/what-is-creatine", icon: <BookOpen className="h-5 w-5" /> },
  { label: "Best Creatine Supplements", href: "/best/creatine-supplements-2026", icon: <Award className="h-5 w-5" /> },
  { label: "Creatine FAQ", href: "/faq", icon: <HelpCircle className="h-5 w-5" /> },
];

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
      <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">404</p>
      <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
        Page not found
      </h1>
      <p className="mb-10 text-lg text-text-secondary leading-relaxed">
        The page you're looking for doesn't exist or has been moved. <br className="hidden sm:inline" />
        Here are a few places you might want to go instead:
      </p>

      <div className="mb-12 grid gap-4 sm:grid-cols-3">
        {popularLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex flex-col items-center gap-3 rounded-xl border border-border bg-surface-raised p-6 transition-colors hover:border-primary/30 hover:shadow-sm"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              {link.icon}
            </span>
            <span className="text-sm font-semibold">{link.label}</span>
            <ArrowRight className="h-4 w-4 text-text-muted" />
          </Link>
        ))}
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
      >
        <Home className="h-4 w-4" />
        Back to homepage
      </Link>
    </div>
  );
}
