// ============================================================================
// MOCK DATA — featured vendors
// ============================================================================
// Stands in for GET /api/vendors?featured=true (see docs/PHASE1.md §8/§12 —
// vendors table needs bio/logo_url/is_featured columns before this can be
// real).
// ============================================================================

export const FEATURED_VENDORS = [
  {
    id: 1,
    name: 'Keystroke Labs',
    slug: 'keystroke-labs',
    tagline: 'Small-batch mechanical keyboards, hand-tuned',
    rating: 4.9,
    productCount: 18,
  },
  {
    id: 2,
    name: 'Fieldcraft Goods',
    slug: 'fieldcraft-goods',
    tagline: 'Boots and trail gear built to outlast the trip',
    rating: 4.8,
    productCount: 24,
  },
  {
    id: 3,
    name: 'Northbend Audio',
    slug: 'northbend-audio',
    tagline: 'Studio-grade headphones for critical listening',
    rating: 4.7,
    productCount: 12,
  },
];
