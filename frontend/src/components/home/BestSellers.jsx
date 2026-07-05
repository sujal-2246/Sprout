import ProductRail from "./ProductRail";
import { BEST_SELLERS } from "../../data/homeSections.mock";

export default function BestSellers() {
  return (
    <ProductRail
      eyebrow="Proven favorites"
      title="Best sellers"
      description="The most-reordered products across every vendor on Sprout."
      viewAllTo="/marketplace"
      products={BEST_SELLERS}
    />
  );
}
