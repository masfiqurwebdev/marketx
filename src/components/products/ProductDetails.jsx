"use client";

import Link from "next/link";
import {
  ChevronRight,
  Heart,
} from "lucide-react";

import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductFeatures from "./ProductFeatures";
import ProductDescription from "./ProductDescription";
import RelatedProducts from "./RelatedProducts";

import ProductReviews from "./ProductReviews";

import { useWishlist } from "../../context/WishlistContext";

import ReviewSummary from "../reviews/ReviewSummary";
import ReviewForm from "../reviews/ReviewForm";
import ReviewList from "../reviews/ReviewList";

export default function ProductDetails({
  product,
}) {
  const {
    toggleWishlist,
    isInWishlist,
  } = useWishlist();

  const wishlisted = isInWishlist(
    product.id
  );

  return (
    <section className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">

      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2 text-sm text-gray-400">
        <Link
          href="/"
          className="transition hover:text-emerald-500"
        >
          Home
        </Link>

        <ChevronRight size={15} />

        <Link
          href="/shop"
          className="transition hover:text-emerald-500"
        >
          Shop
        </Link>

        <ChevronRight size={15} />

        <span className="truncate text-gray-600">
          {product.name}
        </span>
      </div>

      {/* Main Product */}
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">

        {/* Gallery */}
        <ProductGallery
          product={product}
        />

        {/* Product Info */}
        <div className="relative">

          {/* Wishlist */}
          <button
            type="button"
            onClick={() =>
              toggleWishlist(product)
            }
            aria-label={
              wishlisted
                ? "Remove from wishlist"
                : "Add to wishlist"
            }
            className={`absolute right-0 top-0 z-10 flex h-11 w-11 items-center justify-center rounded-full border shadow-sm transition ${
              wishlisted
                ? "border-red-200 bg-red-50 text-red-500"
                : "border-gray-200 bg-white text-gray-600 hover:border-red-200 hover:text-red-500"
            }`}
          >
            <Heart
              size={20}
              fill={
                wishlisted
                  ? "currentColor"
                  : "none"
              }
            />
          </button>

          <ProductInfo
            product={product}
          />
        </div>
      </div>

      {/* Features */}
      <ProductFeatures />

      {/* Description */}
      <ProductDescription
        product={product}
      />

      <ProductReviews product={product} />

      {/* Reviews */}
      <section className="mt-16">

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-500">
            Customer Feedback
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            Reviews & Ratings
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            See what customers think about this
            product.
          </p>
        </div>

        {/* Summary */}
        <ReviewSummary
          product={product}
        />

        {/* Reviews + Form */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">

          {/* Review List */}
          <div>
            <h3 className="mb-4 text-xl font-bold text-gray-900">
              Customer Reviews
            </h3>

            <ReviewList
              product={product}
            />
          </div>

          {/* Review Form */}
          <div>
            <ReviewForm
              product={product}
            />
          </div>
        </div>
      </section>

      {/* Related Products */}
      <RelatedProducts
        product={product}
      />

    </section>
  );
}