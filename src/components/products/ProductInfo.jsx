"use client";

import {
  Check,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";

import { useState } from "react";
import { useCart } from "../../context/CartContext";

export default function ProductInfo({ product }) {


  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
const {addToCart,} = useCart();

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Badge */}
      {product.badge && (
        <span className="w-fit rounded-lg bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
          {product.badge}
        </span>
      )}

      {/* Title */}
      <h1 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1">
          <Star
            size={18}
            fill="currentColor"
            className="text-yellow-400"
          />

          <span className="font-semibold text-gray-900">
            {product.rating}
          </span>
        </div>

        <span className="text-gray-300">|</span>

        <span className="text-sm text-gray-500">
          {product.reviews} Reviews
        </span>

        <span className="text-gray-300">|</span>

        <span className="text-sm font-medium text-emerald-500">
          {product.stock} in stock
        </span>
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-gray-100" />

      {/* Price */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-3xl font-black text-gray-900">
          ${product.price.toFixed(2)}
        </span>

        {product.oldPrice && (
          <span className="text-lg text-gray-400 line-through">
            ${product.oldPrice.toFixed(2)}
          </span>
        )}

        {product.discount > 0 && (
          <span className="rounded-lg bg-red-50 px-2.5 py-1 text-xs font-bold text-red-500">
            Save {product.discount}%
          </span>
        )}
      </div>

      {/* Description */}
      <p className="mt-5 text-sm leading-7 text-gray-500">
        Experience premium quality and exceptional performance
        with this carefully selected product. Designed for
        everyday use with excellent build quality and modern
        styling.
      </p>

      {/* Quantity */}
      <div className="mt-7">
        <p className="mb-3 text-sm font-semibold text-gray-900">
          Quantity
        </p>

        <div className="flex items-center gap-3">
          <div className="flex h-12 items-center rounded-xl border border-gray-200">
            <button
              type="button"
              onClick={decreaseQuantity}
              disabled={quantity === 1}
              className="flex h-full w-11 items-center justify-center text-gray-500 transition hover:text-emerald-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Minus size={16} />
            </button>

            <span className="w-10 text-center text-sm font-bold text-gray-900">
              {quantity}
            </span>

            <button
              type="button"
              onClick={increaseQuantity}
              disabled={quantity === product.stock}
              className="flex h-full w-11 items-center justify-center text-gray-500 transition hover:text-emerald-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Wishlist */}
          <button
            type="button"
            onClick={() => setLiked(!liked)}
            className={`flex h-12 w-12 items-center justify-center rounded-xl border transition ${
              liked
                ? "border-red-200 bg-red-50 text-red-500"
                : "border-gray-200 text-gray-500 hover:border-emerald-500 hover:text-emerald-500"
            }`}
          >
            <Heart
              size={19}
              fill={liked ? "currentColor" : "none"}
            />
          </button>
        </div>
      </div>

      {/* Cart */}
      <div className="mt-5 flex gap-3">
<button
  type="button"
  onClick={() => addToCart(product, quantity)}
  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 py-4 text-sm font-bold text-white transition hover:bg-emerald-600"
>
  <ShoppingCart size={19} />

  Add to Cart
</button>

        <button
          type="button"
          className="rounded-xl border border-gray-200 px-6 py-4 text-sm font-bold text-gray-900 transition hover:border-emerald-500 hover:text-emerald-500"
        >
          Buy Now
        </button>
      </div>

      {/* Delivery */}
      <div className="mt-6 rounded-2xl bg-gray-50 p-5">
        <div className="flex gap-3">
          <Truck
            size={22}
            className="mt-0.5 shrink-0 text-emerald-500"
          />

          <div>
            <h3 className="text-sm font-bold text-gray-900">
              Fast & Secure Delivery
            </h3>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              Free delivery available on eligible orders.
              Estimated delivery within 2-5 business days.
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
          <Check size={15} className="text-emerald-500" />

          Secure payment

          <Check
            size={15}
            className="ml-3 text-emerald-500"
          />

          Easy returns
        </div>
      </div>
    </div>
  );
}