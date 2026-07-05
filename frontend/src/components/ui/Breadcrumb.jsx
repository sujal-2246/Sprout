import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

/**
 * `items` is an array of { label, to }. The last item renders as plain
 * text (current page), not a link.
 */
export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center flex-wrap gap-1.5 text-sm">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={`${item.label}-${i}`} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-ink-faint" />}
            {isLast || !item.to ? (
              <span className="text-ink-muted" aria-current={isLast ? 'page' : undefined}>
                {item.label}
              </span>
            ) : (
              <Link to={item.to} className="text-ink-muted hover:text-sprout transition-colors">
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
