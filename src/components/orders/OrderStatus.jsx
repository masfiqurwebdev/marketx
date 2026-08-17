"use client";

import {
  CheckCircle2,
  Package,
  Truck,
  Clock,
} from "lucide-react";

export default function OrderStatus({
  status = "Processing",
}) {
  const steps = [
    {
      name: "Processing",
      icon: Clock,
    },
    {
      name: "Packed",
      icon: Package,
    },
    {
      name: "Shipped",
      icon: Truck,
    },
    {
      name: "Delivered",
      icon: CheckCircle2,
    },
  ];

  const currentIndex = steps.findIndex(
    (step) => step.name === status
  );

  return (
    <div className="mt-6">
      <div className="flex items-start justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;

          const completed =
            index <= currentIndex;

          return (
            <div
              key={step.name}
              className="flex flex-1 flex-col items-center"
            >
              <div className="relative flex w-full items-center justify-center">
                {index !== 0 && (
                  <div
                    className={`absolute right-1/2 top-1/2 h-0.5 w-full -translate-y-1/2 ${
                      index <= currentIndex
                        ? "bg-emerald-500"
                        : "bg-gray-200"
                    }`}
                  />
                )}

                <div
                  className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full ${
                    completed
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <Icon size={18} />
                </div>
              </div>

              <span
                className={`mt-2 text-center text-xs font-medium ${
                  completed
                    ? "text-emerald-600"
                    : "text-gray-400"
                }`}
              >
                {step.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}