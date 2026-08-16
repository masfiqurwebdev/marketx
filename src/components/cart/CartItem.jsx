"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  Trash2,
} from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function CartItem({ item }) {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const itemTotal =
    item.price * item.quantity;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex gap-4 sm:gap-5">
        {/* Image */}
        <Link
          href={`/products/${item.id}`}
          className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-50 sm:h-32 sm:w-32"
        >
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="128px"
            className="object-cover"
          />
        </Link>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <Link
                href={`/products/${item.id}`}
                className="line-clamp-2 text-sm font-bold text-gray-900 transition hover:text-emerald-500 sm:text-base"
              >
                {item.name}
              </Link>

              <p className="mt-1 text-xs text-gray-400">
                {item.category}
              </p>
            </div>

            {/* Remove */}
            <button
              type="button"
              onClick={() =>
                removeFromCart(item.id)
              }
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-500"
              aria-label="Remove product"
            >
              <Trash2 size={17} />
            </button>
          </div>

          {/* Price */}
          <div className="mt-3">
            <span className="text-lg font-black text-gray-900">
              ${item.price.toFixed(2)}
            </span>
          </div>

          {/* Bottom */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            {/* Quantity */}
            <div className="flex h-9 items-center rounded-lg border border-gray-200">
              <button
                type="button"
                onClick={() =>
                  decreaseQuantity(item.id)
                }
                className="flex h-full w-9 items-center justify-center text-gray-500 transition hover:text-emerald-500"
              >
                <Minus size={14} />
              </button>

              <span className="w-8 text-center text-sm font-bold text-gray-900">
                {item.quantity}
              </span>

              <button
                type="button"
                onClick={() =>
                  increaseQuantity(item.id)
                }
                disabled={
                  item.quantity >= item.stock
                }
                className="flex h-full w-9 items-center justify-center text-gray-500 transition hover:text-emerald-500 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <Plus size={14} />
              </button>
            </div>

            {/* Item Total */}
            <p className="text-sm font-bold text-gray-900">
              ${itemTotal.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}