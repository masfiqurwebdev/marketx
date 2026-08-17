"use client";

import { Star, Trash2 } from "lucide-react";

import { useReviews } from "../../context/ReviewContext";

export default function ReviewList({
  product,
}) {
  const {
    getProductReviews,
    deleteReview,
  } = useReviews();

  const reviews = getProductReviews(
    product.id
  );

  if (reviews.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center">
        <p className="text-sm text-gray-500">
          No customer reviews yet.
        </p>

        <p className="mt-1 text-xs text-gray-400">
          Be the first person to review this
          product.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews
        .slice()
        .reverse()
        .map((review) => (
          <div
            key={review.id}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">

              <div>
                <h4 className="font-bold text-gray-900">
                  {review.name}
                </h4>

                <div className="mt-1 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(
                    (star) => (
                      <Star
                        key={star}
                        size={15}
                        className={
                          star <=
                          review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    )
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  deleteReview(
                    product.id,
                    review.id
                  )
                }
                className="text-gray-400 transition hover:text-red-500"
                aria-label="Delete review"
              >
                <Trash2 size={17} />
              </button>
            </div>

            <p className="mt-4 text-sm leading-6 text-gray-600">
              {review.comment}
            </p>

            <p className="mt-3 text-xs text-gray-400">
              {new Date(
                review.date
              ).toLocaleDateString()}
            </p>
          </div>
        ))}
    </div>
  );
}