// Mirrors the shape returned by the real Postgres query in
// database/example-queries.sql — same field names, same units (prices in
// cents) — so swapping USE_MOCK_DB off doesn't require touching any
// frontend or serialization code.

const mockProducts = [
  {
    id: 1,
    title: 'Aria 75 Mechanical Keyboard',
    description: 'A compact 75% board with hot-swappable switches.',
    base_price: 14900,
    vendor_name: 'Keystroke Labs',
    category_slugs: ['keyboards'],
    tag_slugs: ['wireless', 'mechanical'],
    total_stock: 59,
    created_at: '2026-05-01T10:00:00.000Z',
  },
  {
    id: 2,
    title: 'Trailhead Waterproof Boot',
    description: 'All-weather boot built for long-distance trail use.',
    base_price: 18900,
    vendor_name: 'Fieldcraft Goods',
    category_slugs: ['footwear'],
    tag_slugs: ['water-resistant', 'limited-edition'],
    total_stock: 21,
    created_at: '2026-05-03T10:00:00.000Z',
  },
  {
    id: 3,
    title: 'Halcyon ANC Headphones',
    description: 'Over-ear wireless headphones with adaptive noise cancelling.',
    base_price: 22900,
    vendor_name: 'Northbend Audio',
    category_slugs: ['audio'],
    tag_slugs: ['wireless', 'noise-cancelling'],
    total_stock: 30,
    created_at: '2026-05-05T10:00:00.000Z',
  },
  {
    id: 4,
    title: 'Ridgeline Wireless Mechanical Keyboard',
    description: 'Full-size wireless board with a brass weighted plate.',
    base_price: 21900,
    vendor_name: 'Keystroke Labs',
    category_slugs: ['keyboards'],
    tag_slugs: ['wireless', 'mechanical', 'limited-edition'],
    total_stock: 14,
    created_at: '2026-05-08T10:00:00.000Z',
  },
  {
    id: 5,
    title: 'Fernweg Trail Runner',
    description: 'Lightweight breathable trainer for mixed terrain.',
    base_price: 12900,
    vendor_name: 'Fieldcraft Goods',
    category_slugs: ['footwear'],
    tag_slugs: ['water-resistant'],
    total_stock: 48,
    created_at: '2026-05-10T10:00:00.000Z',
  },
  {
    id: 6,
    title: 'Basin Open-Back Headphones',
    description: 'Studio-tuned open-back cans for critical listening.',
    base_price: 27900,
    vendor_name: 'Northbend Audio',
    category_slugs: ['audio'],
    tag_slugs: ['limited-edition'],
    total_stock: 6,
    created_at: '2026-05-12T10:00:00.000Z',
  },
];

module.exports = { mockProducts };
