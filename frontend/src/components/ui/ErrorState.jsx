import { AlertTriangle } from 'lucide-react';
import Button from './Button';

export default function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this. Please try again.",
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-base-border bg-base-surface py-20 text-center px-6">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-danger/10">
        <AlertTriangle className="h-7 w-7 text-danger" strokeWidth={1.5} />
      </div>
      <p className="font-display text-base font-medium text-ink">{title}</p>
      <p className="max-w-sm text-sm text-ink-muted">{description}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry} className="mt-2">
          Try again
        </Button>
      )}
    </div>
  );
}
