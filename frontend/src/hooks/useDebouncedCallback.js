import { useEffect, useRef, useCallback } from 'react';

/**
 * Returns a debounced version of `callback` that waits `delay`ms of
 * silence before firing. Used on the search input so every keystroke
 * doesn't push a new browser history entry / URL update — only the
 * settled value does.
 */
export function useDebouncedCallback(callback, delay = 300) {
  const timeoutRef = useRef(null);
  const callbackRef = useRef(callback);

  // Keep the latest callback without re-creating the debounced function
  // itself (avoids resetting an in-flight timer on every parent render).
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return useCallback(
    (...args) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => callbackRef.current(...args), delay);
    },
    [delay]
  );
}
