"use client";

import {
  X,
  RotateCcw,
  Star,
} from "lucide-react";

export default function MobileFilters({
  open,
  setOpen,
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
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">

      {/* Overlay */}
      <button
        type="button"
        aria-label="Close filters"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-black/40"
      />

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-[88%] max-w-[380px] overflow-y-auto bg-white shadow-xl">

        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-5 py-4">

          <h2 className="text-lg font-bold text-gray-900">
            Filters
          </h2>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600"
          >
            <X size={19} />
          </button>
        </div>

        <div className="p-5">

          {/* Category */}
          <div>
            <h3 className="text-sm font-bold text-gray-900">
              Category
            </h3>

            <div className="mt-3 space-y-2">

              <button
                type="button"
                onClick={() =>
                  setSelectedCategory("all")
                }
                className={`w-full rounded-lg px-3 py-2 text-left text-sm ${
                  selectedCategory === "all"
                    ? "bg-emerald-50 font-semibold text-emerald-600"
                    : "text-gray-600"
                }`}
              >
                All Products
              </button>

              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    setSelectedCategory(category)
                  }
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm ${
                    selectedCategory === category
                      ? "bg-emerald-50 font-semibold text-emerald-600"
                      : "text-gray-600"
                  }`}
                >
                  {category}
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

              <input
                type="number"
                min="0"
                value={minPrice}
                onChange={(e) =>
                  setMinPrice(e.target.value)
                }
                placeholder="Min"
                className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-emerald-500"
              />

              <input
                type="number"
                min="0"
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(e.target.value)
                }
                placeholder="Max"
                className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-emerald-500"
              />

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
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 ${
                    minRating === rating
                      ? "bg-emerald-50"
                      : ""
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

                  <span className="text-sm text-gray-500">
                    & up
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex gap-3">

            <button
              type="button"
              onClick={clearFilters}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-700"
            >
              <RotateCcw size={16} />
              Clear
            </button>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex flex-1 items-center justify-center rounded-xl bg-emerald-500 py-3 text-sm font-bold text-white"
            >
              Apply Filters
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}