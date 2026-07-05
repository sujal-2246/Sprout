import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Sprout } from "lucide-react";
import { CATEGORIES } from "../../data/categories";
import SearchBar from "../search/SearchBar";
import ThemeToggle from "../ui/ThemeToggle";
import { useFocusTrap } from "../../hooks/useFocusTrap";

export default function MobileMenu({ open, onClose, onSearch }) {
  const panelRef = useRef(null);
  useFocusTrap(panelRef, open);

  useEffect(() => {
    if (!open) return undefined;
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col bg-base outline-none lg:hidden"
        >
          <div className="flex items-center justify-between border-b border-base-border px-6 py-4">
            <Link to="/" onClick={onClose} className="flex items-center gap-2">
              <Sprout className="h-5 w-5 text-sprout" strokeWidth={1.75} />
              <span className="font-display text-base font-semibold text-ink">
                Sprout
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="rounded-lg p-2 text-ink-muted hover:bg-base-raised hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-thin px-6 py-6">
            <SearchBar value="" onChange={(value) => onSearch(value)} />

            <p className="mb-2 mt-8 font-display text-xs font-medium uppercase tracking-wider text-ink-muted">
              Categories
            </p>
            <nav className="flex flex-col">
              {CATEGORIES.map(({ slug, label, icon: Icon }) => (
                <Link
                  key={slug}
                  to={`/marketplace?category=${slug}`}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-lg px-2 py-3 text-sm text-ink hover:bg-base-raised"
                >
                  <Icon className="h-4 w-4 text-sprout" strokeWidth={1.5} />
                  {label}
                </Link>
              ))}
              <Link
                to="/marketplace"
                onClick={onClose}
                className="mt-2 rounded-lg px-2 py-3 text-sm font-medium text-sprout hover:bg-sprout/10"
              >
                View full marketplace →
              </Link>
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
