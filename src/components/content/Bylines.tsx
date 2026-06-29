import { Icon } from "@/components/ui/Icons";
import { reviewer, siteConfig } from "@/lib/constants";

interface MedicallyReviewedBylineProps {
  author?: string;
  authorInitials?: string;
  reviewerName?: string;
  /** e.g. "Updated June 12, 2026" or "Published Mar 2026 · Updated Jun 2026". */
  dateLabel: string;
  center?: boolean;
}

/**
 * Avatar + author + "Medically reviewed by Dr. ___" + dates (REDESIGN_SPEC §3.3,
 * G1). Used on guides, listicles, and reviews. The reviewer line is the
 * non-negotiable credibility signal.
 */
export function MedicallyReviewedByline({
  author = siteConfig.author,
  authorInitials = "AC",
  reviewerName = reviewer.shortName,
  dateLabel,
  center = false,
}: MedicallyReviewedBylineProps) {
  return (
    <div className={`byline not-prose${center ? " center" : ""}`}>
      <span className="av">{authorInitials}</span>
      <b>{author}</b>
      <span className="vline" />
      <span className="medrev">
        <Icon name="shield" /> Medically reviewed by {reviewerName}
      </span>
      <span className="vline" />
      <span>{dateLabel}</span>
    </div>
  );
}

interface ArticleMetaProps {
  author?: string;
  authorInitials?: string;
  reviewerName?: string;
  /** e.g. "9 min read · Jun 2026". */
  readMeta: string;
  shareUrl?: string;
  shareTitle?: string;
}

/** Article meta row with share links (REDESIGN_SPEC §4.4). */
export function ArticleMeta({
  author = siteConfig.author,
  authorInitials = "AC",
  reviewerName = reviewer.name,
  readMeta,
  shareUrl,
  shareTitle,
}: ArticleMetaProps) {
  const xHref = shareUrl
    ? `https://x.com/intent/tweet?url=${encodeURIComponent(shareUrl)}${
        shareTitle ? `&text=${encodeURIComponent(shareTitle)}` : ""
      }`
    : undefined;

  return (
    <div className="artmeta not-prose">
      <span className="av">{authorInitials}</span>
      <span>
        <b>{author}</b>
      </span>
      <span className="vline" />
      <span className="medrev">
        <Icon name="shield" /> Reviewed by {reviewerName}
      </span>
      <span className="vline" />
      <span>{readMeta}</span>
      {(xHref || shareUrl) && (
        <span className="share">
          {xHref && (
            <a href={xHref} target="_blank" rel="noopener" aria-label="Share on X">
              <Icon name="shareX" />
            </a>
          )}
          {shareUrl && (
            <a href={shareUrl} aria-label="Permalink">
              <Icon name="link" />
            </a>
          )}
        </span>
      )}
    </div>
  );
}
