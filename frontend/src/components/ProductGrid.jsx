import { useEffect, useState, useRef } from 'react';
import { Sprout } from 'lucide-react';
import ProductCard from './ProductCard';
import SkeletonCard from './SkeletonCard';
import Pagination from './Pagination';

const SKELETON_COUNT = 8;

/**
 * Builds the exact query string the backend expects from the URL-derived
 * filters object. Kept separate from useProductFilters so this component
 * owns "how do I talk to the API" while the hook owns "what does the URL
 * say" — the two shouldn't need to know about each other's shape.
 */
function buildApiQuery(filters) {
  const params = new URLSearchParams();
  if (filters.category) params.set('category', filters.category);
  if (filters.tags.length > 0) params.set('tags', filters.tags.join(','));
  if (filters.minPrice) params.set('minPrice', filters.minPrice);
  if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
  if (filters.search) params.set('search', filters.search);
  if (filters.sortBy) params.set('sortBy', filters.sortBy);
  params.set('page', String(filters.page));
  params.set('limit', '12');
  return params.toString();
}

export default function ProductGrid({ filters, setPage }) {
  const [products, setProducts] = useState([]);
  const [metadata, setMetadata] = useState(null);
  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'

  // Guards against a slow earlier request overwriting a faster later one
  // when filters change quickly (e.g. rapid tag toggling).
  const requestIdRef = useRef(0);

  useEffect(() => {
    const requestId = ++requestIdRef.current;
    setStatus('loading');

    const query = buildApiQuery(filters);

    fetch(`/api/products?${query}`)
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
  }, [filters]);

  if (status === 'loading') {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-base-border bg-base-surface py-20 text-center">
        <p className="text-sm text-ink">Couldn't load products.</p>
        <p className="text-xs text-ink-muted">Check that the API is running and try again.</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-base-border bg-base-surface py-20 text-center">
        <Sprout className="h-8 w-8 text-ink-faint" strokeWidth={1.25} />
        <p className="text-sm text-ink">Nothing matches these filters yet.</p>
        <p className="text-xs text-ink-muted">Try widening the price range or clearing a tag.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {metadata && (
        <Pagination
          currentPage={metadata.currentPage}
          totalPages={metadata.totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
