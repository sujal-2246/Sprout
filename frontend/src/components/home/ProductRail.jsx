import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import ProductCard from "../product/ProductCard";
import QuickViewModal from "../product/QuickViewModal";

/**
 * One shared implementation behind FeaturedProducts / TrendingProducts /
 * NewArrivals / BestSellers — each of those is a thin wrapper that supplies
 * its own copy and mock dataset, so the actual rendering, scroll-reveal
 * animation, and quick-view wiring live in exactly one place.
 */
export default function ProductRail({
  eyebrow,
  title,
  description,
  viewAllTo,
  products,
}) {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        description={description}
        viewAllTo={viewAllTo}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={setQuickViewProduct}
          />
        ))}
      </motion.div>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
}
