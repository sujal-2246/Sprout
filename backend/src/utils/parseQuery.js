const ALLOWED_SORTS = new Set(['newest', 'price_asc', 'price_desc', 'relevance']);
const MAX_LIMIT = 100;
const DEFAULT_LIMIT = 20;

/**
 * Coerces a raw query value into a positive integer, falling back to a
 * default when missing, non-numeric, or out of bounds. Never throws —
 * bad input just gets clamped to something safe.
 */
function toPositiveInt(value, { fallback, min = 1, max = Number.MAX_SAFE_INTEGER }) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || Number.isNaN(parsed)) return fallback;
  return Math.min(Math.max(parsed, min), max);
}

/**
 * Parses a comma-separated string param ("wireless,mechanical") into a
 * clean array of non-empty, trimmed, lowercased tokens. Returns [] for
 * missing/blank input rather than [''] (a common comma-split footgun).
 */
function parseCsvParam(value) {
  if (typeof value !== 'string' || value.trim() === '') return [];
  return value
    .split(',')
    .map((token) => token.trim().toLowerCase())
    .filter(Boolean);
}

/**
 * Parses a price param (expected in whole currency units, e.g. "50" for
 * $50) into integer cents. Returns null when absent or invalid so callers
 * can distinguish "no filter" from "filter at 0".
 */
function parsePriceToCents(value) {
  if (value === undefined || value === null || value === '') return null;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) return null;
  return Math.round(parsed * 100);
}

/**
 * Validates and normalizes the full set of /api/products query params in
 * one pass. Returns { filters, errors } — errors is an array of
 * human-readable strings; the caller decides whether to 400 or proceed
 * with defaults depending on severity.
 */
function parseProductQuery(query) {
  const errors = [];

  const category = typeof query.category === 'string' && query.category.trim() !== ''
    ? query.category.trim().toLowerCase()
    : null;

  const tags = parseCsvParam(query.tags);

  const minPriceCents = parsePriceToCents(query.minPrice);
  const maxPriceCents = parsePriceToCents(query.maxPrice);

  if (minPriceCents !== null && maxPriceCents !== null && minPriceCents > maxPriceCents) {
    errors.push('minPrice cannot be greater than maxPrice');
  }

  const search = typeof query.search === 'string' ? query.search.trim().slice(0, 200) : '';

  const sortBy = ALLOWED_SORTS.has(query.sortBy) ? query.sortBy : 'newest';

  // page: must be a positive integer >= 1. Anything else (0, negative,
  // "abc", missing) silently falls back to 1 rather than erroring — a
  // malformed page param shouldn't break the whole request.
  const page = toPositiveInt(query.page, { fallback: 1, min: 1 });

  // limit: clamp to a sane ceiling so a client can't request ?limit=100000
  // and force a huge table scan / payload.
  const limit = toPositiveInt(query.limit, { fallback: DEFAULT_LIMIT, min: 1, max: MAX_LIMIT });

  const offset = (page - 1) * limit;

  return {
    filters: { category, tags, minPriceCents, maxPriceCents, search, sortBy, page, limit, offset },
    errors,
  };
}

module.exports = { parseProductQuery, parseCsvParam, toPositiveInt, parsePriceToCents, DEFAULT_LIMIT, MAX_LIMIT };
