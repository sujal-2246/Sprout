/**
 * Formats a price string/number (already in whole currency units, e.g.
 * "149.00" as returned by the API's serializeProduct) as localized
 * currency. Kept separate from the API's cents-to-decimal conversion —
 * this only handles presentation.
 */
export function formatCurrency(amount, currency = 'USD', locale = 'en-US') {
  const value = typeof amount === 'string' ? Number.parseFloat(amount) : amount;
  if (!Number.isFinite(value)) return '—';
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
}

/**
 * Rounds a discount percentage from an original and current price.
 * Returns null when there's nothing to show (no compareAtPrice, or it's
 * not actually higher than the current price).
 */
export function discountPercent(price, compareAtPrice) {
  const current = Number.parseFloat(price);
  const original = Number.parseFloat(compareAtPrice);
  if (!Number.isFinite(current) || !Number.isFinite(original) || original <= current) return null;
  return Math.round(((original - current) / original) * 100);
}
