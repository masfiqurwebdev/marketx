"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";

import products from "../../data/products";

import ShopFilters from "../../components/shop/ShopFilters";
import MobileFilters from "../../components/shop/MobileFilters";
import ShopToolbar from "../../components/shop/ShopToolbar";
import ProductGrid from "../../components/products/ProductGrid";
import Pagination from "../../components/shop/Pagination";

const PRODUCTS_PER_PAGE = 8;

export default function ShopPage() {
  // ==========================================
  // STATES
  // ==========================================

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("all");

  const [minPrice, setMinPrice] =
    useState("");

  const [maxPrice, setMaxPrice] =
    useState("");

  const [minRating, setMinRating] =
    useState(0);

  const [sortBy, setSortBy] =
    useState("default");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [mobileFiltersOpen, setMobileFiltersOpen] =
    useState(false);

  const [urlReady, setUrlReady] =
    useState(false);

  // ==========================================
  // CATEGORIES
  // ==========================================

  const categories = useMemo(() => {
    return [
      ...new Set(
        products
          .map((product) => product.category)
          .filter(Boolean)
      ),
    ];
  }, []);

  // ==========================================
  // READ URL PARAMETERS
  // ==========================================

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    const urlSearch =
      params.get("search") || "";

    const urlCategory =
      params.get("category") || "all";

    const urlMinPrice =
      params.get("minPrice") || "";

    const urlMaxPrice =
      params.get("maxPrice") || "";

    const urlRating =
      Number(params.get("rating")) || 0;

    const urlSort =
      params.get("sort") || "default";

    const urlPage =
      Number(params.get("page")) || 1;

    setSearch(urlSearch);

    setSelectedCategory(
      urlCategory
    );

    setMinPrice(urlMinPrice);

    setMaxPrice(urlMaxPrice);

    setMinRating(urlRating);

    setSortBy(urlSort);

    setCurrentPage(
      urlPage > 0 ? urlPage : 1
    );

    setUrlReady(true);
  }, []);

  // ==========================================
  // FILTER PRODUCTS
  // ==========================================

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // -------------------------------
    // SEARCH
    // -------------------------------

if (search.trim()) {
  const searchWords = search
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  result = result.filter((product) => {
    const name =
      product.name?.toLowerCase() || "";

    const category =
      product.category?.toLowerCase() || "";

    const description =
      product.description?.toLowerCase() || "";

    const searchableText = `
      ${name}
      ${category}
      ${description}
    `.toLowerCase();

    return searchWords.every((word) =>
      searchableText.includes(word)
    );
  });
}
    // -------------------------------
    // CATEGORY
    // -------------------------------

if (selectedCategory !== "all") {
  result = result.filter(
    (product) =>
      product.category?.toLowerCase() ===
      selectedCategory.toLowerCase()
  );
}

    // -------------------------------
    // MIN PRICE
    // -------------------------------

    if (minPrice !== "") {
      result = result.filter(
        (product) =>
          Number(product.price) >=
          Number(minPrice)
      );
    }

    // -------------------------------
    // MAX PRICE
    // -------------------------------

    if (maxPrice !== "") {
      result = result.filter(
        (product) =>
          Number(product.price) <=
          Number(maxPrice)
      );
    }

    // -------------------------------
    // RATING
    // -------------------------------

    if (minRating > 0) {
      result = result.filter(
        (product) =>
          Number(product.rating || 0) >=
          minRating
      );
    }

    // -------------------------------
    // SORT
    // -------------------------------

    if (sortBy === "price-low") {
      result.sort(
        (a, b) =>
          Number(a.price) -
          Number(b.price)
      );
    }

    if (sortBy === "price-high") {
      result.sort(
        (a, b) =>
          Number(b.price) -
          Number(a.price)
      );
    }

    if (sortBy === "rating") {
      result.sort(
        (a, b) =>
          Number(b.rating || 0) -
          Number(a.rating || 0)
      );
    }

    if (sortBy === "name") {
      result.sort((a, b) =>
        String(a.name).localeCompare(
          String(b.name)
        )
      );
    }

    return result;
  }, [
    search,
    selectedCategory,
    minPrice,
    maxPrice,
    minRating,
    sortBy,
  ]);

  // ==========================================
  // TOTAL PAGES
  // ==========================================

  const totalPages = Math.ceil(
    filteredProducts.length /
      PRODUCTS_PER_PAGE
  );

  // ==========================================
  // CURRENT PRODUCTS
  // ==========================================

  const paginatedProducts = useMemo(() => {
    const startIndex =
      (currentPage - 1) *
      PRODUCTS_PER_PAGE;

    const endIndex =
      startIndex + PRODUCTS_PER_PAGE;

    return filteredProducts.slice(
      startIndex,
      endIndex
    );
  }, [
    filteredProducts,
    currentPage,
  ]);

  // ==========================================
  // KEEP PAGE VALID
  // ==========================================

  useEffect(() => {
    if (
      totalPages > 0 &&
      currentPage > totalPages
    ) {
      setCurrentPage(totalPages);
    }

    if (
      totalPages === 0 &&
      currentPage !== 1
    ) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  // ==========================================
  // UPDATE URL
  // ==========================================

  useEffect(() => {
    if (!urlReady) {
      return;
    }

    const params =
      new URLSearchParams();

    if (search.trim()) {
      params.set(
        "search",
        search.trim()
      );
    }

    if (
      selectedCategory !== "all"
    ) {
      params.set(
        "category",
        selectedCategory
      );
    }

    if (minPrice !== "") {
      params.set(
        "minPrice",
        minPrice
      );
    }

    if (maxPrice !== "") {
      params.set(
        "maxPrice",
        maxPrice
      );
    }

    if (minRating > 0) {
      params.set(
        "rating",
        String(minRating)
      );
    }

    if (sortBy !== "default") {
      params.set(
        "sort",
        sortBy
      );
    }

    if (currentPage > 1) {
      params.set(
        "page",
        String(currentPage)
      );
    }

    const queryString =
      params.toString();

    const newUrl = queryString
      ? `/shop?${queryString}`
      : "/shop";

    window.history.replaceState(
      null,
      "",
      newUrl
    );
  }, [
    search,
    selectedCategory,
    minPrice,
    maxPrice,
    minRating,
    sortBy,
    currentPage,
    urlReady,
  ]);

  // ==========================================
  // SEARCH CHANGE
  // ==========================================

  const handleSearchChange = (value) => {
    setSearch(value);

    setCurrentPage(1);
  };

  // ==========================================
  // CATEGORY CHANGE
  // ==========================================

  const handleCategoryChange = (
    category
  ) => {
    setSelectedCategory(category);

    setCurrentPage(1);
  };

  // ==========================================
  // PRICE CHANGE
  // ==========================================

  const handleMinPriceChange = (
    value
  ) => {
    setMinPrice(value);

    setCurrentPage(1);
  };

  const handleMaxPriceChange = (
    value
  ) => {
    setMaxPrice(value);

    setCurrentPage(1);
  };

  // ==========================================
  // RATING CHANGE
  // ==========================================

  const handleRatingChange = (
    value
  ) => {
    setMinRating(value);

    setCurrentPage(1);
  };

  // ==========================================
  // SORT CHANGE
  // ==========================================

  const handleSortChange = (
    value
  ) => {
    setSortBy(value);

    setCurrentPage(1);
  };

  // ==========================================
  // CLEAR FILTERS
  // ==========================================

  const clearFilters = () => {
    setSearch("");

    setSelectedCategory("all");

    setMinPrice("");

    setMaxPrice("");

    setMinRating(0);

    setSortBy("default");

    setCurrentPage(1);
  };

  // ==========================================
  // PAGE CHANGE
  // ==========================================

  const handlePageChange = (page) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="bg-gray-50">

      {/* =====================================
          HEADER
      ====================================== */}

      <section className="bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1500px]">

          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-500">
            Discover Products
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Shop All Products
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Find the perfect products
            for you.
          </p>

          {/* Search */}
          <div className="relative mt-6 max-w-2xl">

            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="search"
              value={search}
              onChange={(e) =>
                handleSearchChange(
                  e.target.value
                )
              }
              placeholder="Search products..."
              className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-11 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
            />

            {search && (
              <button
                type="button"
                onClick={() =>
                  handleSearchChange("")
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}

          </div>
        </div>
      </section>

      {/* =====================================
          SHOP CONTENT
      ====================================== */}

      <section className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">

        <div className="flex gap-6">

          {/* Desktop Filters */}
          <div className="hidden lg:block">

            <ShopFilters
              categories={categories}
              selectedCategory={
                selectedCategory
              }
              setSelectedCategory={
                handleCategoryChange
              }
              minPrice={minPrice}
              setMinPrice={
                handleMinPriceChange
              }
              maxPrice={maxPrice}
              setMaxPrice={
                handleMaxPriceChange
              }
              minRating={minRating}
              setMinRating={
                handleRatingChange
              }
              clearFilters={
                clearFilters
              }
            />

          </div>

          {/* Products */}
          <div className="min-w-0 flex-1">

            {/* Toolbar */}
            <ShopToolbar
              resultCount={
                filteredProducts.length
              }
              sortBy={sortBy}
              setSortBy={
                handleSortChange
              }
              setMobileFiltersOpen={
                setMobileFiltersOpen
              }
            />

            {/* Product Grid */}
            <div className="mt-6">

              {paginatedProducts.length >
              0 ? (
                <ProductGrid
                  products={
                    paginatedProducts
                  }
                />
              ) : (
                <div className="rounded-2xl border border-gray-100 bg-white px-6 py-20 text-center">

                  <h2 className="text-2xl font-bold text-gray-900">
                    No Products Found
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    Try changing your
                    search or filters.
                  </p>

                  <button
                    type="button"
                    onClick={
                      clearFilters
                    }
                    className="mt-6 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-600"
                  >
                    Clear Filters
                  </button>

                </div>
              )}

            </div>

            {/* Pagination */}
            {paginatedProducts.length >
              0 && (
              <Pagination
                currentPage={
                  currentPage
                }
                totalPages={
                  totalPages
                }
                setCurrentPage={
                  handlePageChange
                }
              />
            )}

          </div>
        </div>
      </section>

      {/* =====================================
          MOBILE FILTERS
      ====================================== */}

      <MobileFilters
        open={mobileFiltersOpen}
        setOpen={
          setMobileFiltersOpen
        }
        categories={categories}
        selectedCategory={
          selectedCategory
        }
        setSelectedCategory={
          handleCategoryChange
        }
        minPrice={minPrice}
        setMinPrice={
          handleMinPriceChange
        }
        maxPrice={maxPrice}
        setMaxPrice={
          handleMaxPriceChange
        }
        minRating={minRating}
        setMinRating={
          handleRatingChange
        }
        clearFilters={
          clearFilters
        }
      />

    </main>
  );
}