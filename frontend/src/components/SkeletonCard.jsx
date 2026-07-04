/**
 * Mirrors ProductCard's exact DOM structure/dimensions (image aspect ratio,
 * line heights, badge sizes) so swapping skeleton -> real card causes zero
 * layout shift. Uses a slow "breathe" opacity pulse (defined in
 * tailwind.config.js) instead of a shimmer sweep — quieter, and it reads
 * as "still growing" rather than a generic loading effect.
 */
export default function SkeletonCard() {
  return (
    <div className="rounded-xl border border-base-border bg-base-surface p-3" aria-hidden="true">
      <div className="aspect-square w-full animate-breathe rounded-lg bg-base-raised" />
      <div className="mt-3 space-y-2">
        <div className="h-3.5 w-3/4 animate-breathe rounded bg-base-raised" />
        <div className="h-3 w-1/2 animate-breathe rounded bg-base-raised" />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="h-4 w-16 animate-breathe rounded bg-base-raised" />
        <div className="h-4 w-10 animate-breathe rounded bg-base-raised" />
      </div>
    </div>
  );
}
