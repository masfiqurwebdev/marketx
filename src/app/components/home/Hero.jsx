import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[480px] overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-400">
      {/* Decorative Shapes */}
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

      <div className="absolute bottom-[-100px] left-[45%] h-64 w-64 rounded-full bg-emerald-300/20 blur-3xl" />

      <div className="absolute right-[30%] top-[20%] h-20 w-20 rotate-45 rounded-2xl bg-white/10" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[480px] items-center px-8 py-12 sm:px-12 lg:px-16">
        <div className="max-w-[540px]">
          {/* Small Label */}
          <div className="mb-5 inline-flex items-center rounded-full bg-white/15 px-4 py-2 backdrop-blur-sm">
            <span className="text-sm font-medium text-white">
              Limited Time Offer
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Mega Sale
            <br />
            <span>Up to 70% Off</span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-md text-base leading-7 text-white/85 sm:text-lg">
            Shop top products from top brands with mega discounts. Discover
            amazing deals before they&apos;re gone.
          </p>

          {/* Button */}
          <Link
            href="/shop"
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-yellow-400 px-7 py-3.5 text-sm font-bold text-gray-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-yellow-300"
          >
            Shop Now
            <ArrowRight size={19} />
          </Link>

          {/* Customers */}
          <div className="mt-9 flex items-center gap-4">
            <div className="flex -space-x-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-gray-300 text-xs font-bold">
                A
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-gray-400 text-xs font-bold">
                M
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-gray-500 text-xs font-bold">
                S
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-gray-600 text-xs font-bold text-white">
                R
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-emerald-600 text-xs font-bold text-white">
                +
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-white">
              <Users size={17} />

              <span>2k+ Happy Customers</span>
            </div>
          </div>
        </div>

        {/* Product Placeholder */}
        <div className="absolute bottom-0 right-[-20px] hidden h-full w-[48%] lg:block">
          <div className="absolute right-10 top-1/2 h-[380px] w-[380px] -translate-y-1/2 rounded-full bg-white/10" />

          <div className="absolute bottom-0 right-4 h-[430px] w-[310px] rotate-[-4deg] rounded-[45%] bg-gradient-to-b from-gray-800 to-gray-950 shadow-2xl">
            <div className="absolute left-1/2 top-8 h-8 w-8 -translate-x-1/2 rounded-full bg-gray-600" />

            <div className="absolute left-1/2 top-16 h-[310px] w-[220px] -translate-x-1/2 rounded-[40px] border-[10px] border-gray-700 bg-gray-900 shadow-inner">
              <div className="flex h-full items-center justify-center rounded-[30px] bg-gradient-to-br from-gray-700 via-gray-900 to-black">
                <span className="text-5xl font-bold text-white/80">MX</span>
              </div>
            </div>
          </div>
        </div>

        {/* Limited Offer Badge */}
        <div className="absolute right-7 top-8 flex h-24 w-24 items-center justify-center rounded-full bg-pink-500 text-center text-sm font-bold leading-5 text-white shadow-xl sm:right-10 sm:top-10">
          Limited
          <br />
          Offer
        </div>
      </div>
    </section>
  );
}