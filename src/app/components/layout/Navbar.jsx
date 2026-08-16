"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Search,
  User,
  Heart,
  ShoppingCart,
  ChevronDown,
} from "lucide-react";

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Shop",
    href: "/shop",
  },
  {
    name: "Categories",
    href: "/categories",
  },
  {
    name: "Deals",
    href: "/deals",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

const categories = [
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Beauty & Health",
  "Sports & Outdoors",
  "Automotive",
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white">
      {/* ================= DESKTOP NAVBAR ================= */}
      <div className="mx-auto hidden h-20 max-w-[1500px] items-center gap-8 px-6 lg:flex">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center text-2xl font-bold tracking-tight"
        >
          Market
          <span className="text-emerald-500">X</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative text-sm font-medium text-gray-700 transition hover:text-emerald-500 ${
                link.name === "Home"
                  ? "text-emerald-500 after:absolute after:-bottom-[27px] after:left-0 after:h-0.5 after:w-full after:bg-emerald-500"
                  : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Search */}
        <div className="ml-auto flex h-11 min-w-[380px] overflow-hidden rounded-xl border border-gray-200 bg-white">
          {/* Category */}
          <div className="relative border-r border-gray-200">
            <button
              onClick={() => setCategoryOpen(!categoryOpen)}
              className="flex h-full items-center gap-2 px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              All Categories
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  categoryOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {categoryOpen && (
              <div className="absolute left-0 top-14 z-50 w-56 rounded-xl border border-gray-100 bg-white p-2 shadow-xl">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/categories/${category
                      .toLowerCase()
                      .replaceAll(" ", "-")
                      .replaceAll("&", "and")}`}
                    onClick={() => setCategoryOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-600"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search for products..."
            className="min-w-0 flex-1 px-4 text-sm outline-none placeholder:text-gray-400"
          />

          {/* Search Button */}
          <button className="flex w-14 items-center justify-center bg-emerald-500 text-white transition hover:bg-emerald-600">
            <Search size={20} />
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5">
          {/* User */}
          <Link
            href="/login"
            className="text-gray-700 transition hover:text-emerald-500"
          >
            <User size={22} strokeWidth={1.8} />
          </Link>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="relative text-gray-700 transition hover:text-emerald-500"
          >
            <Heart size={22} strokeWidth={1.8} />

            <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-500 px-1 text-[9px] font-bold text-white">
              0
            </span>
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative flex items-center gap-2 text-gray-700 transition hover:text-emerald-500"
          >
            <div className="relative">
              <ShoppingCart size={23} strokeWidth={1.8} />

              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-500 px-1 text-[9px] font-bold text-white">
                3
              </span>
            </div>

            <span className="text-sm font-semibold">$248.00</span>
          </Link>
        </div>
      </div>

      {/* ================= MOBILE NAVBAR ================= */}
      <div className="flex h-16 items-center justify-between px-4 lg:hidden">
        {/* Menu */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-gray-700"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight"
          onClick={() => setMobileMenuOpen(false)}
        >
          Market
          <span className="text-emerald-500">X</span>
        </Link>

        {/* Mobile Cart */}
        <Link
          href="/cart"
          className="relative text-gray-700"
          aria-label="Shopping cart"
        >
          <ShoppingCart size={23} />

          <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-500 px-1 text-[9px] font-bold text-white">
            3
          </span>
        </Link>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 pb-5 pt-4 lg:hidden">
          {/* Mobile Search */}
          <div className="mb-5 flex h-11 overflow-hidden rounded-xl border border-gray-200">
            <input
              type="text"
              placeholder="Search for products..."
              className="min-w-0 flex-1 px-4 text-sm outline-none placeholder:text-gray-400"
            />

            <button className="flex w-12 items-center justify-center bg-emerald-500 text-white">
              <Search size={19} />
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`border-b border-gray-100 py-3.5 text-sm font-medium ${
                  link.name === "Home"
                    ? "text-emerald-500"
                    : "text-gray-700"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Actions */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-700"
            >
              <User size={18} />
              Account
            </Link>

            <Link
              href="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-700"
            >
              <Heart size={18} />
              Wishlist
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}