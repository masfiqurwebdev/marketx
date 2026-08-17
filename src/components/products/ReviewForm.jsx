"use client";

import { useState } from "react";
import RatingStars from "./RatingStars";
import { useReviews } from "../../context/ReviewContext";

export default function ReviewForm({
  productId,
}) {
  const { addReview } =
    useReviews();

  const [name, setName] =
    useState("");

  const [rating, setRating] =
    useState(0);

  const [comment, setComment] =
    useState("");

  const [message, setMessage] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage("");

    if (!name.trim()) {
      setMessage(
        "Please enter your name."
      );
      return;
    }

    if (rating === 0) {
      setMessage(
        "Please select a rating."
      );
      return;
    }

    if (!comment.trim()) {
      setMessage(
        "Please write a review."
      );
      return;
    }

    addReview({
      productId,
      name,
      rating,
      comment,
    });

    setName("");
    setRating(0);
    setComment("");

    setMessage(
      "Your review has been added successfully!"
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-gray-100 bg-gray-50 p-5"
    >
      <h3 className="text-lg font-bold text-gray-900">
        Write a Review
      </h3>

      {/* Name */}
      <div className="mt-5">
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
          className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-emerald-500"
        />
      </div>

      {/* Rating */}
      <div className="mt-5">
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Your Rating
        </label>

        <RatingStars
          rating={rating}
          size={24}
          interactive
          onChange={setRating}
        />
      </div>

      {/* Comment */}
      <div className="mt-5">
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
          className="w-full resize-none rounded-xl border border-gray-200 bg-white p-4 text-sm outline-none focus:border-emerald-500"
        />
      </div>

      {/* Message */}
      {message && (
        <p className="mt-3 text-sm text-emerald-600">
          {message}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="mt-5 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-600"
      >
        Submit Review
      </button>
    </form>
  );
}