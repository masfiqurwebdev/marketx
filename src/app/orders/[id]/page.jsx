"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import {
  ArrowLeft,
  Package,
  MapPin,
  CreditCard,
} from "lucide-react";

import { useOrders } from "../../../context/OrderContext";

import OrderStatus from "../../../components/orders/OrderStatus";

export default function OrderDetailsPage() {
  const params = useParams();

  const { orders } = useOrders();

  const order = orders.find(
    (item) =>
      String(item.id) ===
      String(params.id)
  );

  if (!order) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
            <Package size={28} />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Order Not Found
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            This order doesn't exist or has
            been removed.
          </p>

          <Link
            href="/orders"
            className="mt-6 inline-flex rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-white"
          >
            Back to Orders
          </Link>
        </div>
      </main>
    );
  }

  const orderDate = new Date(
    order.createdAt
  ).toLocaleDateString("en-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 lg:px-8">

          <Link
            href="/orders"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-emerald-500"
          >
            <ArrowLeft size={16} />

            Back to Orders
          </Link>

          <div className="mt-5">
            <p className="text-xs text-gray-400">
              Order ID
            </p>

            <h1 className="mt-1 text-2xl font-bold text-gray-900">
              {order.id}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Placed on {orderDate}
            </p>
          </div>

        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">

        {/* Status */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
              <Package size={21} />
            </div>

            <div>
              <h2 className="font-bold text-gray-900">
                Order Status
              </h2>

              <p className="text-sm text-gray-500">
                {order.status}
              </p>
            </div>
          </div>

          <OrderStatus
            status={order.status}
          />

        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">

          {/* Products */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">

            <h2 className="text-xl font-bold text-gray-900">
              Ordered Products
            </h2>

            <div className="mt-6 divide-y divide-gray-100">

              {order.items.map(
                (item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 py-5 first:pt-0 last:pb-0"
                  >
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-gray-50">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full rounded-xl object-cover"
                        />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Quantity:{" "}
                        {item.quantity}
                      </p>

                      <p className="mt-2 font-bold text-gray-900">
                        $
                        {(
                          Number(
                            item.price
                          ) *
                          Number(
                            item.quantity
                          )
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                )
              )}

            </div>
          </div>

          {/* Right */}
          <div className="space-y-6">

            {/* Shipping */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

              <div className="flex items-center gap-3">
                <MapPin
                  size={20}
                  className="text-emerald-500"
                />

                <h2 className="font-bold text-gray-900">
                  Delivery Address
                </h2>
              </div>

              <div className="mt-4 text-sm text-gray-600">
                <p className="font-semibold text-gray-900">
                  {order.customer.name}
                </p>

                <p className="mt-1">
                  {order.customer.phone}
                </p>

                <p className="mt-1">
                  {order.customer.email}
                </p>

                <p className="mt-3">
                  {order.shipping.address}
                </p>

                <p className="mt-1">
                  {order.shipping.city}
                </p>
              </div>

            </div>

            {/* Payment */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

              <div className="flex items-center gap-3">
                <CreditCard
                  size={20}
                  className="text-emerald-500"
                />

                <h2 className="font-bold text-gray-900">
                  Payment
                </h2>
              </div>

              <p className="mt-4 text-sm text-gray-600">
                {order.paymentMethod}
              </p>

            </div>

            {/* Summary */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

              <h2 className="font-bold text-gray-900">
                Order Summary
              </h2>

              <div className="mt-5 space-y-3 text-sm">

                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>

                  <span>
                    $
                    {Number(
                      order.subtotal
                    ).toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>

                  <span>
                    {Number(
                      order.shippingCost
                    ) === 0
                      ? "Free"
                      : `$${Number(
                          order.shippingCost
                        ).toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between border-t border-gray-100 pt-4 text-base font-bold text-gray-900">
                  <span>Total</span>

                  <span className="text-emerald-500">
                    $
                    {Number(
                      order.total
                    ).toFixed(2)}
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}