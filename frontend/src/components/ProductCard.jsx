import { Leaf } from 'lucide-react';

// Stock is bucketed into a 0-100% fill for the growth bar rather than
// showing a raw number as the primary signal — "almost out" reads faster
// as a short bar than as the text "3 left" buried under the price.
function stockFillPercent(stock) {
  if (stock <= 0) return 0;
  return Math.min(100, Math.round((stock / 50) * 100));
}

export default function ProductCard({ product }) {
  const outOfStock = product.stock <= 0;
  const fill = stockFillPercent(product.stock);

  return (
    <article
      className="group rounded-xl border border-base-border bg-base-surface p-3 transition-colors
                 hover:border-sprout/40"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-base-raised">
        {/* Placeholder swatch — wire up real product imagery here */}
        <div className="flex h-full w-full items-center justify-center text-ink-faint">
          <Leaf className="h-8 w-8" strokeWidth={1.25} />
        </div>
        {product.tags.includes('limited-edition') && (
          <span className="absolute left-2 top-2 rounded-full bg-soil/90 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-base">
            Limited
          </span>
        )}
      </div>

      <div className="mt-3">
        <h3 className="line-clamp-1 font-display text-sm font-medium text-ink">{product.title}</h3>
        <p className="mt-0.5 text-xs text-ink-muted">{product.vendor}</p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="font-mono text-sm font-medium text-ink">${product.price}</span>

        <div className="flex items-center gap-1.5" title={outOfStock ? 'Out of stock' : `${product.stock} in stock`}>
          <div className="h-1 w-10 overflow-hidden rounded-full bg-base-border">
            <div
              className={`h-full rounded-full transition-all ${outOfStock ? 'bg-ink-faint' : 'bg-sprout'}`}
              style={{ width: `${fill}%` }}
            />
          </div>
          <span className="font-mono text-[10px] text-ink-faint">
            {outOfStock ? '—' : product.stock}
          </span>
        </div>
      </div>
    </article>
  );
}
