import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Single source of truth for every filter Sprout's product grid supports.
 * The URL query string IS the state — components never hold their own
 * "is this checkbox checked" state, they derive it from what this hook
 * reads out of the URL. That's what makes filters shareable/bookmarkable
 * and keeps back/forward navigation working for free.
 *
 * Flow is unidirectional:
 *   user interaction -> setters below -> URLSearchParams updated
 *   -> component re-renders reading the new URL -> UI reflects new state
 *
 * Any setter other than setPage resets page back to 1, since changing
 * what you're filtering by invalidates whatever page you were on.
 */
export function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => {
    const tagsRaw = searchParams.get('tags');
    return {
      category: searchParams.get('category') || '',
      tags: tagsRaw ? tagsRaw.split(',').filter(Boolean) : [],
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      search: searchParams.get('search') || '',
      sortBy: searchParams.get('sortBy') || 'newest',
      page: Number.parseInt(searchParams.get('page') || '1', 10) || 1,
    };
  }, [searchParams]);

  /**
   * Merges a partial filter update into the URL. Omits keys whose new
   * value is empty/falsy so the query string stays clean (no ?category=
   * hanging around once a filter is cleared).
   */
  const applyUpdate = useCallback(
    (updates, { resetPage = true } = {}) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);

        Object.entries(updates).forEach(([key, value]) => {
          const isEmpty = value === '' || value === null || value === undefined ||
            (Array.isArray(value) && value.length === 0);
          if (isEmpty) {
            next.delete(key);
          } else {
            next.set(key, Array.isArray(value) ? value.join(',') : String(value));
          }
        });

        if (resetPage) {
          next.set('page', '1');
        }

        return next;
      });
    },
    [setSearchParams]
  );

  const setCategory = useCallback((category) => applyUpdate({ category }), [applyUpdate]);

  const toggleTag = useCallback(
    (tag) => {
      const next = filters.tags.includes(tag)
        ? filters.tags.filter((t) => t !== tag)
        : [...filters.tags, tag];
      applyUpdate({ tags: next });
    },
    [filters.tags, applyUpdate]
  );

  const setPriceRange = useCallback(
    (minPrice, maxPrice) => applyUpdate({ minPrice, maxPrice }),
    [applyUpdate]
  );

  const setSearch = useCallback((search) => applyUpdate({ search }), [applyUpdate]);

  const setSortBy = useCallback((sortBy) => applyUpdate({ sortBy }), [applyUpdate]);

  // Page changes are the one update that should NOT reset itself back to 1.
  const setPage = useCallback(
    (page) => applyUpdate({ page }, { resetPage: false }),
    [applyUpdate]
  );

  const clearAll = useCallback(() => setSearchParams(new URLSearchParams()), [setSearchParams]);

  return { filters, setCategory, toggleTag, setPriceRange, setSearch, setSortBy, setPage, clearAll };
}
