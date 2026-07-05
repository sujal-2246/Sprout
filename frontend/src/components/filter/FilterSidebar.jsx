import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import { CATEGORIES, TAGS } from '../../data/categories';
import PriceRangeSlider from './PriceRangeSlider';
import Button from '../ui/Button';

const PRICE_CEILING = 300;

/**
 * Every control here is "dumb" on purpose — it renders whatever `filters`
 * says is active and calls straight back up to the URL-sync setters passed
 * in from useProductFilters. There is no local checked/unchecked state to
 * fall out of sync with the URL, which is the whole point of reactive
 * syncing (unchanged from the original implementation).
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
      <fieldset className="flex flex-col gap-1">
        <legend className="mb-2 font-display text-xs font-medium uppercase tracking-wider text-ink-muted">
          Category
        </legend>
        {CATEGORIES.map(({ slug, label, icon: Icon }) => {
          const active = filters.category === slug;
          return (
            <label
              key={slug}
              className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm transition-colors
                ${active ? 'bg-sprout/10 text-sprout' : 'text-ink/90 hover:bg-base-raised hover:text-ink'}`}
            >
              <input
                type="radio"
                name="category"
                checked={active}
                onChange={() => setCategory(active ? '' : slug)}
                className="h-3.5 w-3.5 accent-sprout"
              />
              <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
              {label}
            </label>
          );
        })}
      </fieldset>

      {/* Tags — multi-select */}
      <fieldset className="flex flex-col gap-1">
        <legend className="mb-2 font-display text-xs font-medium uppercase tracking-wider text-ink-muted">
          Tags
        </legend>
        {TAGS.map(({ slug, label }) => {
          const active = filters.tags.includes(slug);
          return (
            <label
              key={slug}
              className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm transition-colors
                ${active ? 'bg-sprout/10 text-sprout' : 'text-ink/90 hover:bg-base-raised hover:text-ink'}`}
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

      {/* Price range — dual-handle slider with filled track */}
      <fieldset className="flex flex-col gap-3">
        <legend className="font-display text-xs font-medium uppercase tracking-wider text-ink-muted">
          Price
        </legend>
        <PriceRangeSlider
          min={0}
          max={PRICE_CEILING}
          step={5}
          valueMin={filters.minPrice}
          valueMax={filters.maxPrice}
          onChange={(nextMin, nextMax) => setPriceRange(nextMin, nextMax)}
        />
      </fieldset>
    </div>
  );

  return (
    <>
      {/* Mobile trigger */}
      <Button
        variant="secondary"
        size="md"
        onClick={() => setMobileOpen(true)}
        className="mb-4 w-full justify-between lg:hidden"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </span>
        {hasActiveFilters && <span className="h-1.5 w-1.5 rounded-full bg-sprout" />}
      </Button>

      {/* Desktop sidebar — sticky, always visible */}
      <aside className="sticky top-20 hidden h-[calc(100vh-6rem)] w-64 shrink-0 rounded-xl border border-base-border bg-base-surface/60 lg:block">
        {sidebarContent}
      </aside>

      {/* Mobile drawer — slides in from the left with Framer Motion */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
              className="absolute inset-y-0 left-0 w-80 max-w-[85vw] border-r border-base-border bg-base-surface shadow-soft-lg"
            >
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
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
