import { Icon } from "@/components/ui/Icons";
import { reviewer } from "@/lib/constants";

/**
 * "Why you can trust us" reviewer card for the home authority band
 * (REDESIGN_SPEC §3.16, §4.1).
 */
export function ReviewerCard() {
  return (
    <div className="reviewer">
      <div className="rv-top">
        <div className="rv-av">{reviewer.initials}</div>
        <div>
          <h4>{reviewer.name}</h4>
          <div className="role">{reviewer.role} · Medical Reviewer</div>
          <span className="rv-badge">
            <Icon name="shield" /> Medically reviewed
          </span>
        </div>
      </div>
      <blockquote>&ldquo;{reviewer.quote}&rdquo;</blockquote>
    </div>
  );
}
