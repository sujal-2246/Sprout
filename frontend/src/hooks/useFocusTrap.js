import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Traps Tab/Shift+Tab focus inside `containerRef` while `active` is true.
 * On activation, focus moves into the container (first focusable element,
 * or the container itself as a fallback); on deactivation, focus returns
 * to whatever element had it beforehand (usually the button that opened
 * the modal/drawer) — used by QuickViewModal and MobileMenu.
 */
export function useFocusTrap(containerRef, active) {
  const previouslyFocused = useRef(null);

  useEffect(() => {
    if (!active) return undefined;

    previouslyFocused.current = document.activeElement;

    const container = containerRef.current;
    const focusables = container ? Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)) : [];
    (focusables[0] ?? container)?.focus();

    function handleKeyDown(e) {
      if (e.key !== 'Tab' || !container) return;
      const nodes = Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR));
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused.current?.focus?.();
    };
  }, [active, containerRef]);
}
