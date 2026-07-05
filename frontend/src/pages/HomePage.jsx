import HeroBanner from '../components/home/HeroBanner';
import CategoriesSection from '../components/home/CategoriesSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import TrendingProducts from '../components/home/TrendingProducts';
import NewArrivals from '../components/home/NewArrivals';
import BestSellers from '../components/home/BestSellers';
import FeaturedVendors from '../components/home/FeaturedVendors';
import Newsletter from '../components/home/Newsletter';

export default function HomePage() {
  return (
    <div>
      <HeroBanner />
      <CategoriesSection />
      <FeaturedProducts />
      <TrendingProducts />
      <NewArrivals />
      <BestSellers />
      <FeaturedVendors />
      <Newsletter />
    </div>
  );
}
