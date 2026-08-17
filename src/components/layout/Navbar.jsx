"use client";

import { useCart } from "../../context/CartContext";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useWishlist } from "../../context/WishlistContext";


import Link from "next/link";
import {  Menu,  X, Search, User, Heart,ShoppingCart,ChevronDown,} from "lucide-react";

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
  {
    name: "My Order",
    href: "/orders",
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
  const { cartCount } = useCart();
const router = useRouter();

const [search, setSearch] = useState("");

const { wishlistCount } = useWishlist();

const handleSearch = (e) => {
  e.preventDefault();

  const value = search.trim();

  if (!value) {
    router.push("/shop");
    return;
  }

  router.push(
    `/shop?search=${encodeURIComponent(value)}`
  );
};

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
<form
  onSubmit={handleSearch}
  className="relative"
>
  <Search
    size={18}
    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
  />

  <input
    type="text"
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    placeholder="Search products..."
    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
  />
</form>
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
  className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100"
>
  <Heart size={21} />

  {wishlistCount > 0 && (
    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
      {wishlistCount > 99
        ? "99+"
        : wishlistCount}
    </span>
  )}
</Link>

          {/* Cart */}
<Link
  href="/cart"
  className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100"
>
  <ShoppingCart size={21} />

  {cartCount > 0 && (
    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-500 px-1 text-[10px] font-bold text-white">
      {cartCount > 99 ? "99+" : cartCount}
    </span>
  )}
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
  className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100"
>
  <ShoppingCart size={21} />

  {cartCount > 0 && (
    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-500 px-1 text-[10px] font-bold text-white">
      {cartCount > 99 ? "99+" : cartCount}
    </span>
  )}

        </Link>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 pb-5 pt-4 lg:hidden">
{/* Mobile Search */}
<div className="border-t border-gray-100 px-4 py-3 lg:hidden">
  <form
    onSubmit={handleSearch}
    className="flex items-center gap-2"
  >
    <div className="relative flex-1">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        placeholder="Search products..."
        className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-10 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white"
      />

      {search && (
        <button
          type="button"
          onClick={() => setSearch("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-lg text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      )}
    </div>

    {/* Search Button */}
    <button
      type="submit"
      className="flex h-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500 px-4 text-sm font-semibold text-white transition hover:bg-emerald-600 active:scale-95"
    >
      Search
    </button>
  </form>
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