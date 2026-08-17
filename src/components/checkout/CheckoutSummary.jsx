"use client";

import Image from "next/image";

export default function CheckoutSummary({
  cartItems,
  subtotal,
  shippingCost,
  total,
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900">
        Order Summary
      </h2>

      {/* Products */}
      <div className="mt-5 space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex gap-3"
          >
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-50">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-semibold text-gray-900">
                {item.name}
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                Qty: {item.quantity}
              </p>

              <p className="mt-1 text-sm font-bold text-gray-900">
                $
                {(
                  Number(item.price) *
                  Number(item.quantity)
                ).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="mt-6 border-t border-gray-100 pt-5">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Subtotal</span>

          <span>
            ${Number(subtotal).toFixed(2)}
          </span>
        </div>

        <div className="mt-3 flex justify-between text-sm text-gray-500">
          <span>Shipping</span>

          <span>
            {shippingCost === 0
              ? "Free"
              : `$${Number(
                  shippingCost
                ).toFixed(2)}`}
          </span>
        </div>

        <div className="mt-4 flex justify-between border-t border-gray-100 pt-4">
          <span className="font-bold text-gray-900">
            Total
          </span>

          <span className="text-xl font-bold text-emerald-500">
            ${Number(total).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}