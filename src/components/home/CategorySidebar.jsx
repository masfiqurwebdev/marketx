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
    subcategories: [
      "Mobile Phones",
      "Laptops",
      "Tablets",
      "Headphones",
      "Cameras",
      "Smart Watches",
    ],
  },
  {
    name: "Fashion",
    slug: "fashion",
    icon: Shirt,
    subcategories: [
      "Men's Clothing",
      "Women's Clothing",
      "Shoes",
      "Bags",
      "Accessories",
      "Watches",
    ],
  },
  {
    name: "Home & Kitchen",
    slug: "home-kitchen",
    icon: House,
    subcategories: [
      "Furniture",
      "Kitchen Appliances",
      "Home Decor",
      "Lighting",
      "Bedding",
      "Storage",
    ],
  },
  {
    name: "Beauty & Health",
    slug: "beauty-health",
    icon: HeartPulse,
    subcategories: [
      "Skincare",
      "Makeup",
      "Hair Care",
      "Fragrances",
      "Personal Care",
      "Health Products",
    ],
  },
  {
    name: "Sports & Outdoors",
    slug: "sports-outdoors",
    icon: Dumbbell,
    subcategories: [
      "Fitness Equipment",
      "Running",
      "Cycling",
      "Football",
      "Cricket",
      "Outdoor Gear",
    ],
  },
  {
    name: "Automotive",
    slug: "automotive",
    icon: Car,
    subcategories: [
      "Car Accessories",
      "Motorcycle Accessories",
      "Car Electronics",
      "Tools",
      "Oils & Fluids",
      "Cleaning",
    ],
  },
  {
    name: "Books & Stationery",
    slug: "books-stationery",
    icon: BookOpen,
    subcategories: [
      "Books",
      "Notebooks",
      "Pens",
      "Office Supplies",
      "School Supplies",
      "Art Supplies",
    ],
  },
  {
    name: "Toys & Games",
    slug: "toys-games",
    icon: Gamepad2,
    subcategories: [
      "Action Figures",
      "Board Games",
      "Remote Control",
      "Educational Toys",
      "Outdoor Toys",
      "Video Games",
    ],
  },
  {
    name: "Pet Supplies",
    slug: "pet-supplies",
    icon: PawPrint,
    subcategories: [
      "Dog Supplies",
      "Cat Supplies",
      "Bird Supplies",
      "Pet Food",
      "Pet Toys",
      "Pet Grooming",
    ],
  },
];

export default function CategorySidebar() {
  return (
    <aside className="relative hidden w-[235px] shrink-0 lg:block">
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
        {/* Header */}
        <div className="flex h-14 items-center justify-between rounded-t-2xl bg-emerald-500 px-5 text-white">
          <div className="flex items-center gap-3">
            <Grid2X2 size={19} />

            <span className="text-sm font-semibold">
              All Categories
            </span>
          </div>

          <ChevronRight size={18} />
        </div>

        {/* Categories */}
        <div className="p-2">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <div
                key={category.slug}
                className="relative"
              >
                {/* Category Item */}
                <Link
                  href={`/categories/${category.slug}`}
                  className="category-item group flex items-center justify-between rounded-xl px-3 py-3"
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      size={18}
                      strokeWidth={1.8}
                      className="text-gray-500"
                    />

                    <span className="text-sm text-gray-700">
                      {category.name}
                    </span>
                  </div>

                  <ChevronRight
                    size={15}
                    className="text-gray-300"
                  />
                </Link>

                {/* Subcategory */}
                <div className="subcategory-menu">
                  <div className="mb-2 border-b border-gray-100 px-3 pb-3">
                    <h3 className="text-sm font-semibold text-gray-900">
                      {category.name}
                    </h3>

                    <p className="mt-1 text-xs text-gray-400">
                      Explore {category.name}
                    </p>
                  </div>

                  <div>
                    {category.subcategories.map((subcategory) => (
                      <Link
                        key={subcategory}
                        href={`/categories/${category.slug}/${subcategory
                          .toLowerCase()
                          .replaceAll(" ", "-")
                          .replaceAll("'", "")}`}
                        className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
                      >
                        <span>{subcategory}</span>

                        <ChevronRight size={14} />
                      </Link>
                    ))}
                  </div>

                  <Link
                    href={`/categories/${category.slug}`}
                    className="mt-2 block border-t border-gray-100 px-3 pt-3 text-sm font-semibold text-emerald-500"
                  >
                    View All {category.name}
                  </Link>
                </div>
              </div>
            );
          })}

          {/* More */}
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600">
            <MoreHorizontal size={18} />

            <span>More Categories</span>
          </button>
        </div>
      </div>
    </aside>
  );
}