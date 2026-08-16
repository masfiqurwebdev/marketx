import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function PromoBanner() {
  return (
    <section className="mx-auto max-w-[1500px] px-4 py-10 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-900 via-gray-800 to-emerald-900">
        {/* Decorative circles */}
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-500/20 blur-2xl" />

        <div className="absolute -bottom-24 right-[25%] h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative flex min-h-[300px] items-center px-7 py-12 sm:px-12 lg:px-16">
          <div className="max-w-xl">
            <div className="mb-4 flex items-center gap-2 text-emerald-400">
              <Sparkles size={18} />

              <span className="text-sm font-semibold">
                Special Offer
              </span>
            </div>

            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Upgrade Your
              <br />
              Everyday Lifestyle
            </h2>

            <p className="mt-4 max-w-md text-sm leading-6 text-gray-300 sm:text-base">
              Discover premium products at prices you&apos;ll love.
              Limited-time offers available now.
            </p>

            <Link
              href="/shop"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-600"
            >
              Explore Products

              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Decorative Product Cards */}
          <div className="absolute right-10 hidden h-64 w-64 lg:block">
            <div className="absolute right-24 top-8 h-40 w-28 rotate-[-12deg] rounded-2xl bg-white/10 backdrop-blur-sm" />

            <div className="absolute right-2 top-0 h-48 w-36 rotate-[8deg] rounded-2xl border border-white/10 bg-white/10 backdrop-blur-sm" />

            <div className="absolute right-10 bottom-0 h-36 w-28 rotate-[15deg] rounded-2xl bg-emerald-500/30 backdrop-blur-sm" />
          </div>
        </div>
      </div>
    </section>
  );
}