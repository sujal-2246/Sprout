import { useEffect, useRef, useState } from 'react';

const DEFAULT_LIMIT = 12;

/**
 * Builds the exact query string the backend expects. Kept separate from
 * any one consumer so both the marketplace grid (full filter set) and the
 * product detail page (just wants "give me a big page of the catalog")
 * can share it without duplicating the param-building logic.
 */
function buildApiQuery(filters) {
  const params = new URLSearchParams();
  if (filters.category) params.set('category', filters.category);
  if (filters.tags?.length) params.set('tags', filters.tags.join(','));
  if (filters.minPrice) params.set('minPrice', filters.minPrice);
  if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
  if (filters.search) params.set('search', filters.search);
  if (filters.sortBy) params.set('sortBy', filters.sortBy);
  params.set('page', String(filters.page || 1));
  params.set('limit', String(filters.limit || DEFAULT_LIMIT));
  return params.toString();
}

/**
 * Fetches GET /api/products for a given filter shape. Returns
 * { products, metadata, status } where status is 'loading' | 'success' | 'error'.
 *
 * A monotonically increasing request id guards against a slow earlier
 * request overwriting a faster later one (e.g. rapid filter changes) —
 * only the response matching the most recent request is ever applied.
 */
export function useProducts(filters) {
  const [products, setProducts] = useState([]);
  const [metadata, setMetadata] = useState(null);
  const [status, setStatus] = useState('loading');
  const requestIdRef = useRef(0);

  // Filters is a fresh object literal on every render for most callers;
  // serializing it is what lets the effect below depend on its actual
  // *values* rather than re-fetching on every re-render.
  const filterKey = JSON.stringify(filters);

  useEffect(() => {
    const requestId = ++requestIdRef.current;
    setStatus('loading');

    fetch(`/api/products?${buildApiQuery(JSON.parse(filterKey))}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed with ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (requestIdRef.current !== requestId) return; // stale response
        setProducts(data.products);
        setMetadata(data.metadata);
        setStatus('success');
      })
      .catch((err) => {
        if (requestIdRef.current !== requestId) return;
        console.error('Failed to fetch products:', err);
        setStatus('error');
      });
  }, [filterKey]);

  return { products, metadata, status };
}
