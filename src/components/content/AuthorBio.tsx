import { reviewer } from "@/lib/constants";

interface AuthorBioProps {
  name?: string;
  role?: string;
  bio?: string;
  initials?: string;
  /** Prefix the name with "Medically reviewed by". */
  reviewed?: boolean;
  /** Accepted for API compatibility; not rendered in the reviewer card. */
  date?: string;
  readingTime?: string;
}

/**
 * Reviewer / author card at the foot of articles & reviews (REDESIGN_SPEC §3.16).
 * Defaults to the medical reviewer — the credibility close on health pages (D4).
 */
export function AuthorBio({
  name = reviewer.name,
  role = reviewer.role,
  bio = reviewer.bio,
  initials = reviewer.initials,
  reviewed = true,
}: AuthorBioProps) {
  return (
    <div className="authorbio not-prose">
      <span className="av">{initials}</span>
      <div>
        <b>
          {reviewed ? "Medically reviewed by " : ""}
          {name}
        </b>
        <div className="role">{role}</div>
        <p>{bio}</p>
      </div>
    </div>
  );
}
