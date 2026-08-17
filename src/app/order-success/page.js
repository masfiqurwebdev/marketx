"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import {
  Check,
  Package,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

export default function OrderSuccessPage() {
  const searchParams =
    useSearchParams();

  const orderId =
    searchParams.get("orderId");

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">

      <div className="w-full max-w-xl rounded-3xl border border-gray-100 bg-white p-6 text-center shadow-sm sm:p-10">

        {/* Success Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-500">
          <Check size={40} strokeWidth={3} />
        </div>

        {/* Title */}
        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          Order Placed Successfully!
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
          Thank you for shopping with MarketX.
          Your order has been received and is
          currently being processed.
        </p>

        {/* Order ID */}
        {orderId && (
          <div className="mt-6 rounded-2xl bg-gray-50 p-5">
            <p className="text-xs font-medium text-gray-400">
              Your Order ID
            </p>

            <p className="mt-2 text-lg font-bold text-gray-900">
              {orderId}
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-8 grid gap-3 sm:grid-cols-2">

          <Link
            href="/orders"
            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-600"
          >
            <Package size={18} />

            View My Orders
          </Link>

          <Link
            href="/shop"
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3.5 text-sm font-bold text-gray-700 transition hover:border-emerald-500 hover:text-emerald-500"
          >
            <ShoppingBag size={18} />

            Continue Shopping

            <ArrowRight size={16} />
          </Link>

        </div>

      </div>
    </main>
  );
}