"use client";

import Link from "next/link";
import {
  ArrowRight,
  Heart,
  ShoppingCart,
  Trash2,
} from "lucide-react";

import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

export default function WishlistContent() {
  const {
    wishlist,
    removeFromWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  return (
    <section className="mx-auto max-w-[1500px] px-4 py-10 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-medium text-emerald-500">
          Home / Wishlist
        </p>

        <div className="mt-2 flex items-center gap-3">
          <Heart
            size={28}
            className="text-red-500"
            fill="currentColor"
          />

          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            My Wishlist
          </h1>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          {wishlist.length}{" "}
          {wishlist.length === 1
            ? "product"
            : "products"}{" "}
          saved
        </p>
      </div>

      {/* Empty Wishlist */}
      {wishlist.length === 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-white px-5 py-20 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <Heart
              size={28}
              className="text-red-400"
            />
          </div>

          <h2 className="mt-5 text-xl font-bold text-gray-900">
            Your wishlist is empty
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
            Save products you love and find them
            here whenever you come back.
          </p>

          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-600"
          >
            Continue Shopping

            <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >

              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Remove */}
                <button
                  type="button"
                  onClick={() =>
                    removeFromWishlist(product.id)
                  }
                  aria-label="Remove from wishlist"
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-red-500 shadow-sm transition hover:bg-red-50"
                >
                  <Trash2 size={17} />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">

                <p className="text-xs font-medium capitalize text-gray-400">
                  {product.category}
                </p>

                <Link
                  href={`/products/${product.id}`}
                  className="mt-1 block line-clamp-2 text-base font-bold text-gray-900 hover:text-emerald-500"
                >
                  {product.name}
                </Link>

                {/* Rating */}
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm font-semibold text-yellow-500">
                    ★ {product.rating}
                  </span>

                  <span className="text-xs text-gray-400">
                    ({product.reviews})
                  </span>
                </div>

                {/* Bottom */}
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-lg font-bold text-gray-900">
                    ${product.price}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      handleAddToCart(product)
                    }
                    className="flex items-center gap-2 rounded-xl bg-emerald-500 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-600"
                  >
                    <ShoppingCart size={15} />

                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}