import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';

const CATEGORIES = [
  { slug: 'keyboards', label: 'Keyboards' },
  { slug: 'footwear', label: 'Footwear' },
  { slug: 'audio', label: 'Audio' },
];

const TAGS = [
  { slug: 'wireless', label: 'Wireless' },
  { slug: 'mechanical', label: 'Mechanical' },
  { slug: 'water-resistant', label: 'Water Resistant' },
  { slug: 'noise-cancelling', label: 'Noise Cancelling' },
  { slug: 'limited-edition', label: 'Limited Edition' },
];

const PRICE_CEILING = 300;

/**
 * Every control here is "dumb" on purpose — it renders whatever `filters`
 * says is active and calls straight back up to the URL-sync setters.
 * There is no local checked/unchecked state to fall out of sync with the
 * URL, which is the whole point of reactive syncing.
 */
export default function FilterSidebar({ filters, setCategory, toggleTag, setPriceRange, clearAll }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const hasActiveFilters =
    filters.category || filters.tags.length > 0 || filters.minPrice || filters.maxPrice;

  const sidebarContent = (
    <div className="flex h-full flex-col gap-8 overflow-y-auto scrollbar-thin px-5 py-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-sm font-semibold tracking-wide text-ink">Filters</h2>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearAll}
            className="text-xs text-ink-muted underline decoration-dotted underline-offset-4 hover:text-sprout transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Category — single select, acts as a radio group */}
      <fieldset className="flex flex-col gap-2.5">
        <legend className="mb-1 font-display text-xs font-medium uppercase tracking-wider text-ink-muted">
          Category
        </legend>
        {CATEGORIES.map(({ slug, label }) => {
          const active = filters.category === slug;
          return (
            <label
              key={slug}
              className="flex cursor-pointer items-center gap-2.5 text-sm text-ink/90 hover:text-ink"
            >
              <input
                type="radio"
                name="category"
                checked={active}
                onChange={() => setCategory(active ? '' : slug)}
                className="h-3.5 w-3.5 accent-sprout"
              />
              {label}
            </label>
          );
        })}
      </fieldset>

      {/* Tags — multi-select */}
      <fieldset className="flex flex-col gap-2.5">
        <legend className="mb-1 font-display text-xs font-medium uppercase tracking-wider text-ink-muted">
          Tags
        </legend>
        {TAGS.map(({ slug, label }) => {
          const active = filters.tags.includes(slug);
          return (
            <label
              key={slug}
              className="flex cursor-pointer items-center gap-2.5 text-sm text-ink/90 hover:text-ink"
            >
              <input
                type="checkbox"
                checked={active}
                onChange={() => toggleTag(slug)}
                className="h-3.5 w-3.5 rounded accent-sprout"
              />
              {label}
            </label>
          );
        })}
      </fieldset>

      {/* Price range — two-handle slider backed by native range inputs */}
      <fieldset className="flex flex-col gap-3">
        <legend className="mb-1 font-display text-xs font-medium uppercase tracking-wider text-ink-muted">
          Price
        </legend>
        <div className="flex items-center justify-between font-mono text-xs text-ink-muted">
          <span>${filters.minPrice || 0}</span>
          <span>${filters.maxPrice || PRICE_CEILING}+</span>
        </div>
        <input
          type="range"
          min={0}
          max={PRICE_CEILING}
          step={5}
          value={filters.minPrice || 0}
          onChange={(e) => setPriceRange(e.target.value, filters.maxPrice)}
          className="w-full accent-sprout"
          aria-label="Minimum price"
        />
        <input
          type="range"
          min={0}
          max={PRICE_CEILING}
          step={5}
          value={filters.maxPrice || PRICE_CEILING}
          onChange={(e) => setPriceRange(filters.minPrice, e.target.value)}
          className="w-full accent-sprout"
          aria-label="Maximum price"
        />
      </fieldset>
    </div>
  );

  return (
    <>
      {/* Mobile trigger */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="mb-4 flex items-center gap-2 rounded-lg border border-base-border bg-base-surface
                   px-3.5 py-2 text-sm text-ink lg:hidden"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters
        {hasActiveFilters && <span className="h-1.5 w-1.5 rounded-full bg-sprout" />}
      </button>

      {/* Desktop sidebar — sticky, always visible */}
      <aside className="sticky top-20 hidden h-[calc(100vh-6rem)] w-64 shrink-0 rounded-xl border border-base-border bg-base-surface/60 lg:block">
        {sidebarContent}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85vw] border-r border-base-border bg-base-surface shadow-2xl">
            <div className="flex items-center justify-between border-b border-base-border px-5 py-4">
              <span className="font-display text-sm font-semibold">Filters</span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close filters"
                className="rounded-md p-1 text-ink-muted hover:bg-base-raised hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
