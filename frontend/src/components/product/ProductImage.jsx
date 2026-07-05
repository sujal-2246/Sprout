import { Sprout } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { cn } from '../../utils/cn';

// products.image / product_images don't exist yet (see docs/PHASE1.md §12),
// so every card/gallery/quick-view renders a generated placeholder instead
// of a broken <img> tag. It's deterministic per product + seed so the same
// product always renders the same "photo," and gallery thumbnails for one
// product still look like related angles rather than random noise.
function hash(input) {
  let h = 0;
  for (let i = 0; i < input.length; i += 1) {
    h = (h * 31 + input.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

const TONE_CLASSES = {
  sprout: 'from-sprout/25 via-sprout/5 to-base-raised text-sprout',
  soil: 'from-soil/25 via-soil/5 to-base-raised text-soil',
  neutral: 'from-ink/10 via-ink/0 to-base-raised text-ink-muted',
};

// Category -> accent tone, so a Keyboards card and a Keyboards gallery
// thumbnail always share the same visual language.
const CATEGORY_TONE = { keyboards: 'sprout', footwear: 'soil', audio: 'neutral' };

export default function ProductImage({ product, seed = 0, className, iconClassName }) {
  const categorySlug = product?.categories?.[0];
  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  const Icon = category?.icon ?? Sprout;
  const tone = TONE_CLASSES[CATEGORY_TONE[categorySlug] ?? 'neutral'];

  const angle = hash(`${product?.id ?? 'x'}-${seed}`) % 360;

  return (
    <div
      className={cn('relative flex items-center justify-center overflow-hidden bg-gradient-to-br', tone, className)}
      style={{ backgroundImage: `linear-gradient(${angle}deg, var(--tw-gradient-stops))` }}
      aria-hidden="true"
    >
      <Icon className={cn('h-10 w-10 opacity-80', iconClassName)} strokeWidth={1.1} />
    </div>
  );
}
