"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim()) {
      return;
    }

    setSubmitted(true);
    setEmail("");
  }

  return (
    <section className="mx-auto max-w-[1500px] px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-emerald-50 px-6 py-12 text-center sm:px-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-emerald-500 shadow-sm">
          <Mail size={25} />
        </div>

        <h2 className="mt-5 text-2xl font-bold text-gray-900 sm:text-3xl">
          Get the Latest Deals
        </h2>

        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-gray-500">
          Subscribe to our newsletter and get exclusive offers,
          new product updates, and special discounts.
        </p>

        {submitted ? (
          <div className="mx-auto mt-6 max-w-md rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white">
            Thanks for subscribing! 🎉
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email address"
              className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              required
            />

            <button
              type="submit"
              className="rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-600"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="mt-4 text-xs text-gray-400">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}