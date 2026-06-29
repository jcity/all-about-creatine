import Image from "next/image";

interface AuthorBioProps {
  name: string;
  image?: string;
  bio?: string;
  date?: string;
  readingTime?: string;
}

export function AuthorBio({
  name,
  image = "/images/authors/default.png",
  bio = "Our editorial team is dedicated to providing evidence-based information about creatine supplementation, backed by peer-reviewed research.",
  date,
  readingTime,
}: AuthorBioProps) {
  return (
    <div className="mt-12 flex flex-col gap-4 rounded-xl border border-border bg-surface-raised p-6 sm:flex-row sm:items-start sm:gap-5">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-surface-muted">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="56px"
        />
      </div>
      <div className="flex-1">
        <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
          Written by
        </p>
        <p className="font-semibold">{name}</p>
        {date && readingTime && (
          <p className="mt-1 text-xs text-text-muted">
            {date} · {readingTime} read
          </p>
        )}
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          {bio}
        </p>
      </div>
    </div>
  );
}
