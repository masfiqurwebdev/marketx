"use client";

import { useMemo, useState } from "react";
import products from "../../data/products";
import ProductCard from "../products/ProductCard";
import ShopFilters from "./ShopFilters";
import ShopToolbar from "./ShopToolbar";
import MobileFilters from "./MobileFilters";

export default function ShopContent() {
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (category !== "all") {
      result = result.filter(
        (product) => product.category === category
      );
    }

    // Sorting
    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sort === "popular") {
      result.sort((a, b) => b.reviews - a.reviews);
    }

    return result;
  }, [category, sort]);

  return (
    <section className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8">
        <p className="text-sm font-medium text-emerald-500">
          Home / Shop
        </p>

        <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
          Shop All Products
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Discover our collection of quality products.
        </p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <ShopFilters
          category={category}
          setCategory={setCategory}
        />

        {/* Products */}
        <div className="min-w-0 flex-1">
<div className="flex items-center justify-between gap-3">
  <MobileFilters
    category={category}
    setCategory={setCategory}
  />

  <div className="flex-1">
    <ShopToolbar
      productCount={filteredProducts.length}
      sort={sort}
      setSort={setSort}
    />
  </div>
</div>

          {filteredProducts.length > 0 ? (
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-2xl border border-gray-100 bg-white py-20 text-center">
              <h2 className="text-lg font-bold text-gray-900">
                No products found
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Try selecting another category.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
