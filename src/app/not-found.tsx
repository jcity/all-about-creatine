import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="mb-2 text-6xl font-bold text-primary-600">404</h1>
      <h2 className="mb-4 text-2xl font-semibold">Page Not Found</h2>
      <p className="mb-8 max-w-md text-text-secondary">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
      >
        Go Home
      </Link>
    </div>
  );
}
