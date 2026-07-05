import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const VARIANTS = {
  primary: 'bg-sprout text-base font-semibold hover:bg-sprout-bright active:scale-[0.98]',
  secondary:
    'border border-base-border bg-base-surface text-ink hover:border-sprout/50 hover:text-sprout',
  ghost: 'text-ink-muted hover:bg-base-raised hover:text-ink',
  danger: 'bg-danger/10 text-danger hover:bg-danger/20',
};

const SIZES = {
  sm: 'h-8 px-3 text-xs gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2',
};

/**
 * The one button implementation the app uses — every screen composes this
 * rather than styling `<button>` inline, so a future rebrand or a11y fix
 * happens in one file.
 */
const Button = forwardRef(function Button(
  { variant = 'primary', size = 'md', className, as: Component = 'button', ...props },
  ref
) {
  return (
    <Component
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-body transition-all duration-200',
        'disabled:pointer-events-none disabled:opacity-40',
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...props}
    />
  );
});

export default Button;
