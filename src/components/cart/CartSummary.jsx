"use client";

import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function CartSummary() {
  const {
    subtotal,
    shipping,
    total,
  } = useCart();

  return (
    <div className="h-fit lg:sticky lg:top-24">
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-lg font-bold text-gray-900">
          Order Summary
        </h2>

        {/* Subtotal */}
        <div className="mt-6 flex items-center justify-between text-sm">
          <span className="text-gray-500">
            Subtotal
          </span>

          <span className="font-semibold text-gray-900">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        {/* Shipping */}
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-gray-500">
            Shipping
          </span>

          <span className="font-semibold text-gray-900">
            {shipping === 0
              ? "FREE"
              : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        {/* Divider */}
        <div className="my-5 border-t border-gray-100" />

        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="font-bold text-gray-900">
            Total
          </span>

          <span className="text-2xl font-black text-emerald-500">
            ${total.toFixed(2)}
          </span>
        </div>

        {/* Checkout */}
        <Link
          href="/checkout"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-600"
        >
          Proceed to Checkout

          <ArrowRight size={17} />
        </Link>

        {/* Benefits */}
        <div className="mt-6 space-y-3 border-t border-gray-100 pt-5">
          <div className="flex items-center gap-3">
            <Truck
              size={18}
              className="text-emerald-500"
            />

            <span className="text-xs text-gray-500">
              Free shipping over $50
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck
              size={18}
              className="text-emerald-500"
            />

            <span className="text-xs text-gray-500">
              Secure checkout
            </span>
          </div>
        </div>
      </div>

      {/* Continue Shopping */}
      <Link
        href="/shop"
        className="mt-4 flex items-center justify-center text-sm font-semibold text-gray-500 transition hover:text-emerald-500"
      >
        Continue Shopping
      </Link>
    </div>
  );
}