# Sprout — Multi-Vendor Marketplace

Three independent layers, meant to be built and verified in this order:

```
sprout/
├── database/     PostgreSQL schema, seed data, example query
├── backend/      Express REST API (GET /api/products)
└── frontend/     React + Tailwind client (Vite)
```

## 1. Database

```bash
psql -U postgres -c "CREATE DATABASE sprout"
psql -U postgres -d sprout -f database/schema.sql
psql -U postgres -d sprout -f database/seed.sql
```

`database/example-queries.sql` shows the category + tag + price-range +
stock-rollup lookup referenced in the brief, with notes on why it's built
that way.

## 2. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev          # http://localhost:4000
```

**`USE_MOCK_DB=true`** (the default in `.env.example`) serves a hardcoded
in-memory dataset (`src/data/mockProducts.js`) that mirrors the seed data
exactly — same fields, same filter semantics — so you can build and test
the API, and then the frontend, before Postgres is wired up at all. Flip it
to `false` once your database is running and the same route switches to
real `pg` queries with zero changes elsewhere.

Try it:
```bash
curl "http://localhost:4000/api/products?category=keyboards&tags=wireless,mechanical&minPrice=50&page=1&limit=10"
```

## 3. Frontend

```bash
cd frontend
npm install
npm run dev           # http://localhost:5173
```

Vite's dev server proxies `/api/*` to `http://localhost:4000` (see
`vite.config.js`), so the frontend can call relative paths in both dev and
prod without a CORS workaround.

## How the pieces connect

- **URL is the source of truth.** `useProductFilters` reads every filter
  (category, tags, price, search, sort, page) out of `URLSearchParams` and
  exposes setters that write back to it — components never hold their own
  copy of "is this checked."
- **Any filter change resets `page` to 1** automatically inside the hook's
  `applyUpdate`, except `setPage` itself.
- **Search is debounced 300ms** in `SearchBar` before it ever touches the
  URL, so typing "mechanical keyboard" produces one history entry, not
  eighteen.
- **Skeletons match card dimensions exactly** so the grid doesn't jump when
  real data arrives.
- **The query builder never string-interpolates values** — every filter is
  bound as a `$1, $2...` parameter, so it's immune to SQL injection
  regardless of what's in the query string.

## Design notes

Dark, high-contrast, glassmorphism header per the brief. Two additions
specific to this project rather than generic dark-mode defaults:

- **Sprout green** (`#6CDB8C`) as the single accent, paired with a muted
  **soil brown** (`#B08968`) used sparingly for "Limited Edition" badges —
  so the palette has a grounding note instead of leaning on one neon color.
- **Stock levels render as a small growth bar** on each card instead of
  just a number — a short green fill for "plenty left," empty and grey for
  out of stock. Skeleton loaders use a slow opacity "breathe" instead of a
  shimmer sweep, in the same spirit.
