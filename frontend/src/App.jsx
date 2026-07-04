import { Sprout } from 'lucide-react';
import { useProductFilters } from './hooks/useProductFilters';
import FilterSidebar from './components/FilterSidebar';
import SearchBar from './components/SearchBar';
import ProductGrid from './components/ProductGrid';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
];

export default function App() {
  const { filters, setCategory, toggleTag, setPriceRange, setSearch, setSortBy, setPage, clearAll } =
    useProductFilters();

  return (
    <div className="min-h-screen bg-base">
      {/* Glassmorphism header — sticky, translucent, blurred backdrop */}
      <header className="sticky top-0 z-40 border-b border-base-border/80 bg-base/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-4">
          <div className="flex items-center gap-2">
            <Sprout className="h-5 w-5 text-sprout" strokeWidth={1.75} />
            <span className="font-display text-base font-semibold tracking-tight text-ink">Sprout</span>
          </div>

          <div className="flex-1 max-w-md">
            <SearchBar value={filters.search} onChange={setSearch} />
          </div>

          <div className="ml-auto hidden items-center gap-2 sm:flex">
            <label htmlFor="sort" className="text-xs text-ink-muted">
              Sort
            </label>
            <select
              id="sort"
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
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex gap-8">
          <FilterSidebar
            filters={filters}
            setCategory={setCategory}
            toggleTag={toggleTag}
            setPriceRange={setPriceRange}
            clearAll={clearAll}
          />

          <div className="min-w-0 flex-1">
            <ProductGrid filters={filters} setPage={setPage} />
          </div>
        </div>
      </main>
    </div>
  );
}
