import CategorySidebar from "./CategorySidebar";
import Hero from "./Hero";

export default function HeroSection() {
  return (
    <section className="relative mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
      <div className="relative flex gap-6">
        <CategorySidebar />

        <div className="relative min-w-0 flex-1">
          <Hero />
        </div>
      </div>
    </section>
  );
}