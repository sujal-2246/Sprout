import { cn } from '../../utils/cn';

const TONES = {
  sprout: 'bg-sprout text-base',
  soil: 'bg-soil text-base',
  danger: 'bg-danger/15 text-danger',
  neutral: 'bg-base-raised text-ink-muted border border-base-border',
};

export default function Badge({ tone = 'neutral', className, children }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
        TONES[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
