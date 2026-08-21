import { Star } from "lucide-react";
import { useState } from "react";

interface StarRatingProps {
  value: number;
  onChange: (rating: number) => void;
}

const RATING_VALUES = [1, 2, 3, 4, 5] as const;
const RATING_LABELS: Record<number, string> = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very good",
  5: "Excellent",
};

export function StarRating({ value, onChange }: StarRatingProps): React.JSX.Element {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const displayedRating = hoveredRating ?? value;

  return (
    <div className="flex flex-col items-center gap-2">
      <div role="radiogroup" aria-label="Rating" className="flex items-center gap-1.5" onMouseLeave={() => setHoveredRating(null)}>
        {RATING_VALUES.map((star) => (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={value === star}
            aria-label={`${star} star${star > 1 ? "s" : ""} - ${RATING_LABELS[star]}`}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onFocus={() => setHoveredRating(star)}
            onBlur={() => setHoveredRating(null)}
            className="rounded-md p-1 transition hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
          >
            <Star
              className={`h-9 w-9 transition-colors ${
                star <= displayedRating ? "fill-amber-400 text-amber-400" : "fill-transparent text-slate-300"
              }`}
              aria-hidden="true"
            />
          </button>
        ))}
      </div>
      <p className="h-5 text-sm font-bold text-primary-700">{displayedRating > 0 ? RATING_LABELS[displayedRating] : ""}</p>
    </div>
  );
}
