/**
 * Two native <input type="range"> elements stacked on top of each other.
 * Both are transparent/track-less (styled via the `.range-thumb` utility
 * in index.css, which sets pointer-events: none on the track and re-enables
 * it only on the thumb) so either handle stays draggable regardless of
 * which one currently has the higher z-index. The colored div behind them
 * is the visible filled track between the two current values.
 */
export default function PriceRangeSlider({ min, max, step = 5, valueMin, valueMax, onChange }) {
  const safeMin = valueMin === '' || valueMin === undefined ? min : Number(valueMin);
  const safeMax = valueMax === '' || valueMax === undefined ? max : Number(valueMax);

  const fillStart = ((safeMin - min) / (max - min)) * 100;
  const fillEnd = ((safeMax - min) / (max - min)) * 100;

  const handleMinChange = (e) => {
    const next = Math.min(Number(e.target.value), safeMax - step);
    onChange(next, safeMax);
  };

  const handleMaxChange = (e) => {
    const next = Math.max(Number(e.target.value), safeMin + step);
    onChange(safeMin, next);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between font-mono text-xs text-ink-muted">
        <span>${safeMin}</span>
        <span>${safeMax}{safeMax >= max ? '+' : ''}</span>
      </div>

      <div className="relative h-4">
        {/* Track background */}
        <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-base-border" />
        {/* Filled segment between the two handles */}
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-sprout"
          style={{ left: `${fillStart}%`, right: `${100 - fillEnd}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={safeMin}
          onChange={handleMinChange}
          aria-label="Minimum price"
          className="range-thumb absolute inset-0 h-4 w-full appearance-none bg-transparent"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={safeMax}
          onChange={handleMaxChange}
          aria-label="Maximum price"
          className="range-thumb absolute inset-0 h-4 w-full appearance-none bg-transparent"
        />
      </div>
    </div>
  );
}
