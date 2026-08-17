"use client";

import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";

import { useOrders } from "../../context/OrderContext";

import OrderCard from "../../components/orders/OrderCard";

export default function OrdersPage() {
  const { orders } = useOrders();

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-emerald-500"
          >
            <ArrowLeft size={16} />

            Back to Home
          </Link>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
              <Package size={24} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                My Orders
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Track and manage your orders.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Orders */}
      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">

        {orders.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
              <Package size={28} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              No Orders Yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              You haven't placed any orders yet.
              Start shopping and your orders will
              appear here.
            </p>

            <Link
              href="/shop"
              className="mt-6 inline-flex rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-600"
            >
              Start Shopping
            </Link>

          </div>
        ) : (
          <div className="space-y-5">

            <div className="mb-5">
              <p className="text-sm text-gray-500">
                You have{" "}
                <span className="font-bold text-gray-900">
                  {orders.length}
                </span>{" "}
                order
                {orders.length !== 1
                  ? "s"
                  : ""}
              </p>
            </div>

            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
              />
            ))}

          </div>
        )}

      </div>
    </main>
  );
}