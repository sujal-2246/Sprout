const { mockProducts } = require('../data/mockProducts');

/**
 * Applies the same filter/sort/paginate semantics as queryBuilder.js's SQL,
 * but against the in-memory array. Keeping the two in lockstep is what lets
 * USE_MOCK_DB flip on/off without the frontend noticing any behavior
 * difference beyond real vs. fake data.
 */
function filterMockProducts(filters) {
  const { category, tags, minPriceCents, maxPriceCents, search, sortBy, limit, offset } = filters;

  let results = mockProducts.filter((product) => {
    if (category && !product.category_slugs.includes(category)) return false;

    if (tags.length > 0) {
      const matchesAtLeastOneTag = tags.some((tag) => product.tag_slugs.includes(tag));
      if (!matchesAtLeastOneTag) return false;
    }

    if (minPriceCents !== null && product.base_price < minPriceCents) return false;
    if (maxPriceCents !== null && product.base_price > maxPriceCents) return false;

    if (search && !product.title.toLowerCase().includes(search.toLowerCase())) return false;

    return true;
  });

  const effectiveSort = sortBy === 'relevance' && !search ? 'newest' : sortBy;
  const sorters = {
    newest: (a, b) => new Date(b.created_at) - new Date(a.created_at),
    price_asc: (a, b) => a.base_price - b.base_price,
    price_desc: (a, b) => b.base_price - a.base_price,
    // Naive relevance: exact-title matches first, then by recency. Good
    // enough for local dev; the real query uses pg_trgm similarity.
    relevance: (a, b) => {
      const aExact = a.title.toLowerCase() === search.toLowerCase() ? 1 : 0;
      const bExact = b.title.toLowerCase() === search.toLowerCase() ? 1 : 0;
      return bExact - aExact || new Date(b.created_at) - new Date(a.created_at);
    },
  };
  results = [...results].sort(sorters[effectiveSort] ?? sorters.newest);

  const totalItems = results.length;
  const page = results.slice(offset, offset + limit);

  return { page, totalItems };
}

module.exports = { filterMockProducts };
