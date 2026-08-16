import Link from "next/link";
import {
  Monitor,
  Shirt,
  House,
  HeartPulse,
  Dumbbell,
  Car,
} from "lucide-react";

const categories = [
  {
    name: "Electronics",
    slug: "electronics",
    icon: Monitor,
    products: "320+ Products",
  },
  {
    name: "Fashion",
    slug: "fashion",
    icon: Shirt,
    products: "540+ Products",
  },
  {
    name: "Home & Kitchen",
    slug: "home-kitchen",
    icon: House,
    products: "280+ Products",
  },
  {
    name: "Beauty & Health",
    slug: "beauty-health",
    icon: HeartPulse,
    products: "190+ Products",
  },
  {
    name: "Sports",
    slug: "sports-outdoors",
    icon: Dumbbell,
    products: "150+ Products",
  },
  {
    name: "Automotive",
    slug: "automotive",
    icon: Car,
    products: "120+ Products",
  },
];

export default function PopularCategories() {
  return (
    <section className="mx-auto max-w-[1500px] px-4 py-10 sm:px-6 lg:px-8">
      {/* Heading */}
      <div className="mb-6">
        <p className="mb-1 text-sm font-semibold text-emerald-500">
          Shop by category
        </p>

        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Popular Categories
        </h2>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="group rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-100 hover:shadow-md"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 transition duration-300 group-hover:bg-emerald-500 group-hover:text-white">
                <Icon size={28} strokeWidth={1.7} />
              </div>

              <h3 className="mt-4 text-sm font-bold text-gray-900">
                {category.name}
              </h3>

              <p className="mt-1 text-xs text-gray-400">
                {category.products}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}