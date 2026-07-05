import Breadcrumb from "../components/ui/Breadcrumb";
import FilterSidebar from "../components/filter/FilterSidebar";
import ProductGrid from "../components/product/ProductGrid";
import { useProductFilters } from "../hooks/useProductFilters";

// Note: the global search box lives in the Navbar now (see
// components/layout/Navbar.jsx) and works by navigating to
// `/marketplace?search=...`. Because useProductFilters reads straight from
// the URL, that navigation updates `filters.search` here automatically —
// no separate wiring needed between the two.
export default function MarketplacePage() {
  const {
    filters,
    setCategory,
    toggleTag,
    setPriceRange,
    setSortBy,
    setPage,
    clearAll,
  } = useProductFilters();

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <Breadcrumb
        items={[{ label: "Home", to: "/" }, { label: "Marketplace" }]}
      />

      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Marketplace
        </h1>
        <p className="mt-1.5 text-sm text-ink-muted">
          Every listing from every vendor, filterable by category, tag, and
          price.
        </p>
      </div>

      <div className="flex gap-8">
        <FilterSidebar
          filters={filters}
          setCategory={setCategory}
          toggleTag={toggleTag}
          setPriceRange={setPriceRange}
          clearAll={clearAll}
        />

        <div className="min-w-0 flex-1">
          <ProductGrid
            filters={filters}
            setPage={setPage}
            setSortBy={setSortBy}
            clearAll={clearAll}
          />
        </div>
      </div>
    </div>
  );
}
