"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ReviewContext = createContext(null);

const STORAGE_KEY = "marketx-reviews";

export function ReviewProvider({ children }) {
  const [reviews, setReviews] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Load reviews from localStorage
  useEffect(() => {
    try {
      const savedReviews =
        localStorage.getItem(STORAGE_KEY);

      if (!savedReviews) {
        setReviews([]);
        setLoaded(true);
        return;
      }

      const parsedReviews =
        JSON.parse(savedReviews);

      // Make sure the stored value is an array
      if (Array.isArray(parsedReviews)) {
        setReviews(parsedReviews);
      } else {
        console.warn(
          "Invalid reviews data found in localStorage. Resetting reviews."
        );

        localStorage.removeItem(
          STORAGE_KEY
        );

        setReviews([]);
      }
    } catch (error) {
      console.error(
        "Failed to load reviews:",
        error
      );

      localStorage.removeItem(
        STORAGE_KEY
      );

      setReviews([]);
    }

    setLoaded(true);
  }, []);

  // Save reviews
  useEffect(() => {
    if (!loaded) return;

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(reviews)
      );
    } catch (error) {
      console.error(
        "Failed to save reviews:",
        error
      );
    }
  }, [reviews, loaded]);

  // Add review
  const addReview = ({
    productId,
    name,
    rating,
    comment,
  }) => {
    const newReview = {
      id: Date.now(),
      productId: String(productId),
      name: name.trim(),
      rating: Number(rating),
      comment: comment.trim(),
      date: new Date().toISOString(),
    };

    setReviews((previousReviews) => {
      const safeReviews =
        Array.isArray(previousReviews)
          ? previousReviews
          : [];

      return [
        newReview,
        ...safeReviews,
      ];
    });

    return newReview;
  };

  // Delete review
  const deleteReview = (reviewId) => {
    setReviews((previousReviews) => {
      const safeReviews =
        Array.isArray(previousReviews)
          ? previousReviews
          : [];

      return safeReviews.filter(
        (review) =>
          review.id !== reviewId
      );
    });
  };

  // Get reviews for a specific product
  const getProductReviews = (
    productId
  ) => {
    const safeReviews =
      Array.isArray(reviews)
        ? reviews
        : [];

    return safeReviews.filter(
      (review) =>
        String(review.productId) ===
        String(productId)
    );
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        addReview,
        deleteReview,
        getProductReviews,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
}

export function useReviews() {
  const context =
    useContext(ReviewContext);

  if (!context) {
    throw new Error(
      "useReviews must be used inside ReviewProvider"
    );
  }

  return context;
}