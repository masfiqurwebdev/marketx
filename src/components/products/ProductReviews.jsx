"use client";

import {
  CalendarDays,
  Trash2,
} from "lucide-react";

import {
  useMemo,
} from "react";

import {
  useReviews,
} from "../../context/ReviewContext";

import RatingStars from "./RatingStars";
import ReviewForm from "./ReviewForm";

export default function ProductReviews({
  product,
}) {
  const {
    getProductReviews,
    deleteReview,
  } = useReviews();

  const productReviews =
    getProductReviews(
      product.id
    );

  // Average rating
  const averageRating =
    useMemo(() => {
      if (
        productReviews.length === 0
      ) {
        return 0;
      }

      const total =
        productReviews.reduce(
          (sum, review) =>
            sum +
            Number(review.rating),
          0
        );

      return total / productReviews.length;
    }, [productReviews]);

  // Rating counts
  const ratingCounts =
    useMemo(() => {
      return {
        5: productReviews.filter(
          (review) =>
            review.rating === 5
        ).length,

        4: productReviews.filter(
          (review) =>
            review.rating === 4
        ).length,

        3: productReviews.filter(
          (review) =>
            review.rating === 3
        ).length,

        2: productReviews.filter(
          (review) =>
            review.rating === 2
        ).length,

        1: productReviews.filter(
          (review) =>
            review.rating === 1
        ).length,
      };
    }, [productReviews]);

  const formatDate = (date) => {
    return new Date(
      date
    ).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
  };

  return (
    <section className="mt-12 border-t border-gray-100 pt-10">

      {/* Heading */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-500">
          Customer Feedback
        </p>

        <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
          Product Reviews
        </h2>
      </div>

      {/* Rating Summary */}
      <div className="mt-8 grid gap-6 rounded-2xl border border-gray-100 bg-white p-6 md:grid-cols-[220px_1fr]">

        {/* Average */}
        <div className="flex flex-col items-center justify-center border-b border-gray-100 pb-6 md:border-b-0 md:border-r md:pb-0 md:pr-6">

          <div className="text-5xl font-bold text-gray-900">
            {averageRating.toFixed(1)}
          </div>

          <RatingStars
            rating={Math.round(
              averageRating
            )}
            size={20}
          />

          <p className="mt-2 text-sm text-gray-500">
            {productReviews.length}{" "}
            {productReviews.length ===
            1
              ? "review"
              : "reviews"}
          </p>
        </div>

        {/* Distribution */}
        <div className="flex flex-col justify-center gap-3">

          {[5, 4, 3, 2, 1].map(
            (rating) => {
              const count =
                ratingCounts[
                  rating
                ];

              const percentage =
                productReviews.length
                  ? (count /
                      productReviews.length) *
                    100
                  : 0;

              return (
                <div
                  key={rating}
                  className="flex items-center gap-3"
                >
                  <span className="w-8 text-sm font-medium text-gray-600">
                    {rating}
                  </span>

                  <RatingStars
                    rating={rating}
                    size={14}
                  />

                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-yellow-400"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>

                  <span className="w-6 text-right text-xs text-gray-400">
                    {count}
                  </span>
                </div>
              );
            }
          )}
        </div>
      </div>

      {/* Review Form */}
      <div className="mt-8">
        <ReviewForm
          productId={product.id}
        />
      </div>

      {/* Reviews */}
      <div className="mt-8">

        {productReviews.length ===
        0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-12 text-center">

            <h3 className="text-lg font-bold text-gray-900">
              No Reviews Yet
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Be the first person to
              review this product.
            </p>

          </div>
        ) : (
          <div className="space-y-4">

            {productReviews.map(
              (review) => (
                <article
                  key={review.id}
                  className="rounded-2xl border border-gray-100 bg-white p-5"
                >

                  {/* Top */}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                    <div>
                      <h3 className="font-bold text-gray-900">
                        {review.name}
                      </h3>

                      <div className="mt-1 flex items-center gap-2">
                        <RatingStars
                          rating={
                            review.rating
                          }
                          size={15}
                        />

                        <span className="text-xs text-gray-400">
                          {review.rating}.0
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">

                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <CalendarDays
                          size={13}
                        />

                        {formatDate(
                          review.date
                        )}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          deleteReview(
                            review.id
                          )
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                        aria-label="Delete review"
                      >
                        <Trash2
                          size={15}
                        />
                      </button>

                    </div>
                  </div>

                  {/* Comment */}
                  <p className="mt-4 text-sm leading-7 text-gray-600">
                    {review.comment}
                  </p>

                </article>
              )
            )}

          </div>
        )}

      </div>
    </section>
  );
}