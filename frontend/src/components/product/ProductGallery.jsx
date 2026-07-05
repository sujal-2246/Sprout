import { useState } from 'react';
import ProductImage from './ProductImage';
import { cn } from '../../utils/cn';

const VIEW_COUNT = 4;

/**
 * Real product photography (product_images table) doesn't exist yet — see
 * docs/PHASE1.md §12 — so each "view" is the same deterministic placeholder
 * generator seeded differently, giving the gallery the right *shape*
 * (main image + thumbnail rail + zoom) to drop real photos into later
 * without touching this component's structure.
 */
export default function ProductGallery({ product }) {
  const [activeSeed, setActiveSeed] = useState(0);

  return (
    <div>
      <div className="group relative aspect-square w-full cursor-zoom-in overflow-hidden rounded-2xl border border-base-border">
        <ProductImage
          product={product}
          seed={activeSeed}
          className="h-full w-full transition-transform duration-300 group-hover:scale-[1.5]"
          iconClassName="h-20 w-20"
        />
      </div>

      <div className="mt-3 grid grid-cols-4 gap-3">
        {Array.from({ length: VIEW_COUNT }).map((_, seed) => (
          <button
            key={seed}
            type="button"
            onClick={() => setActiveSeed(seed)}
            aria-label={`View ${seed + 1}`}
            aria-current={activeSeed === seed}
            className={cn(
              'aspect-square overflow-hidden rounded-lg border-2 transition-colors',
              activeSeed === seed ? 'border-sprout' : 'border-base-border hover:border-sprout/40'
            )}
          >
            <ProductImage product={product} seed={seed} className="h-full w-full" iconClassName="h-6 w-6" />
          </button>
        ))}
      </div>
    </div>
  );
}
