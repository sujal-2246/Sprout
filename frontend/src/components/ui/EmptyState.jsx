import { Sprout } from 'lucide-react';
import Button from './Button';

export default function EmptyState({
  title = 'Nothing here yet',
  description,
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-base-border bg-base-surface py-20 text-center px-6">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sprout/10">
        <Sprout className="h-7 w-7 text-sprout" strokeWidth={1.5} />
      </div>
      <p className="font-display text-base font-medium text-ink">{title}</p>
      {description && <p className="max-w-sm text-sm text-ink-muted">{description}</p>}
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction} className="mt-2">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
