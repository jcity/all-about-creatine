import { Icon } from "@/components/ui/Icons";

interface VerdictBoxProps {
  score: number;
  children: React.ReactNode;
  heading?: string;
}

/** Navy verdict panel with gold score badge (REDESIGN_SPEC §3.9). */
export function VerdictBox({ score, children, heading = "The verdict" }: VerdictBoxProps) {
  return (
    <div className="verdict not-prose">
      <div className="vh">
        <Icon name="trophy" />
        <b>{heading}</b>
        <span className="vscore">{score.toFixed(1)} / 5</span>
      </div>
      <p>{children}</p>
    </div>
  );
}
