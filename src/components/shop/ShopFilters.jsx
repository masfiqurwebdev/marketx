"use client";

import { RotateCcw, Star } from "lucide-react";

export default function ShopFilters({
  categories = [],
  selectedCategory,
  setSelectedCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  minRating,
  setMinRating,
  clearFilters,
}) {
  return (
    <aside className="w-full lg:w-[260px] lg:shrink-0">
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">
            Filters
          </h2>

          <button
            type="button"
            onClick={clearFilters}
            className="flex items-center gap-1 text-xs font-semibold text-emerald-500 transition hover:text-emerald-600"
          >
            <RotateCcw size={13} />
            Clear
          </button>
        </div>

        {/* Category */}
        <div className="mt-7">
          <h3 className="text-sm font-bold text-gray-900">
            Category
          </h3>

          <div className="mt-3 space-y-2">

            <button
              type="button"
              onClick={() =>
                setSelectedCategory("all")
              }
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${
                selectedCategory === "all"
                  ? "bg-emerald-50 font-semibold text-emerald-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span>All Products</span>
            </button>

            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() =>
                  setSelectedCategory(category)
                }
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${
                  selectedCategory === category
                    ? "bg-emerald-50 font-semibold text-emerald-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span>{category}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="mt-7 border-t border-gray-100 pt-6">
          <h3 className="text-sm font-bold text-gray-900">
            Price Range
          </h3>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <div>
              <label className="mb-1 block text-xs text-gray-400">
                Min
              </label>

              <input
                type="number"
                min="0"
                value={minPrice}
                onChange={(e) =>
                  setMinPrice(e.target.value)
                }
                placeholder="0"
                className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs text-gray-400">
                Max
              </label>

              <input
                type="number"
                min="0"
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(e.target.value)
                }
                placeholder="1000"
                className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="mt-7 border-t border-gray-100 pt-6">
          <h3 className="text-sm font-bold text-gray-900">
            Customer Rating
          </h3>

          <div className="mt-3 space-y-2">

            {[4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() =>
                  setMinRating(
                    minRating === rating
                      ? 0
                      : rating
                  )
                }
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                  minRating === rating
                    ? "bg-emerald-50"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(
                    (star) => (
                      <Star
                        key={star}
                        size={14}
                        className={
                          star <= rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    )
                  )}
                </div>

                <span
                  className={
                    minRating === rating
                      ? "font-semibold text-emerald-600"
                      : "text-gray-500"
                  }
                >
                  & up
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}