"use client";

import {
  Banknote,
  CreditCard,
} from "lucide-react";

export default function PaymentMethod({
  paymentMethod,
  setPaymentMethod,
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-bold text-gray-900">
        Payment Method
      </h2>

      <div className="mt-5 space-y-3">
        {/* Cash */}
        <button
          type="button"
          onClick={() =>
            setPaymentMethod(
              "Cash on Delivery"
            )
          }
          className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
            paymentMethod ===
            "Cash on Delivery"
              ? "border-emerald-500 bg-emerald-50"
              : "border-gray-200 hover:border-emerald-300"
          }`}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <Banknote size={21} />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">
              Cash on Delivery
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Pay when your order arrives.
            </p>
          </div>
        </button>

        {/* Card */}
        <button
          type="button"
          onClick={() =>
            setPaymentMethod(
              "Card Payment"
            )
          }
          className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
            paymentMethod ===
            "Card Payment"
              ? "border-emerald-500 bg-emerald-50"
              : "border-gray-200 hover:border-emerald-300"
          }`}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <CreditCard size={21} />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">
              Card Payment
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Demo payment option for now.
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}