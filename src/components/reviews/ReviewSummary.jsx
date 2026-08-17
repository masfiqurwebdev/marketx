"use client";

import { Star } from "lucide-react";
import { useReviews } from "../../context/ReviewContext";

export default function ReviewSummary({
  product,
}) {
  const { getProductReviews } = useReviews();

  const reviews = getProductReviews(product.id);

  const productRating = Number(product.rating) || 0;

  const averageRating =
    reviews.length > 0
      ? reviews.reduce(
          (total, review) =>
            total + Number(review.rating),
          0
        ) / reviews.length
      : productRating;

  const totalReviews =
    reviews.length +
    (Number(product.reviews) || 0);

  const ratingCounts = {
    5: reviews.filter(
      (review) => review.rating === 5
    ).length,

    4: reviews.filter(
      (review) => review.rating === 4
    ).length,

    3: reviews.filter(
      (review) => review.rating === 3
    ).length,

    2: reviews.filter(
      (review) => review.rating === 2
    ).length,

    1: reviews.filter(
      (review) => review.rating === 1
    ).length,
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="grid gap-8 md:grid-cols-[220px_1fr]">

        {/* Average */}
        <div className="flex flex-col items-center justify-center border-b pb-6 md:border-b-0 md:border-r md:pb-0">
          <div className="text-5xl font-bold text-gray-900">
            {averageRating.toFixed(1)}
          </div>

          <div className="mt-2 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map(
              (star) => (
                <Star
                  key={star}
                  size={18}
                  className={
                    star <=
                    Math.round(
                      averageRating
                    )
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }
                />
              )
            )}
          </div>

          <p className="mt-2 text-sm text-gray-500">
            {totalReviews} reviews
          </p>
        </div>

        {/* Rating Bars */}
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map(
            (rating) => {
              const count =
                ratingCounts[rating];

              const percentage =
                reviews.length > 0
                  ? (count /
                      reviews.length) *
                    100
                  : 0;

              return (
                <div
                  key={rating}
                  className="flex items-center gap-3"
                >
                  <span className="w-8 text-sm font-medium text-gray-600">
                    {rating}★
                  </span>

                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-yellow-400"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>

                  <span className="w-8 text-right text-xs text-gray-400">
                    {count}
                  </span>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}