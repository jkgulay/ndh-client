import { Star } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import type { TranslationKey } from "../../i18n/LanguageContext";

interface StarRatingProps {
  value: number;
  onChange: (rating: number) => void;
}

const RATING_VALUES = [1, 2, 3, 4, 5] as const;
const RATING_LABEL_KEYS: Record<number, TranslationKey> = {
  1: "feedback.ratingPoor",
  2: "feedback.ratingFair",
  3: "feedback.ratingGood",
  4: "feedback.ratingVeryGood",
  5: "feedback.ratingExcellent",
};

export function StarRating({ value, onChange }: StarRatingProps): React.JSX.Element {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const displayedRating = hoveredRating ?? value;
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center gap-2">
      <div role="radiogroup" aria-label="Rating" className="flex items-center gap-1.5" onMouseLeave={() => setHoveredRating(null)}>
        {RATING_VALUES.map((star) => (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={value === star}
            aria-label={`${star} star${star > 1 ? "s" : ""} - ${t(RATING_LABEL_KEYS[star])}`}
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
      <p className="h-5 text-sm font-bold text-primary-700">{displayedRating > 0 ? t(RATING_LABEL_KEYS[displayedRating]) : ""}</p>
    </div>
  );
}

interface StarRatingDisplayProps {
  rating: number;
}

export function StarRatingDisplay({ rating }: StarRatingDisplayProps): React.JSX.Element {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {RATING_VALUES.map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${star <= rating ? "fill-amber-400 text-amber-400" : "fill-transparent text-slate-300"}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
