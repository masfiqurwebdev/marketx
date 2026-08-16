import {
  SlidersHorizontal,
  Monitor,
  Shirt,
  House,
  HeartPulse,
  Dumbbell,
  Car,
} from "lucide-react";

const categories = [
  {
    name: "All Products",
    value: "all",
    icon: SlidersHorizontal,
  },
  {
    name: "Electronics",
    value: "electronics",
    icon: Monitor,
  },
  {
    name: "Fashion",
    value: "fashion",
    icon: Shirt,
  },
  {
    name: "Home & Kitchen",
    value: "home-kitchen",
    icon: House,
  },
  {
    name: "Beauty & Health",
    value: "beauty-health",
    icon: HeartPulse,
  },
  {
    name: "Sports",
    value: "sports-outdoors",
    icon: Dumbbell,
  },
  {
    name: "Automotive",
    value: "automotive",
    icon: Car,
  },
];

export default function ShopFilters({
  category,
  setCategory,
}) {
  return (
    <aside className="hidden w-[235px] shrink-0 lg:block">
      <div className="sticky top-24 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-gray-900">
            Filters
          </h2>

          <SlidersHorizontal
            size={18}
            className="text-emerald-500"
          />
        </div>

        {/* Category */}
        <div className="mt-6">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">
            Categories
          </h3>

          <div className="space-y-1">
            {categories.map((item) => {
              const Icon = item.icon;
              const active = category === item.value;

              return (
                <button
                  key={item.value}
                  onClick={() => setCategory(item.value)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                    active
                      ? "bg-emerald-50 font-semibold text-emerald-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={17} />

                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-100" />

        {/* Price */}
        <div>
          <h3 className="mb-4 text-sm font-semibold text-gray-900">
            Price Range
          </h3>

          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-emerald-500"
            />

            <span className="text-gray-400">
              -
            </span>

            <input
              type="number"
              placeholder="Max"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Rating */}
        <div className="mt-6">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">
            Rating
          </h3>

          <div className="space-y-2">
            {[5, 4, 3, 2].map((rating) => (
              <button
                key={rating}
                className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-gray-50"
              >
                <span className="text-yellow-400">
                  {"★".repeat(rating)}
                </span>

                <span className="text-gray-400">
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
