"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

export default function CartContent() {
  const { cart, cartCount } = useCart();

  if (cart.length === 0) {
    return (
      <section className="mx-auto max-w-[1500px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
            <ShoppingCart size={35} />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-gray-900">
            Your cart is empty
          </h1>

          <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
            Looks like you haven't added anything to your
            cart yet. Start shopping and find something you
            love.
          </p>

          <Link
            href="/shop"
            className="mt-6 flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-600"
          >
            <ArrowLeft size={17} />

            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-medium text-emerald-500">
          Home / Cart
        </p>

        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          Shopping Cart
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          You have {cartCount}{" "}
          {cartCount === 1 ? "item" : "items"} in your cart.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        {/* Cart Items */}
        <div className="space-y-4">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
            />
          ))}
        </div>

        {/* Summary */}
        <CartSummary />
      </div>
    </section>
  );
}