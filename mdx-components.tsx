import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import Image from "next/image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => (
      <h2 className="mt-10 mb-4 text-2xl font-bold tracking-tight" {...props} />
    ),
    h3: (props) => (
      <h3 className="mt-8 mb-3 text-xl font-semibold tracking-tight" {...props} />
    ),
    h4: (props) => (
      <h4 className="mt-6 mb-2 text-lg font-semibold" {...props} />
    ),
    a: ({ href, children, ...props }) => {
      if (href?.startsWith("/")) {
        return (
          <Link href={href} {...props}>
            {children}
          </Link>
        );
      }
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      );
    },
    img: ({ src, alt, ...props }) => {
      if (!src) return null;
      return (
        <Image
          src={src}
          alt={alt || ""}
          width={800}
          height={450}
          className="rounded-lg"
          {...props}
        />
      );
    },
    table: (props) => (
      <div className="my-6 overflow-x-auto">
        <table className="w-full" {...props} />
      </div>
    ),
    blockquote: (props) => (
      <blockquote
        className="border-l-4 border-primary-300 pl-4 italic text-text-secondary"
        {...props}
      />
    ),
    ...components,
  };
}
