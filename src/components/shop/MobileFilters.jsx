"use client";

import { useState } from "react";
import {
  SlidersHorizontal,
  X,
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

export default function MobileFilters({
  category,
  setCategory,
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Filter Button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-emerald-500 hover:text-emerald-500 lg:hidden"
      >
        <SlidersHorizontal size={17} />

        Filters
      </button>

      {/* Overlay + Drawer */}
      {open && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          {/* Overlay */}
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/40"
          />

          {/* Drawer */}
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-white shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-5 py-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal
                  size={19}
                  className="text-emerald-500"
                />

                <h2 className="font-bold text-gray-900">
                  Filters
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200"
                aria-label="Close filters"
              >
                <X size={19} />
              </button>
            </div>

            <div className="p-5">
              {/* Categories */}
              <div>
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
                        type="button"
                        onClick={() => {
                          setCategory(item.value);
                          setOpen(false);
                        }}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
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
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-500"
                  />

                  <span className="text-gray-400">
                    -
                  </span>

                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-500"
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
                      type="button"
                      className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm transition hover:bg-gray-50"
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

              {/* Apply Button */}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-8 w-full rounded-xl bg-emerald-500 py-3 text-sm font-bold text-white transition hover:bg-emerald-600"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}