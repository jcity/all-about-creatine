import Image from "next/image";

interface AuthorBioProps {
  name: string;
  image?: string;
  bio?: string;
}

export function AuthorBio({
  name,
  image = "/images/authors/default.png",
  bio = "Our editorial team is dedicated to providing evidence-based information about creatine supplementation, backed by peer-reviewed research.",
}: AuthorBioProps) {
  return (
    <div className="mt-10 flex items-start gap-4 rounded-xl border border-border bg-surface-raised p-5">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-surface-muted">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="56px"
        />
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-text-muted">Written by</p>
        <p className="font-semibold">{name}</p>
        <p className="mt-1 text-sm text-text-secondary">{bio}</p>
      </div>
    </div>
  );
}
