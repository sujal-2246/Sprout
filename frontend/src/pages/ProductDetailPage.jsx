import { useMemo, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { Heart, ShoppingCart, Share2, Minus, Plus } from "lucide-react";
import Breadcrumb from "../components/ui/Breadcrumb";
import Badge from "../components/ui/Badge";
import Rating from "../components/ui/Rating";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import ProductGallery from "../components/product/ProductGallery";
import ProductSpecs from "../components/product/ProductSpecs";
import ProductReviews from "../components/product/ProductReviews";
import RelatedProducts from "../components/product/RelatedProducts";
import VendorCard from "../components/product/VendorCard";
import SkeletonCard from "../components/product/SkeletonCard";
import { useProducts } from "../hooks/useProducts";
import { useWishlist } from "../contexts/WishlistContext";
import { useCart } from "../contexts/CartContext";
import { discountPercent } from "../utils/formatCurrency";
import { CATEGORIES } from "../data/categories";

export default function ProductDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const passedProduct = location.state?.product;

  // There's no GET /api/products/:id yet (docs/PHASE1.md §8 — that's
  // scoped for Phase 2). Until then: the product a shopper clicked through
  // from is passed via router state for an instant, no-flash render, and
  // as a fallback we fetch a large page of the real catalog and search it
  // client-side — which also doubles as the dataset "related products"
  // draws from.
  const { products: catalog, status } = useProducts({ page: 1, limit: 100 });

  const product = useMemo(() => {
    if (passedProduct) return passedProduct;
    return catalog.find((p) => String(p.id) === id) ?? null;
  }, [passedProduct, catalog, id]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return catalog
      .filter(
        (p) =>
          p.id !== product.id &&
          p.categories?.some((c) => product.categories?.includes(c)),
      )
      .slice(0, 4);
  }, [catalog, product]);

  const [quantity, setQuantity] = useState(1);
  const { hasItem, toggleItem } = useWishlist();
  const { addItem } = useCart();

  const isStillResolving = !passedProduct && status === "loading";

  if (isStillResolving) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <SkeletonCard />
          <div className="space-y-3">
            <div className="h-4 w-1/3 animate-breathe rounded bg-base-raised" />
            <div className="h-8 w-2/3 animate-breathe rounded bg-base-raised" />
            <div className="h-24 w-full animate-breathe rounded bg-base-raised" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16">
        <EmptyState
          title="We couldn't find that product"
          description="It may have been removed, or the link is out of date."
          actionLabel="Back to marketplace"
          onAction={() =>
            window.history.length > 1 ? window.history.back() : null
          }
        />
      </div>
    );
  }

  const categoryLabel = CATEGORIES.find(
    (c) => c.slug === product.categories?.[0],
  )?.label;
  const wishlisted = hasItem(product.id);
  const discount = discountPercent(product.price, product.compareAtPrice);
  const outOfStock = product.stock <= 0;

  const handleShare = async () => {
    const shareData = {
      title: product.title,
      text: `Check out ${product.title} on Sprout`,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled — nothing to do
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <Breadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: "Marketplace", to: "/marketplace" },
          ...(categoryLabel
            ? [
                {
                  label: categoryLabel,
                  to: `/marketplace?category=${product.categories[0]}`,
                },
              ]
            : []),
          { label: product.title },
        ]}
      />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <ProductGallery product={product} />

        <div>
          <p className="text-sm text-ink-muted">{product.vendor}</p>
          <h1 className="mt-1 font-display text-2xl font-semibold text-ink sm:text-3xl">
            {product.title}
          </h1>

          {product.rating !== undefined && product.rating !== null && (
            <Rating
              value={product.rating}
              count={product.reviewCount}
              size="md"
              className="mt-3"
            />
          )}

          <div className="mt-4 flex items-center gap-3">
            <span className="font-mono text-2xl font-semibold text-ink">
              ${product.price}
            </span>
            {product.compareAtPrice && (
              <span className="font-mono text-base text-ink-faint line-through">
                ${product.compareAtPrice}
              </span>
            )}
            {discount && <Badge tone="soil">Save {discount}%</Badge>}
          </div>

          <p className="mt-2 text-xs text-ink-muted">
            {outOfStock
              ? "Out of stock"
              : `${product.stock} in stock — ships from ${product.vendor}`}
          </p>

          {product.description && (
            <p className="mt-5 text-sm leading-relaxed text-ink-muted">
              {product.description}
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-lg border border-base-border">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="flex h-10 w-10 items-center justify-center text-ink-muted hover:text-ink"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-8 text-center font-mono text-sm text-ink">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="flex h-10 w-10 items-center justify-center text-ink-muted hover:text-ink"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>

            <Button
              variant="primary"
              size="lg"
              disabled={outOfStock}
              onClick={() => addItem(product, quantity)}
              className="flex-1 sm:flex-none"
            >
              <ShoppingCart className="h-4 w-4" />
              {outOfStock ? "Out of stock" : "Add to cart"}
            </Button>

            <Button
              variant="secondary"
              size="lg"
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

            <Button
              variant="ghost"
              size="lg"
              onClick={handleShare}
              aria-label="Share this product"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-8">
            <VendorCard vendorName={product.vendor} />
          </div>

          <div className="mt-6">
            <h2 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-ink-muted">
              Specifications
            </h2>
            <ProductSpecs product={product} />
          </div>
        </div>
      </div>

      <div className="mt-16 max-w-2xl">
        <h2 className="mb-4 font-display text-xl font-semibold text-ink">
          Reviews
        </h2>
        <ProductReviews productId={product.id} />
      </div>

      <RelatedProducts products={relatedProducts} />

      <p className="mt-4 text-center text-xs text-ink-faint">
        Looking for something else?{" "}
        <Link to="/marketplace" className="text-sprout hover:underline">
          Back to marketplace
        </Link>
      </p>
    </div>
  );
}
