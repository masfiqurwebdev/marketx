"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Lock } from "lucide-react";

import { useCart } from "../../context/CartContext";
import { useOrders } from "../../context/OrderContext";

import CheckoutForm from "../../components/checkout/CheckoutForm";
import PaymentMethod from "../../components/checkout/PaymentMethod";
import CheckoutSummary from "../../components/checkout/CheckoutSummary";

import { useCoupon } from "../../context/CouponContext";

export default function CheckoutPage() {
  const router = useRouter();

  const { cart, clearCart } = useCart();

  const { createOrder } = useOrders();

  const [paymentMethod, setPaymentMethod] =
    useState("Cash on Delivery");

  const [customerData, setCustomerData] =
    useState(null);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [error, setError] = useState("");

  const {
  coupon,
  calculateDiscount,
  removeCoupon,
} = useCoupon();



  /*
   * Redirect to cart if cart is empty
   */
  useEffect(() => {
    if (!cart || cart.length === 0) {
      router.replace("/cart");
    }
  }, [cart, router]);

  /*
   * Don't render checkout if cart is empty
   */
  if (!cart || cart.length === 0) {
    return null;
  }

  /*
   * Calculate subtotal
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
   * Shipping
   *
   * Free shipping over $100
   */
  const shippingCost =
    subtotal >= 100 ? 0 : 10;

  /*
   * Final total
   */
const discount =
  calculateDiscount(subtotal);

const total =
  subtotal -
  discount +
  shippingCost;

  /*
   * Customer information
   */
  const handleCustomerSubmit = (
    data
  ) => {
    setCustomerData(data);
    setError("");

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  /*
   * Place order
   */
  const handlePlaceOrder = () => {
    setError("");

    if (!customerData) {
      setError(
        "Please complete your customer information first."
      );

      return;
    }

    if (!paymentMethod) {
      setError(
        "Please select a payment method."
      );

      return;
    }

    setIsSubmitting(true);

    try {
      const order = createOrder({
        items: cart,

        customer: {
          name: customerData.name,
          email: customerData.email,
          phone: customerData.phone,
        },

        shipping: {
          city: customerData.city,
          address: customerData.address,
        },

        paymentMethod,

        subtotal,

        shippingCost,

        total,
      });

      /*
       * Clear cart after successful order
       */
      clearCart();

      /*
       * Redirect to success page
       */
      router.push(
        `/order-success?orderId=${order.id}`
      );
    } catch (error) {
      console.error(
        "Order creation failed:",
        error
      );

      setError(
        "Something went wrong while placing your order."
      );

      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">

          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-emerald-500"
          >
            <ChevronLeft size={17} />

            Back to Cart
          </Link>

          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Checkout
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Complete your order information.
          </p>

        </div>
      </div>

      {/* Checkout Content */}
      <div className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">

          {/* LEFT */}
          <div className="space-y-6">

            {/* Customer Information */}
            <CheckoutForm
              onSubmit={
                handleCustomerSubmit
              }
              isSubmitting={false}
            />

            {/* Payment */}
            <PaymentMethod
              paymentMethod={
                paymentMethod
              }
              setPaymentMethod={
                setPaymentMethod
              }
            />

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Place Order */}
            <button
              type="button"
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-4 font-bold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Lock size={17} />

              {isSubmitting
                ? "Placing Order..."
                : "Place Order"}
            </button>

          </div>

          {/* RIGHT */}
          <div>
            <div className="sticky top-24">

              <CheckoutSummary
                cartItems={cart}
                subtotal={subtotal}
                shippingCost={
                  shippingCost
                }
                total={total}
              />

            </div>
          </div>

        </div>

      </div>

    </main>
  );
}