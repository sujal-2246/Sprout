import ProductRail from "./ProductRail";
import { NEW_ARRIVALS } from "../../data/homeSections.mock";

export default function NewArrivals() {
  return (
    <ProductRail
      eyebrow="Just landed"
      title="New arrivals"
      description="Fresh listings from vendors who joined or restocked recently."
      viewAllTo="/marketplace?sortBy=newest"
      products={NEW_ARRIVALS}
    />
  );
}
