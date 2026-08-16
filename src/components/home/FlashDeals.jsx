"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import products from "../../data/products";
import ProductCard from "../products/ProductCard";

const initialTime = {
  hours: 12,
  minutes: 45,
  seconds: 32,
};

export default function FlashDeals() {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((previous) => {
        let { hours, minutes, seconds } = previous;

        if (seconds > 0) {
          seconds -= 1;
        } else if (minutes > 0) {
          minutes -= 1;
          seconds = 59;
        } else if (hours > 0) {
          hours -= 1;
          minutes = 59;
          seconds = 59;
        } else {
          return initialTime;
        }

        return {
          hours,
          minutes,
          seconds,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const flashProducts = products.slice(0, 4);

  return (
    <section className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          {/* Title */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔥</span>

            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Flash Deals
            </h2>
          </div>

          <p className="mt-2 text-sm text-gray-500">
            Grab these deals before they&apos;re gone.
          </p>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
            <Clock3 size={17} />

            <span>Ends in</span>
          </div>

          <div className="flex items-center gap-1">
            <TimerBox value={time.hours} />

            <span className="font-bold text-gray-400">:</span>

            <TimerBox value={time.minutes} />

            <span className="font-bold text-gray-400">:</span>

            <TimerBox value={time.seconds} />
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {flashProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* View All */}
      <div className="mt-7 flex justify-center">
        <Link
          href="/deals"
          className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-emerald-500 hover:text-emerald-500"
        >
          View All Deals

          <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
}

function TimerBox({ value }) {
  return (
    <span className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-gray-900 px-2 text-sm font-bold text-white">
      {String(value).padStart(2, "0")}
    </span>
  );
}