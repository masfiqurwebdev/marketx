"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="mt-10 flex items-center justify-center gap-2">

      {/* Previous */}
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() =>
          setCurrentPage(currentPage - 1)
        }
        className={`flex h-10 w-10 items-center justify-center rounded-xl border transition ${
          currentPage === 1
            ? "cursor-not-allowed border-gray-100 text-gray-300"
            : "border-gray-200 bg-white text-gray-600 hover:border-emerald-500 hover:text-emerald-500"
        }`}
      >
        <ChevronLeft size={18} />
      </button>

      {/* Pages */}
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() =>
            setCurrentPage(page)
          }
          className={`flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-semibold transition ${
            currentPage === page
              ? "bg-emerald-500 text-white"
              : "border border-gray-200 bg-white text-gray-600 hover:border-emerald-500 hover:text-emerald-500"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        type="button"
        disabled={
          currentPage === totalPages
        }
        onClick={() =>
          setCurrentPage(currentPage + 1)
        }
        className={`flex h-10 w-10 items-center justify-center rounded-xl border transition ${
          currentPage === totalPages
            ? "cursor-not-allowed border-gray-100 text-gray-300"
            : "border-gray-200 bg-white text-gray-600 hover:border-emerald-500 hover:text-emerald-500"
        }`}
      >
        <ChevronRight size={18} />
      </button>

    </div>
  );
}