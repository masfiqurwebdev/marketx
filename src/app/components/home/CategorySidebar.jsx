"use client";

import Link from "next/link";
import {
  Grid2X2,
  Monitor,
  Shirt,
  House,
  HeartPulse,
  Dumbbell,
  Car,
  BookOpen,
  Gamepad2,
  PawPrint,
  MoreHorizontal,
  ChevronRight,
} from "lucide-react";

const categories = [
  {
    name: "Electronics",
    slug: "electronics",
    icon: Monitor,
  },
  {
    name: "Fashion",
    slug: "fashion",
    icon: Shirt,
  },
  {
    name: "Home & Kitchen",
    slug: "home-kitchen",
    icon: House,
  },
  {
    name: "Beauty & Health",
    slug: "beauty-health",
    icon: HeartPulse,
  },
  {
    name: "Sports & Outdoors",
    slug: "sports-outdoors",
    icon: Dumbbell,
  },
  {
    name: "Automotive",
    slug: "automotive",
    icon: Car,
  },
  {
    name: "Books & Stationery",
    slug: "books-stationery",
    icon: BookOpen,
  },
  {
    name: "Toys & Games",
    slug: "toys-games",
    icon: Gamepad2,
  },
  {
    name: "Pet Supplies",
    slug: "pet-supplies",
    icon: PawPrint,
  },
];

export default function CategorySidebar() {
  return (
    <aside className="hidden w-[235px] shrink-0 lg:block">
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {/* Header */}
        <div className="flex h-14 items-center justify-between bg-emerald-500 px-5 text-white">
          <div className="flex items-center gap-3">
            <Grid2X2 size={19} />
            <span className="text-sm font-semibold">All Categories</span>
          </div>

          <ChevronRight size={18} />
        </div>

        {/* Categories */}
        <div className="p-2">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-emerald-50"
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={18}
                    strokeWidth={1.8}
                    className="text-gray-500 transition group-hover:text-emerald-500"
                  />

                  <span className="text-sm text-gray-700 transition group-hover:text-emerald-600">
                    {category.name}
                  </span>
                </div>

                <ChevronRight
                  size={15}
                  className="text-gray-300 transition group-hover:text-emerald-500"
                />
              </Link>
            );
          })}

          {/* More Categories */}
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-600">
            <MoreHorizontal size={18} />

            <span>More Categories</span>
          </button>
        </div>
      </div>
    </aside>
  );
}