import { useEffect, useRef, useState, cloneElement } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../utils/cn';

/**
 * `trigger` is a single element (usually an icon button) that receives an
 * onClick to toggle the panel. `children` renders inside the panel and
 * receives a `close` render-prop via function-as-children so panel content
 * can close itself (e.g. after selecting a menu item).
 */
export default function Dropdown({ trigger, children, align = 'right', panelClassName }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    function handleClick(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    }
    function handleKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div ref={rootRef} className="relative">
      {cloneElement(trigger, {
        onClick: () => setOpen((prev) => !prev),
        'aria-expanded': open,
        'aria-haspopup': 'true',
      })}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={cn(
              'absolute top-full z-50 mt-2 rounded-xl border border-base-border bg-base-surface shadow-soft-lg',
              align === 'right' ? 'right-0' : 'left-0',
              panelClassName
            )}
          >
            {typeof children === 'function' ? children({ close }) : children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
