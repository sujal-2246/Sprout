import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  // Compact page-number window: current page, one neighbor each side, and
  // the first/last page — with ellipses filling the gaps. Keeps the control
  // from overflowing on decks with dozens of pages.
  const pageNumbers = new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);
  const sorted = [...pageNumbers].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);

  return (
    <nav className="mt-8 flex items-center justify-center gap-1" aria-label="Pagination">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Previous page"
        className="rounded-lg border border-base-border p-2 text-ink-muted transition-colors
                   hover:border-sprout/40 hover:text-ink disabled:pointer-events-none disabled:opacity-30"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {sorted.map((page, i) => {
        const prev = sorted[i - 1];
        const showEllipsis = prev !== undefined && page - prev > 1;
        return (
          <span key={page} className="flex items-center gap-1">
            {showEllipsis && <span className="px-1 text-ink-faint">…</span>}
            <button
              type="button"
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? 'page' : undefined}
              className={`h-8 min-w-[2rem] rounded-lg font-mono text-xs transition-colors
                ${page === currentPage
                  ? 'bg-sprout text-base font-semibold'
                  : 'border border-base-border text-ink-muted hover:border-sprout/40 hover:text-ink'}`}
            >
              {page}
            </button>
          </span>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Next page"
        className="rounded-lg border border-base-border p-2 text-ink-muted transition-colors
                   hover:border-sprout/40 hover:text-ink disabled:pointer-events-none disabled:opacity-30"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
