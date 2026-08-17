"use client";

import { useMemo, useState } from "react";
import products from "../../data/products";
import ProductCard from "../products/ProductCard";
import ShopFilters from "./ShopFilters";
import ShopToolbar from "./ShopToolbar";
import MobileFilters from "./MobileFilters";

export default function ShopContent({
  initialSearch = "",
}) {
  const [search, setSearch] = useState(initialSearch);

  const [category, setCategory] = useState("all");

  const [minPrice, setMinPrice] = useState("");

  const [maxPrice, setMaxPrice] = useState("");

  const [rating, setRating] = useState(0);

  const [sort, setSort] = useState("featured");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (search.trim()) {
      const searchTerm = search.toLowerCase().trim();

      result = result.filter((product) => {
        return (
          product.name
            ?.toLowerCase()
            .includes(searchTerm) ||
          product.category
            ?.toLowerCase()
            .includes(searchTerm)
        );
      });
    }

    // Category
    if (category !== "all") {
      result = result.filter(
        (product) =>
          product.category === category
      );
    }

    // Minimum price
    if (minPrice !== "") {
      result = result.filter(
        (product) =>
          product.price >= Number(minPrice)
      );
    }

    // Maximum price
    if (maxPrice !== "") {
      result = result.filter(
        (product) =>
          product.price <= Number(maxPrice)
      );
    }

    // Rating
    if (rating > 0) {
      result = result.filter(
        (product) =>
          product.rating >= rating
      );
    }

    // Sorting
    switch (sort) {
      case "price-low":
        result.sort(
          (a, b) => a.price - b.price
        );
        break;

      case "price-high":
        result.sort(
          (a, b) => b.price - a.price
        );
        break;

      case "rating":
        result.sort(
          (a, b) => b.rating - a.rating
        );
        break;

      case "popular":
        result.sort(
          (a, b) => b.reviews - a.reviews
        );
        break;

      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt || 0) -
            new Date(a.createdAt || 0)
        );
        break;

      default:
        break;
    }

    return result;
  }, [
    search,
    category,
    minPrice,
    maxPrice,
    rating,
    sort,
  ]);

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setMinPrice("");
    setMaxPrice("");
    setRating(0);
    setSort("featured");
  };

  const hasFilters =
    search ||
    category !== "all" ||
    minPrice !== "" ||
    maxPrice !== "" ||
    rating > 0;

  return (
    <section className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">

      {/* Header */}
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

        {/* Desktop Filters */}
        <ShopFilters
          category={category}
          setCategory={setCategory}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          rating={rating}
          setRating={setRating}
          clearFilters={clearFilters}
        />

        {/* Product Area */}
        <div className="min-w-0 flex-1">

          {/* Mobile Filters */}
          <div className="mb-4 lg:hidden">
            <MobileFilters
              category={category}
              setCategory={setCategory}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              rating={rating}
              setRating={setRating}
              clearFilters={clearFilters}
            />
          </div>

          {/* Toolbar */}
          <ShopToolbar
            search={search}
            setSearch={setSearch}
            productCount={filteredProducts.length}
            sort={sort}
            setSort={setSort}
            hasFilters={hasFilters}
            clearFilters={clearFilters}
          />

          {/* Active Filter */}
          {hasFilters && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-gray-500">
                Active filters:
              </span>

              {search && (
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
                  Search: {search}
                </span>
              )}

              {category !== "all" && (
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
                  {category}
                </span>
              )}

              {minPrice && (
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
                  Min: ${minPrice}
                </span>
              )}

              {maxPrice && (
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
                  Max: ${maxPrice}
                </span>
              )}

              {rating > 0 && (
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
                  {rating}★ & up
                </span>
              )}
            </div>
          )}

          {/* Products */}
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
            <div className="mt-5 rounded-2xl border border-gray-100 bg-white px-5 py-20 text-center">
              <div className="mx-auto max-w-md">
                <h2 className="text-xl font-bold text-gray-900">
                  No products found
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  We couldn't find any products matching
                  your current filters.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-600"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}