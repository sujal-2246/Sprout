import { Keyboard, Footprints, Headphones } from 'lucide-react';

// Mirrors database/seed.sql exactly — if you add a category/tag there,
// mirror it here so filters and the home page category tiles stay in sync
// with what the API can actually return.
export const CATEGORIES = [
  {
    slug: 'keyboards',
    label: 'Keyboards',
    icon: Keyboard,
    description: 'Mechanical, wireless, and everything in between',
  },
  {
    slug: 'footwear',
    label: 'Footwear',
    icon: Footprints,
    description: 'Trail-ready boots and everyday runners',
  },
  {
    slug: 'audio',
    label: 'Audio',
    icon: Headphones,
    description: 'Headphones tuned for critical listening',
  },
];

export const TAGS = [
  { slug: 'wireless', label: 'Wireless' },
  { slug: 'mechanical', label: 'Mechanical' },
  { slug: 'water-resistant', label: 'Water Resistant' },
  { slug: 'noise-cancelling', label: 'Noise Cancelling' },
  { slug: 'limited-edition', label: 'Limited Edition' },
];
