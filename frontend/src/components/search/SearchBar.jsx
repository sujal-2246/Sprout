import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useDebouncedCallback } from '../../hooks/useDebouncedCallback';

/**
 * Local `draftValue` state exists ONLY so the input feels instant while
 * typing. The URL (source of truth) only updates 300ms after the user
 * stops typing, via the debounced callback below — this is what prevents
 * every keystroke from spamming browser history.
 */
export default function SearchBar({ value, onChange }) {
  const [draftValue, setDraftValue] = useState(value);
  const debouncedOnChange = useDebouncedCallback(onChange, 300);

  // Keep the input in sync if the URL changes from elsewhere (back button,
  // "Clear all filters", etc.) without fighting the user's own typing.
  useEffect(() => {
    setDraftValue(value);
  }, [value]);

  const handleChange = (e) => {
    const next = e.target.value;
    setDraftValue(next);
    debouncedOnChange(next);
  };

  const handleClear = () => {
    setDraftValue('');
    onChange(''); // immediate, no need to debounce a clear action
  };

  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
      <input
        type="text"
        value={draftValue}
        onChange={handleChange}
        placeholder="Search products…"
        aria-label="Search products"
        className="w-full rounded-lg border border-base-border bg-base-surface py-2.5 pl-9 pr-9
                   text-sm text-ink placeholder:text-ink-faint
                   focus:border-sprout/50 focus:outline-none focus:ring-2 focus:ring-sprout/40
                   transition-colors"
      />
      {draftValue && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-ink-faint
                     hover:bg-base-raised hover:text-ink transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
