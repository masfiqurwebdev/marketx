import Link from "next/link";
import { ArrowRight } from "lucide-react";
import products from "../../data/products";

import ProductCard from "../products/ProductCard";

export default function NewArrivals() {
  const newProducts = [...products].reverse().slice(0, 4);

  return (
    <section className="mx-auto max-w-[1500px] px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="mb-1 text-sm font-semibold text-emerald-500">
            Just arrived
          </p>

          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            New Arrivals
          </h2>
        </div>

        <Link
          href="/shop?sort=newest"
          className="flex items-center gap-2 text-sm font-semibold text-emerald-500 hover:text-emerald-600"
        >
          View All

          <ArrowRight size={17} />
        </Link>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {newProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}