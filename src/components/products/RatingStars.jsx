"use client";

import { Star } from "lucide-react";

export default function RatingStars({
  rating = 0,
  size = 18,
  interactive = false,
  onChange,
}) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(
        (star) => {
          const filled =
            star <= rating;

          return (
            <button
              key={star}
              type={
                interactive
                  ? "button"
                  : undefined
              }
              disabled={!interactive}
              onClick={() =>
                interactive &&
                onChange?.(star)
              }
              className={
                interactive
                  ? "cursor-pointer transition hover:scale-110"
                  : "cursor-default"
              }
              aria-label={`${star} star`}
            >
              <Star
                size={size}
                className={
                  filled
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />
            </button>
          );
        }
      )}
    </div>
  );
}