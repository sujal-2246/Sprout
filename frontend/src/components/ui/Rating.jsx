import { Star } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * Read-only star rating. Renders a filled/half/empty star for each
 * position based on `value` (0-5, fractional allowed) — half stars use a
 * clipped overlay rather than a separate icon set.
 */
export default function Rating({ value = 0, count, size = 'sm', className }) {
  const starSize = size === 'lg' ? 'h-5 w-5' : size === 'md' ? 'h-4 w-4' : 'h-3.5 w-3.5';

  return (
    <div className={cn('flex items-center gap-1.5', className)} role="img" aria-label={`Rated ${value} out of 5`}>
      <div className="relative flex">
        {Array.from({ length: 5 }).map((_, i) => {
          const fillPercent = Math.max(0, Math.min(1, value - i)) * 100;
          return (
            <span key={i} className="relative">
              <Star className={cn(starSize, 'text-base-border')} fill="currentColor" strokeWidth={0} />
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fillPercent}%` }}>
                <Star className={cn(starSize, 'text-sprout')} fill="currentColor" strokeWidth={0} />
              </span>
            </span>
          );
        })}
      </div>
      {count !== undefined && <span className="text-xs text-ink-muted">({count})</span>}
    </div>
  );
}
