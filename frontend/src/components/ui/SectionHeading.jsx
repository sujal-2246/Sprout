import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function SectionHeading({ eyebrow, title, description, viewAllTo }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="mb-1.5 font-mono text-xs uppercase tracking-wider text-sprout">{eyebrow}</p>
        )}
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{title}</h2>
        {description && <p className="mt-1.5 max-w-xl text-sm text-ink-muted">{description}</p>}
      </div>

      {viewAllTo && (
        <Link
          to={viewAllTo}
          className="hidden shrink-0 items-center gap-1 text-sm text-ink-muted hover:text-sprout transition-colors sm:flex"
        >
          View all <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}
