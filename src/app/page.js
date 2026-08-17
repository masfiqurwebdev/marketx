import BestSellers from "../components/home/BestSellers";
import Features from "../components/home/Features";
import FlashDeals from "../components/home/FlashDeals";
import HeroSection from "../components/home/HeroSection";
import NewArrivals from "../components/home/NewArrivals";
import Newsletter from "../components/home/Newsletter";
import PopularCategories from "../components/home/PopularCategories";
import PromoBanner from "../components/home/PromoBanner";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Features />
      <FlashDeals />


      <PopularCategories />

      <BestSellers />

      <PromoBanner />

      <NewArrivals />

      <Newsletter/>
    </main>
  );
}