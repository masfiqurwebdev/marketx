"use client";

import {
  User,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function ShippingForm({
  formData,
  setFormData,
}) {
  const updateField = (
    field,
    value
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-bold text-gray-900">
        Shipping Information
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Enter your delivery information.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Full Name
          </label>

          <div className="relative">
            <User
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                updateField(
                  "name",
                  e.target.value
                )
              }
              placeholder="Your full name"
              className="h-12 w-full rounded-xl border border-gray-200 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Email
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                updateField(
                  "email",
                  e.target.value
                )
              }
              placeholder="you@example.com"
              className="h-12 w-full rounded-xl border border-gray-200 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Phone Number
          </label>

          <div className="relative">
            <Phone
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                updateField(
                  "phone",
                  e.target.value
                )
              }
              placeholder="01XXXXXXXXX"
              className="h-12 w-full rounded-xl border border-gray-200 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500"
            />
          </div>
        </div>

        {/* City */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            City
          </label>

          <div className="relative">
            <MapPin
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={formData.city}
              onChange={(e) =>
                updateField(
                  "city",
                  e.target.value
                )
              }
              placeholder="Dhaka"
              className="h-12 w-full rounded-xl border border-gray-200 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Address */}
        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Full Address
          </label>

          <textarea
            value={formData.address}
            onChange={(e) =>
              updateField(
                "address",
                e.target.value
              )
            }
            placeholder="House, Road, Area..."
            rows={4}
            className="w-full resize-none rounded-xl border border-gray-200 p-4 text-sm outline-none transition focus:border-emerald-500"
          />
        </div>
      </div>
    </div>
  );
}