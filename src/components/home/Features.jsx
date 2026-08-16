import {
  Truck,
  RotateCcw,
  ShieldCheck,
  Headphones,
} from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $60",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30 days return policy",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "100% secure checkout",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "We're here to help",
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-[1500px] px-4 pb-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Icon */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500 transition duration-300 group-hover:bg-emerald-500 group-hover:text-white">
                <Icon size={24} strokeWidth={1.8} />
              </div>

              {/* Text */}
              <div>
                <h3 className="text-sm font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}