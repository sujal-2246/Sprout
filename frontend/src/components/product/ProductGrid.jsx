import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import Pagination from "./Pagination";
import QuickViewModal from "../product/QuickViewModal";
import EmptyState from "../ui/EmptyState";
import ErrorState from "../ui/ErrorState";
import { useProducts } from "../../hooks/useProducts";

const SKELETON_COUNT = 12;

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

export default function ProductGrid({ filters, setPage, setSortBy, clearAll }) {
  const { products, metadata, status } = useProducts({ ...filters, limit: 12 });
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  return (
    <div>
      {/* Toolbar — result count + sort. Rendered even while loading so the
          layout doesn't jump once results arrive. */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="text-sm text-ink-muted">
          {status === "success" && metadata
            ? `${metadata.totalItems} ${metadata.totalItems === 1 ? "result" : "results"}`
            : "\u00A0"}
        </p>
        <label className="flex items-center gap-2 text-sm text-ink-muted">
          Sort
          <select
            value={filters.sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-base-border bg-base-surface px-2.5 py-1.5 text-xs text-ink
                       focus:border-sprout/50 focus:outline-none focus:ring-2 focus:ring-sprout/40"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {status === "loading" && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {status === "error" && (
        <ErrorState description="Couldn't load products. Check that the API is running and try again." />
      )}

      {status === "success" && products.length === 0 && (
        <EmptyState
          title="Nothing matches these filters yet"
          description="Try widening the price range or clearing a tag."
          actionLabel={clearAll ? "Clear all filters" : undefined}
          onAction={clearAll}
        />
      )}

      {status === "success" && products.length > 0 && (
        <>
          <motion.div
            layout
            className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            <AnimatePresence>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {metadata && (
            <Pagination
              currentPage={metadata.currentPage}
              totalPages={metadata.totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      )}

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
