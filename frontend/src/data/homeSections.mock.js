// ============================================================================
// MOCK DATA — home page product rails
// ============================================================================
// The real /api/products endpoint doesn't yet support "trending" or
// "best selling" ranking, and doesn't return rating/compareAtPrice/image
// fields (see database/schema.sql — those columns don't exist yet either).
// This file stands in until Phase 2 ships:
//   - GET /api/products?sortBy=trending / best_selling
//   - products.compare_at_price, product_images, product_reviews (see
//     docs/PHASE1.md §12 for the migration)
//
// Shape intentionally matches what serializeProduct() in
// backend/src/routes/products.js already returns, PLUS the additional
// fields the redesigned ProductCard knows how to render when present
// (rating, compareAtPrice, image). ProductCard treats all of those as
// optional so real API data (which lacks them today) still renders fine.
// ============================================================================

function product(overrides) {
  return {
    stock: 24,
    categories: [],
    tags: [],
    rating: 4.5,
    reviewCount: 12,
    image: null,
    compareAtPrice: null,
    ...overrides,
  };
}

export const FEATURED_PRODUCTS = [
  product({
    id: 101,
    title: 'Aria 75 Mechanical Keyboard',
    vendor: 'Keystroke Labs',
    price: '149.00',
    compareAtPrice: '179.00',
    categories: ['keyboards'],
    tags: ['wireless', 'mechanical'],
    rating: 4.8,
    reviewCount: 214,
    stock: 42,
  }),
  product({
    id: 102,
    title: 'Halcyon ANC Headphones',
    vendor: 'Northbend Audio',
    price: '229.00',
    categories: ['audio'],
    tags: ['wireless', 'noise-cancelling'],
    rating: 4.6,
    reviewCount: 98,
    stock: 30,
  }),
  product({
    id: 103,
    title: 'Trailhead Waterproof Boot',
    vendor: 'Fieldcraft Goods',
    price: '189.00',
    compareAtPrice: '219.00',
    categories: ['footwear'],
    tags: ['water-resistant', 'limited-edition'],
    rating: 4.7,
    reviewCount: 61,
    stock: 8,
  }),
  product({
    id: 104,
    title: 'Ridgeline Wireless Mechanical Keyboard',
    vendor: 'Keystroke Labs',
    price: '219.00',
    categories: ['keyboards'],
    tags: ['wireless', 'mechanical', 'limited-edition'],
    rating: 4.9,
    reviewCount: 47,
    stock: 14,
  }),
];

export const TRENDING_PRODUCTS = [
  product({
    id: 105,
    title: 'Fernweg Trail Runner',
    vendor: 'Fieldcraft Goods',
    price: '129.00',
    categories: ['footwear'],
    tags: ['water-resistant'],
    rating: 4.4,
    reviewCount: 152,
    stock: 48,
  }),
  product({
    id: 106,
    title: 'Basin Open-Back Headphones',
    vendor: 'Northbend Audio',
    price: '279.00',
    categories: ['audio'],
    tags: ['limited-edition'],
    rating: 4.9,
    reviewCount: 33,
    stock: 6,
  }),
  product({
    id: 101,
    title: 'Aria 75 Mechanical Keyboard',
    vendor: 'Keystroke Labs',
    price: '149.00',
    compareAtPrice: '179.00',
    categories: ['keyboards'],
    tags: ['wireless', 'mechanical'],
    rating: 4.8,
    reviewCount: 214,
    stock: 42,
  }),
  product({
    id: 107,
    title: 'Wayfinder Bluetooth Earbuds',
    vendor: 'Northbend Audio',
    price: '99.00',
    compareAtPrice: '129.00',
    categories: ['audio'],
    tags: ['wireless'],
    rating: 4.3,
    reviewCount: 401,
    stock: 0,
  }),
];

export const NEW_ARRIVALS = [
  product({
    id: 108,
    title: 'Meridian Low-Profile Keyboard',
    vendor: 'Keystroke Labs',
    price: '159.00',
    categories: ['keyboards'],
    tags: ['wireless', 'mechanical'],
    rating: 4.5,
    reviewCount: 9,
    stock: 22,
  }),
  product({
    id: 109,
    title: 'Coldsnap Insulated Boot',
    vendor: 'Fieldcraft Goods',
    price: '199.00',
    categories: ['footwear'],
    tags: ['water-resistant'],
    rating: 4.6,
    reviewCount: 4,
    stock: 17,
  }),
  product({
    id: 110,
    title: 'Driftline Sleep Headphones',
    vendor: 'Northbend Audio',
    price: '89.00',
    categories: ['audio'],
    tags: ['wireless'],
    rating: 4.2,
    reviewCount: 2,
    stock: 35,
  }),
  product({
    id: 103,
    title: 'Trailhead Waterproof Boot',
    vendor: 'Fieldcraft Goods',
    price: '189.00',
    compareAtPrice: '219.00',
    categories: ['footwear'],
    tags: ['water-resistant', 'limited-edition'],
    rating: 4.7,
    reviewCount: 61,
    stock: 8,
  }),
];

export const BEST_SELLERS = [
  product({
    id: 107,
    title: 'Wayfinder Bluetooth Earbuds',
    vendor: 'Northbend Audio',
    price: '99.00',
    compareAtPrice: '129.00',
    categories: ['audio'],
    tags: ['wireless'],
    rating: 4.3,
    reviewCount: 401,
    stock: 0,
  }),
  product({
    id: 105,
    title: 'Fernweg Trail Runner',
    vendor: 'Fieldcraft Goods',
    price: '129.00',
    categories: ['footwear'],
    tags: ['water-resistant'],
    rating: 4.4,
    reviewCount: 152,
    stock: 48,
  }),
  product({
    id: 101,
    title: 'Aria 75 Mechanical Keyboard',
    vendor: 'Keystroke Labs',
    price: '149.00',
    compareAtPrice: '179.00',
    categories: ['keyboards'],
    tags: ['wireless', 'mechanical'],
    rating: 4.8,
    reviewCount: 214,
    stock: 42,
  }),
  product({
    id: 102,
    title: 'Halcyon ANC Headphones',
    vendor: 'Northbend Audio',
    price: '229.00',
    categories: ['audio'],
    tags: ['wireless', 'noise-cancelling'],
    rating: 4.6,
    reviewCount: 98,
    stock: 30,
  }),
];
