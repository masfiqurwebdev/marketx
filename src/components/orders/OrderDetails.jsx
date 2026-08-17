"use client";

import {
  ArrowLeft,
  CheckCircle,
  CreditCard,
  MapPin,
  Package,
  Truck,
} from "lucide-react";

import Link from "next/link";

export default function OrderDetails({
  order,
}) {
  const formattedDate = new Date(
    order.createdAt
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <Link
            href="/orders"
            className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-emerald-500"
          >
            <ArrowLeft size={16} />
            Back to Orders
          </Link>

          <h1 className="text-3xl font-bold text-gray-900">
            Order Details
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            {order.id}
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-yellow-50 px-4 py-2 text-sm font-bold text-yellow-600">
          <CheckCircle size={16} />
          {order.status}
        </div>
      </div>

      {/* Order Info */}
      <div className="grid gap-4 md:grid-cols-3">

        <InfoCard
          icon={<CalendarIcon />}
          title="Order Date"
          value={formattedDate}
        />

        <InfoCard
          icon={<CreditCard size={20} />}
          title="Payment"
          value={getPaymentName(
            order.paymentMethod
          )}
        />

        <InfoCard
          icon={<Truck size={20} />}
          title="Delivery"
          value="Standard Delivery"
        />

      </div>

      {/* Products */}
      <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

        <div className="flex items-center gap-3">
          <Package
            size={21}
            className="text-emerald-500"
          />

          <h2 className="text-xl font-bold text-gray-900">
            Ordered Products
          </h2>
        </div>

        <div className="mt-6 divide-y divide-gray-100">

          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 py-5 first:pt-0 last:pb-0"
            >
              {/* Image */}
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Package
                      size={25}
                      className="text-gray-400"
                    />
                  </div>
                )}
              </div>

              {/* Product */}
              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-2 font-semibold text-gray-900">
                  {item.name}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>

              {/* Price */}
              <div className="text-right">
                <p className="font-bold text-gray-900">
                  $
                  {(
                    Number(item.price || 0) *
                    Number(item.quantity || 0)
                  ).toFixed(2)}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  ${Number(item.price || 0).toFixed(2)} each
                </p>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* Customer + Summary */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Shipping */}
        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">
            <MapPin
              size={21}
              className="text-emerald-500"
            />

            <h2 className="text-xl font-bold text-gray-900">
              Shipping Address
            </h2>
          </div>

          <div className="mt-5 rounded-xl bg-gray-50 p-4">

            <p className="font-semibold text-gray-900">
              {order.customer.firstName}{" "}
              {order.customer.lastName}
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              {order.customer.address}
              <br />
              {order.customer.city},{" "}
              {order.customer.postalCode}
              <br />
              {order.customer.phone}
              <br />
              {order.customer.email}
            </p>

          </div>
        </section>

        {/* Summary */}
        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

          <h2 className="text-xl font-bold text-gray-900">
            Order Summary
          </h2>

          <div className="mt-5 space-y-4 text-sm">

            <div className="flex justify-between">
              <span className="text-gray-500">
                Subtotal
              </span>

              <span className="font-semibold">
                $
                {Number(
                  order.subtotal || 0
                ).toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">
                Shipping
              </span>

              <span className="font-semibold">
                {Number(
                  order.shipping || 0
                ) === 0
                  ? "FREE"
                  : `$${Number(
                      order.shipping
                    ).toFixed(2)}`}
              </span>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">
                  Total
                </span>

                <span className="text-2xl font-bold text-emerald-500">
                  $
                  {Number(
                    order.total || 0
                  ).toFixed(2)}
                </span>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  value,
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

      <div className="flex items-center gap-3">
        <div className="text-emerald-500">
          {icon}
        </div>

        <div>
          <p className="text-xs text-gray-400">
            {title}
          </p>

          <p className="mt-1 font-semibold text-gray-900">
            {value}
          </p>
        </div>
      </div>

    </div>
  );
}

function getPaymentName(method) {
  if (method === "cod") {
    return "Cash on Delivery";
  }

  if (method === "card") {
    return "Credit / Debit Card";
  }

  if (method === "mobile") {
    return "Mobile Banking";
  }

  return "Unknown";
}

function CalendarIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect
        width="18"
        height="18"
        x="3"
        y="4"
        rx="2"
      />
      <line
        x1="16"
        x2="16"
        y1="2"
        y2="6"
      />
      <line
        x1="8"
        x2="8"
        y1="2"
        y2="6"
      />
      <line
        x1="3"
        x2="21"
        y1="10"
        y2="10"
      />
    </svg>
  );
}