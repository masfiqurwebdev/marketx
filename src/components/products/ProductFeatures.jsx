import {
  Headphones,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";

const features = [
  {
    title: "Free Shipping",
    description: "On orders over $50",
    icon: Truck,
  },
  {
    title: "Secure Payment",
    description: "100% secure checkout",
    icon: ShieldCheck,
  },
  {
    title: "Easy Returns",
    description: "30-day return policy",
    icon: RotateCcw,
  },
  {
    title: "24/7 Support",
    description: "We're here to help",
    icon: Headphones,
  },
];

export default function ProductFeatures() {
  return (
    <div className="mt-12 grid grid-cols-2 gap-3 border-y border-gray-100 py-6 lg:grid-cols-4">
      {features.map((feature) => {
        const Icon = feature.icon;

        return (
          <div
            key={feature.title}
            className="flex items-center gap-3 p-3"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
              <Icon size={20} />
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-900">
                {feature.title}
              </h3>

              <p className="mt-0.5 text-xs text-gray-400">
                {feature.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}