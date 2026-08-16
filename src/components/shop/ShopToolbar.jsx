import { ChevronDown } from "lucide-react";

export default function ShopToolbar({
  productCount,
  sort,
  setSort,
}) {
  return (
    <div className="flex flex-col justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
      {/* Result Count */}
      <p className="text-sm text-gray-500">
        Showing{" "}
        <span className="font-semibold text-gray-900">
          {productCount}
        </span>{" "}
        products
      </p>

      {/* Sort */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">
          Sort by:
        </span>

        <div className="relative">
          <select
            value={sort}
            onChange={(event) =>
              setSort(event.target.value)
            }
            className="appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-gray-700 outline-none transition focus:border-emerald-500"
          >
            <option value="featured">
              Featured
            </option>

            <option value="popular">
              Most Popular
            </option>

            <option value="rating">
              Highest Rated
            </option>

            <option value="price-low">
              Price: Low to High
            </option>

            <option value="price-high">
              Price: High to Low
            </option>
          </select>

          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>
    </div>
  );
}