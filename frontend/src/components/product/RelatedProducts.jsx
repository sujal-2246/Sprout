import { useState } from "react";
import SectionHeading from "../ui/SectionHeading";
import ProductCard from "./ProductCard";
import QuickViewModal from "./QuickViewModal";

export default function RelatedProducts({ products }) {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  if (products.length === 0) return null;

  return (
    <section className="mt-16">
      <SectionHeading eyebrow="You might also like" title="Related products" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={setQuickViewProduct}
          />
        ))}
      </div>
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
}
