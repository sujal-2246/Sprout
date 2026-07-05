import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, Heart, ShoppingCart, ArrowRight } from "lucide-react";
import ProductImage from "../product/ProductImage";
import Rating from "../ui/Rating";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { useWishlist } from "../../contexts/WishlistContext";
import { useCart } from "../../contexts/CartContext";
import { discountPercent } from "../../utils/formatCurrency";
import { useFocusTrap } from "../../hooks/useFocusTrap";

export default function QuickViewModal({ product, onClose }) {
  const { hasItem, toggleItem } = useWishlist();
  const { addItem } = useCart();
  const dialogRef = useRef(null);

  useFocusTrap(dialogRef, Boolean(product));

  // Escape closes the modal; body scroll is locked while it's open so the
  // page behind it doesn't scroll along with a long description.
  useEffect(() => {
    if (!product) return undefined;
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  if (!product) return null;

  const wishlisted = hasItem(product.id);
  const discount = discountPercent(product.price, product.compareAtPrice);
  const outOfStock = product.stock <= 0;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Quick view — ${product.title}`}
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative grid w-full max-w-2xl grid-cols-1 gap-6 rounded-2xl border border-base-border bg-base-surface p-6 shadow-soft-lg outline-none sm:grid-cols-2"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close quick view"
            className="absolute right-4 top-4 rounded-full p-1.5 text-ink-muted hover:bg-base-raised hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>

          <ProductImage
            product={product}
            className="aspect-square w-full rounded-xl"
          />

          <div className="flex flex-col">
            <p className="text-xs text-ink-muted">{product.vendor}</p>
            <h2 className="mt-1 font-display text-xl font-semibold text-ink">
              {product.title}
            </h2>

            {product.rating !== undefined && product.rating !== null && (
              <Rating
                value={product.rating}
                count={product.reviewCount}
                className="mt-2"
              />
            )}

            <div className="mt-3 flex items-center gap-2">
              <span className="font-mono text-lg font-semibold text-ink">
                ${product.price}
              </span>
              {product.compareAtPrice && (
                <span className="font-mono text-sm text-ink-faint line-through">
                  ${product.compareAtPrice}
                </span>
              )}
              {discount && <Badge tone="soil">-{discount}%</Badge>}
            </div>

            {product.description && (
              <p className="mt-3 line-clamp-3 text-sm text-ink-muted">
                {product.description}
              </p>
            )}

            <div className="mt-auto flex flex-col gap-2 pt-6">
              <div className="flex gap-2">
                <Button
                  variant="primary"
                  className="flex-1"
                  disabled={outOfStock}
                  onClick={() => addItem(product)}
                >
                  <ShoppingCart className="h-4 w-4" />
                  {outOfStock ? "Out of stock" : "Add to cart"}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => toggleItem(product)}
                  aria-pressed={wishlisted}
                  aria-label={
                    wishlisted ? "Remove from wishlist" : "Add to wishlist"
                  }
                >
                  <Heart
                    className="h-4 w-4"
                    fill={wishlisted ? "currentColor" : "none"}
                  />
                </Button>
              </div>
              <Link
                to={`/product/${product.id}`}
                state={{ product }}
                onClick={onClose}
                className="flex items-center justify-center gap-1.5 py-1 text-sm text-ink-muted hover:text-sprout transition-colors"
              >
                View full details <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
