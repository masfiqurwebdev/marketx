"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Package,
} from "lucide-react";

export default function OrderCard({
  order,
}) {
  if (!order) return null;

  const orderDate = new Date(
    order.createdAt
  ).toLocaleDateString("en-BD", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6">

      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-gray-100 pb-5 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
            <Package size={21} />
          </div>

          <div>
            <p className="text-xs text-gray-400">
              Order ID
            </p>

            <h2 className="text-sm font-bold text-gray-900">
              {order.id}
            </h2>
          </div>
        </div>

        <div className="text-left sm:text-right">
          <p className="text-xs text-gray-400">
            Order Date
          </p>

          <p className="text-sm font-medium text-gray-700">
            {orderDate}
          </p>
        </div>
      </div>

      {/* Products */}
      <div className="py-5">
        <div className="space-y-4">
          {order.items
            ?.slice(0, 3)
            .map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4"
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
                    Quantity:{" "}
                    {item.quantity}
                  </p>
                </div>

                <p className="text-sm font-bold text-gray-900">
                  $
                  {(
                    Number(item.price) *
                    Number(item.quantity)
                  ).toFixed(2)}
                </p>
              </div>
            ))}
        </div>

        {order.items?.length > 3 && (
          <p className="mt-4 text-xs text-gray-400">
            +{" "}
            {order.items.length - 3} more
            product(s)
          </p>
        )}
      </div>

      {/* Bottom */}
      <div className="flex flex-col gap-4 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <p className="text-xs text-gray-400">
            Status
          </p>

          <span className="mt-1 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
            {order.status}
          </span>
        </div>

        <div className="flex items-center justify-between gap-5 sm:justify-end">
          <div>
            <p className="text-xs text-gray-400">
              Total
            </p>

            <p className="text-lg font-bold text-gray-900">
              $
              {Number(
                order.total
              ).toFixed(2)}
            </p>
          </div>

          <Link
            href={`/orders/${order.id}`}
            className="inline-flex items-center gap-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-emerald-500 hover:text-emerald-500"
          >
            Details
            <ChevronRight size={16} />
          </Link>
        </div>

      </div>
    </div>
  );
}