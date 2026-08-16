"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";

export default function ProductCard({ product }) {
  const [liked, setLiked] = useState(false);

  const discount =
    product.oldPrice > product.price
      ? Math.round(
          ((product.oldPrice - product.price) / product.oldPrice) * 100
        )
      : 0;

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        {/* Discount */}
        {discount > 0 && (
          <span className="absolute left-3 top-3 z-10 rounded-lg bg-red-500 px-2.5 py-1 text-xs font-bold text-white">
            -{discount}%
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={() => setLiked(!liked)}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm transition hover:bg-emerald-500 hover:text-white"
          aria-label="Add to wishlist"
        >
          <Heart
            size={18}
            fill={liked ? "currentColor" : "none"}
            className={liked ? "text-red-500" : ""}
          />
        </button>

        {/* Product Image */}
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Add to Cart */}
        <button className="absolute bottom-3 left-3 right-3 flex translate-y-14 items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-white opacity-0 shadow-lg transition duration-300 hover:bg-emerald-600 group-hover:translate-y-0 group-hover:opacity-100">
          <ShoppingCart size={17} />

          Add to Cart
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <p className="mb-1 text-xs font-medium capitalize text-gray-400">
          {product.category}
        </p>

        {/* Name */}
        <Link href={`/products/${product.id}`}>
          <h3 className="line-clamp-2 min-h-[40px] text-sm font-semibold leading-5 text-gray-900 transition hover:text-emerald-500">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1">
          <Star
            size={15}
            fill="currentColor"
            className="text-yellow-400"
          />

          <span className="text-xs font-semibold text-gray-700">
            {product.rating}
          </span>

          <span className="text-xs text-gray-400">
            ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>

          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock */}
        <div className="mt-3">
          <div className="mb-1 flex justify-between text-[11px]">
            <span className="text-gray-400">Available</span>

            <span
              className={
                product.stock <= 10
                  ? "font-semibold text-red-500"
                  : "text-gray-400"
              }
            >
              {product.stock} left
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
            <div
              className={`h-full rounded-full ${
                product.stock <= 10
                  ? "w-1/4 bg-red-500"
                  : "w-2/3 bg-emerald-500"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}