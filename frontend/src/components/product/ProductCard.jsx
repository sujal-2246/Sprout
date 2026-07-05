import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Eye, ShoppingCart } from "lucide-react";
import ProductImage from "./ProductImage";
import Badge from "../ui/Badge";
import Rating from "../ui/Rating";
import { useWishlist } from "../../contexts/WishlistContext";
import { useCart } from "../../contexts/CartContext";
import { discountPercent } from "../../utils/formatCurrency";

// Stock is bucketed into a 0-100% fill for the growth bar rather than
// showing a raw number as the primary signal — "almost out" reads faster
// as a short bar than as the text "3 left" buried under the price.
function stockFillPercent(stock) {
  if (stock <= 0) return 0;
  return Math.min(100, Math.round((stock / 50) * 100));
}

export default function ProductCard({ product, onQuickView }) {
  const { hasItem, toggleItem } = useWishlist();
  const { addItem } = useCart();

  const outOfStock = product.stock <= 0;
  const lowStock = !outOfStock && product.stock <= 5;
  const fill = stockFillPercent(product.stock);
  const wishlisted = hasItem(product.id);
  const discount = discountPercent(product.price, product.compareAtPrice);

  return (
    <motion.article
      layout
      whileHover={{ y: -4 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="group relative rounded-xl border border-base-border bg-base-surface p-3 shadow-soft transition-colors hover:border-sprout/40 hover:shadow-soft-lg"
    >
      <Link to={`/product/${product.id}`} state={{ product }} className="block">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg">
          <ProductImage
            product={product}
            className="h-full w-full transition-transform duration-300 group-hover:scale-105"
          />

          <div className="absolute left-2 top-2 flex flex-col gap-1.5">
            {discount && <Badge tone="soil">-{discount}%</Badge>}
            {product.tags?.includes("limited-edition") && (
              <Badge tone="soil">Limited</Badge>
            )}
            {lowStock && <Badge tone="danger">Low stock</Badge>}
          </div>

          {/* Quick view — fades in on hover/focus so the card stays clean at rest */}
          {onQuickView && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              aria-label={`Quick view ${product.title}`}
              className="absolute bottom-2 left-1/2 flex -translate-x-1/2 translate-y-2 items-center gap-1.5 whitespace-nowrap rounded-full bg-base-surface/95 px-3 py-1.5 text-xs font-medium text-ink opacity-0 shadow-soft-lg backdrop-blur-sm transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100"
            >
              <Eye className="h-3.5 w-3.5" />
              Quick view
            </button>
          )}
        </div>
      </Link>

      {/* Wishlist toggle — outside the Link so it doesn't trigger navigation */}
      <button
        type="button"
        onClick={() => toggleItem(product)}
        aria-label={
          wishlisted
            ? `Remove ${product.title} from wishlist`
            : `Add ${product.title} to wishlist`
        }
        aria-pressed={wishlisted}
        className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-base-surface/90 text-ink-muted shadow-soft backdrop-blur-sm transition-colors hover:text-danger"
      >
        <Heart
          className="h-4 w-4"
          fill={wishlisted ? "currentColor" : "none"}
          strokeWidth={1.75}
          style={wishlisted ? { color: "rgb(var(--color-danger))" } : undefined}
        />
      </button>

      <Link to={`/product/${product.id}`} state={{ product }} className="block">
        <div className="mt-3">
          <h3 className="line-clamp-1 font-display text-sm font-medium text-ink">
            {product.title}
          </h3>
          <p className="mt-0.5 text-xs text-ink-muted">{product.vendor}</p>
        </div>

        {product.rating !== undefined && product.rating !== null && (
          <Rating
            value={product.rating}
            count={product.reviewCount}
            className="mt-1.5"
          />
        )}

        <div className="mt-3 flex items-center gap-2">
          <span className="font-mono text-sm font-semibold text-ink">
            ${product.price}
          </span>
          {product.compareAtPrice && (
            <span className="font-mono text-xs text-ink-faint line-through">
              ${product.compareAtPrice}
            </span>
          )}
        </div>
      </Link>

      <div className="mt-3 flex items-center justify-between gap-2">
        <div
          className="flex items-center gap-1.5"
          title={outOfStock ? "Out of stock" : `${product.stock} in stock`}
        >
          <div className="h-1 w-8 overflow-hidden rounded-full bg-base-border">
            <div
              className={`h-full rounded-full transition-all ${outOfStock ? "bg-ink-faint" : "bg-sprout"}`}
              style={{ width: `${fill}%` }}
            />
          </div>
          <span className="font-mono text-[10px] text-ink-faint">
            {outOfStock ? "—" : product.stock}
          </span>
        </div>

        <button
          type="button"
          disabled={outOfStock}
          onClick={() => addItem(product)}
          aria-label={`Add ${product.title} to cart`}
          className="flex items-center gap-1.5 rounded-lg bg-sprout px-2.5 py-1.5 text-xs font-semibold text-base transition-colors hover:bg-sprout-bright disabled:pointer-events-none disabled:opacity-40"
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          Add
        </button>
      </div>
    </motion.article>
  );
}
