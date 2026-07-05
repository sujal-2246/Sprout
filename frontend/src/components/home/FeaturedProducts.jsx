import ProductRail from "./ProductRail";
import { FEATURED_PRODUCTS } from "../../data/homeSections.mock";

export default function FeaturedProducts() {
  return (
    <ProductRail
      eyebrow="Handpicked"
      title="Featured products"
      description="A rotating shortlist our editors and top vendors put together every week."
      viewAllTo="/marketplace"
      products={FEATURED_PRODUCTS}
    />
  );
}
