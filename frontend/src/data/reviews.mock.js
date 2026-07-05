// ============================================================================
// MOCK DATA — product reviews
// ============================================================================
// Stands in for GET /api/products/:id/reviews (needs the product_reviews
// table from docs/PHASE1.md §12). Generates a small, deterministic review
// set per product id so the detail page has something real to render
// without a backend round trip.
// ============================================================================

const SAMPLE_REVIEWS = [
  { author: 'Priya N.', rating: 5, body: 'Exactly as described and shipped fast. Build quality is excellent — no complaints after two months of daily use.' },
  { author: 'Marcus T.', rating: 4, body: 'Really solid product. Docked one star only because the packaging arrived a little beat up.' },
  { author: 'Elena R.', rating: 5, body: "Best purchase I've made from a marketplace vendor this year. Will be back for more." },
  { author: 'Sam K.', rating: 3, body: 'Good, not great. Does what it says, but nothing about it feels premium for the price.' },
];

export function getReviewsForProduct(productId) {
  // Deterministic subset/rotation based on id so different products show
  // slightly different review sets instead of all showing identical data.
  const rotation = productId % SAMPLE_REVIEWS.length;
  const rotated = [...SAMPLE_REVIEWS.slice(rotation), ...SAMPLE_REVIEWS.slice(0, rotation)];
  const count = 3 + (productId % 2);
  const reviews = rotated.slice(0, count);

  const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return { reviews, average: Number(average.toFixed(1)), total: reviews.length };
}
