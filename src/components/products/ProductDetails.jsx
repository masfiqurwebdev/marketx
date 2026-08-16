"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductFeatures from "./ProductFeatures";
import ProductDescription from "./ProductDescription";
import RelatedProducts from "./RelatedProducts";

export default function ProductDetails({ product }) {
  return (
    <section className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2 text-sm text-gray-400">
        <Link
          href="/"
          className="transition hover:text-emerald-500"
        >
          Home
        </Link>

        <ChevronRight size={15} />

        <Link
          href="/shop"
          className="transition hover:text-emerald-500"
        >
          Shop
        </Link>

        <ChevronRight size={15} />

        <span className="truncate text-gray-600">
          {product.name}
        </span>
      </div>

      {/* Main Product */}
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <ProductGallery product={product} />

        <ProductInfo product={product} />
      </div>

      {/* Features */}
      <ProductFeatures />

      {/* Description */}
      <ProductDescription product={product} />

      {/* Related Products */}
      <RelatedProducts product={product} />
    </section>
  );
}