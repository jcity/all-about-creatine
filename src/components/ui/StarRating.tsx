import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

export function StarRating({ rating, maxRating = 5, size = "md", className }: StarRatingProps) {
  return (
    <div className={cn("flex items-center gap-0.5", className)} aria-label={`${rating} out of ${maxRating} stars`}>
      {Array.from({ length: maxRating }, (_, i) => {
        const filled = i < Math.floor(rating);
        const half = !filled && i < rating;
        return (
          <Star
            key={i}
            className={cn(
              sizes[size],
              filled
                ? "fill-accent-500 text-accent-500"
                : half
                  ? "fill-accent-500/50 text-accent-500"
                  : "fill-transparent text-border-strong"
            )}
          />
        );
      })}
      <span className="ml-1.5 text-sm font-medium text-text-secondary">{rating.toFixed(1)}</span>
    </div>
  );
}
