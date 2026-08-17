"use client";

import {
  Filter,
  SlidersHorizontal,
} from "lucide-react";

export default function ShopToolbar({
  resultCount,
  sortBy,
  setSortBy,
  setMobileFiltersOpen,
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">

      {/* Result */}
      <p className="text-sm text-gray-500">
        Showing{" "}
        <span className="font-bold text-gray-900">
          {resultCount}
        </span>{" "}
        products
      </p>

      <div className="flex items-center gap-3">

        {/* Mobile filter */}
        <button
          type="button"
          onClick={() =>
            setMobileFiltersOpen(true)
          }
          className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-emerald-500 hover:text-emerald-500 lg:hidden"
        >
          <Filter size={16} />
          Filters
        </button>

        {/* Sort */}
        <div className="flex items-center gap-2">

          <SlidersHorizontal
            size={16}
            className="hidden text-gray-400 sm:block"
          />

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
            className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 outline-none focus:border-emerald-500"
          >
            <option value="default">
              Sort: Default
            </option>

            <option value="price-low">
              Price: Low to High
            </option>

            <option value="price-high">
              Price: High to Low
            </option>

            <option value="rating">
              Rating: High to Low
            </option>

            <option value="name">
              Name: A to Z
            </option>
          </select>

        </div>
      </div>
    </div>
  );
}