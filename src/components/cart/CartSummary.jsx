"use client";

import {
  ArrowRight,
  Tag,
  X,
} from "lucide-react";

import Link from "next/link";

import { useState } from "react";

import { useCart } from "../../context/CartContext";
import { useCoupon } from "../../context/CouponContext";

export default function CartSummary() {
  const { cart } = useCart();

  const {
    coupon,
    couponCode,
    setCouponCode,
    applyCoupon,
    removeCoupon,
    calculateDiscount,
  } = useCoupon();

  const [couponMessage, setCouponMessage] =
    useState("");

  const [couponError, setCouponError] =
    useState(false);

  /*
  |--------------------------------------------------------------------------
  | Subtotal
  |--------------------------------------------------------------------------
  */

  const subtotal = cart.reduce(
    (total, item) => {
      return (
        total +
        Number(item.price) *
          Number(item.quantity)
      );
    },
    0
  );

  /*
  |--------------------------------------------------------------------------
  | Discount
  |--------------------------------------------------------------------------
  */

  const discount =
    calculateDiscount(subtotal);

  /*
  |--------------------------------------------------------------------------
  | Shipping
  |--------------------------------------------------------------------------
  */

  const shipping =
    subtotal >= 100 || subtotal === 0
      ? 0
      : 10;

  /*
  |--------------------------------------------------------------------------
  | Total
  |--------------------------------------------------------------------------
  */

  const total =
    subtotal -
    discount +
    shipping;

  /*
  |--------------------------------------------------------------------------
  | Apply Coupon
  |--------------------------------------------------------------------------
  */

  const handleApplyCoupon = () => {
    const result = applyCoupon(
      couponCode,
      subtotal
    );

    setCouponMessage(
      result.message
    );

    setCouponError(
      !result.success
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Remove Coupon
  |--------------------------------------------------------------------------
  */

  const handleRemoveCoupon = () => {
    removeCoupon();

    setCouponMessage(
      "Coupon removed."
    );

    setCouponError(false);
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

      {/* Title */}
      <h2 className="text-xl font-bold text-gray-900">
        Order Summary
      </h2>

      {/* Coupon */}
      <div className="mt-6">

        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Tag size={17} />

          <span>Have a coupon?</span>
        </div>

        {coupon ? (
          <div className="mt-3 flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">

            <div>
              <p className="text-sm font-bold text-emerald-600">
                {coupon.code}
              </p>

              <p className="mt-0.5 text-xs text-emerald-600">
                {coupon.type ===
                "percentage"
                  ? `${coupon.value}% discount`
                  : `$${coupon.value} discount`}
              </p>
            </div>

            <button
              type="button"
              onClick={
                handleRemoveCoupon
              }
              className="flex h-8 w-8 items-center justify-center rounded-full text-emerald-600 transition hover:bg-emerald-100"
              aria-label="Remove coupon"
            >
              <X size={16} />
            </button>

          </div>
        ) : (
          <div className="mt-3 flex gap-2">

            <input
              type="text"
              value={couponCode}
              onChange={(event) => {
                setCouponCode(
                  event.target.value
                );

                setCouponMessage("");
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleApplyCoupon();
                }
              }}
              placeholder="Coupon code"
              className="min-w-0 flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-emerald-500"
            />

            <button
              type="button"
              onClick={
                handleApplyCoupon
              }
              className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-emerald-500 hover:text-emerald-500"
            >
              Apply
            </button>

          </div>
        )}

        {couponMessage && (
          <p
            className={`mt-2 text-xs ${
              couponError
                ? "text-red-500"
                : "text-emerald-600"
            }`}
          >
            {couponMessage}
          </p>
        )}

      </div>

      {/* Divider */}
      <div className="my-6 border-t border-gray-100" />

      {/* Subtotal */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">
          Subtotal
        </span>

        <span className="font-semibold text-gray-900">
          ${subtotal.toFixed(2)}
        </span>
      </div>

      {/* Discount */}
      {discount > 0 && (
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-emerald-600">
            Discount
          </span>

          <span className="font-semibold text-emerald-600">
            -${discount.toFixed(2)}
          </span>
        </div>
      )}

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
        <span className="text-base font-bold text-gray-900">
          Total
        </span>

        <span className="text-2xl font-bold text-gray-900">
          ${total.toFixed(2)}
        </span>
      </div>

      {/* Checkout */}
      {cart.length > 0 ? (
        <Link
          href="/checkout"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-600"
        >
          Proceed to Checkout

          <ArrowRight size={18} />
        </Link>
      ) : (
        <button
          type="button"
          disabled
          className="mt-6 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-gray-200 py-3.5 text-sm font-bold text-gray-400"
        >
          Proceed to Checkout

          <ArrowRight size={18} />
        </button>
      )}

    </div>
  );
}