import ProductRail from "./ProductRail";
import { TRENDING_PRODUCTS } from "../../data/homeSections.mock";

export default function TrendingProducts() {
  return (
    <ProductRail
      eyebrow="Right now"
      title="Trending this week"
      description="What shoppers across the marketplace are adding to cart most."
      viewAllTo="/marketplace?sortBy=newest"
      products={TRENDING_PRODUCTS}
    />
  );
}
