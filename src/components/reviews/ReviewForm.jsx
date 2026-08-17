"use client";

import { useState } from "react";
import { Star } from "lucide-react";

import { useReviews } from "../../context/ReviewContext";

export default function ReviewForm({
  product,
}) {
  const { addReview } = useReviews();

  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] =
    useState("");

  const [error, setError] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (rating === 0) {
      setError(
        "Please select a rating."
      );
      return;
    }

    if (!comment.trim()) {
      setError(
        "Please write a review."
      );
      return;
    }

    addReview(product.id, {
      name: name.trim(),
      rating,
      comment: comment.trim(),
    });

    setName("");
    setRating(0);
    setComment("");
    setError("");
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900">
        Write a Review
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        Share your experience with this
        product.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-5"
      >
        {/* Name */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Your Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Enter your name"
            className="h-11 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none transition focus:border-emerald-500"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Your Rating
          </label>

          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map(
              (star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() =>
                    setRating(star)
                  }
                  className="p-1"
                >
                  <Star
                    size={24}
                    className={
                      star <= rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                </button>
              )
            )}
          </div>
        </div>

        {/* Comment */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Your Review
          </label>

          <textarea
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
            placeholder="Write your review..."
            rows={5}
            className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm font-medium text-red-500">
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-600"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}