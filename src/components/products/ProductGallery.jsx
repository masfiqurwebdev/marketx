"use client";

import Image from "next/image";
import { useState } from "react";
import { Maximize2 } from "lucide-react";

export default function ProductGallery({ product }) {
  const [activeImage, setActiveImage] = useState(0);

  const images = [
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  return (
    <div>
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-gray-50">

        {/* Discount */}
        {product.discount > 0 && (
          <span className="absolute left-4 top-4 z-20 rounded-lg bg-red-500 px-3 py-1.5 text-sm font-bold text-white">
            -{product.discount}%
          </span>
        )}

        {/* Main Image */}
        <Image
          src={images[activeImage]}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />

        {/* Zoom */}
        <button
          type="button"
          className="absolute bottom-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-emerald-500 hover:text-white"
        >
          <Maximize2 size={17} />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="mt-4 grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActiveImage(index)}
            className={`relative aspect-square overflow-hidden rounded-xl border-2 transition ${
              activeImage === index
                ? "border-emerald-500"
                : "border-transparent hover:border-gray-200"
            }`}
          >
            <Image
              src={image}
              alt={`${product.name} ${index + 1}`}
              fill
              sizes="120px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}