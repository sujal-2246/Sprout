-- ============================================================================
-- SPROUT MARKETPLACE — POSTGRESQL SCHEMA
-- ============================================================================
-- Design notes:
--   - Products are "base" records. Anything that varies by SKU (size, color,
--     switch type) lives in product_variants, so a single product can carry
--     N purchasable configurations without denormalizing the product table.
--   - Categories and tags are both many-to-many with products via junction
--     tables. Categories model "where it lives in the catalog" (usually one,
--     sometimes a couple); tags model "loose attributes" used for filtering
--     (wireless, mechanical, RGB, etc.) and there can be many per product.
--   - Money is stored in integer cents (BIGINT) to avoid floating point
--     rounding issues. Convert to decimal only at the presentation layer.
-- ============================================================================

BEGIN;

-- ----------------------------------------------------------------------------
-- Extensions
-- ----------------------------------------------------------------------------
-- Needed for gen_random_uuid() if you choose UUID primary keys instead of
-- serial ints. Left enabled since it's cheap and commonly useful.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ----------------------------------------------------------------------------
-- vendors
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS vendors (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(160) NOT NULL,
    slug        VARCHAR(180) NOT NULL UNIQUE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ----------------------------------------------------------------------------
-- categories
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS categories (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(120) NOT NULL,
    slug        VARCHAR(140) NOT NULL UNIQUE
);

-- ----------------------------------------------------------------------------
-- tags
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS tags (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(80) NOT NULL,
    slug        VARCHAR(100) NOT NULL UNIQUE
);

-- ----------------------------------------------------------------------------
-- products (base record — price here is the "starting at" / default price)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
    id            BIGSERIAL PRIMARY KEY,
    title         VARCHAR(200) NOT NULL,
    description   TEXT,
    base_price    BIGINT NOT NULL CHECK (base_price >= 0), -- cents
    vendor_id     BIGINT NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
    is_active     BOOLEAN NOT NULL DEFAULT true,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ----------------------------------------------------------------------------
-- product_variants (specific purchasable SKUs — size/color/switch, etc.)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS product_variants (
    id              BIGSERIAL PRIMARY KEY,
    product_id      BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    variant_name    VARCHAR(160) NOT NULL,       -- e.g. "Size 10 / Midnight Black"
    sku             VARCHAR(80) UNIQUE,
    price_override  BIGINT,                      -- cents; NULL = use products.base_price
    stock_quantity  INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ----------------------------------------------------------------------------
-- Junction: product_categories (many-to-many)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS product_categories (
    product_id   BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    category_id  INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, category_id)
);

-- ----------------------------------------------------------------------------
-- Junction: product_tags (many-to-many)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS product_tags (
    product_id  BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    tag_id      INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, tag_id)
);

-- ============================================================================
-- INDEXES
-- ============================================================================
-- These target exactly the filters the frontend exposes: category, tags,
-- price range, text search, and sort/pagination. Composite + partial indexes
-- are chosen to match the WHERE clauses the query builder actually emits.

-- Price range filtering (?minPrice / ?maxPrice) — base_price is queried on
-- almost every request that doesn't specify a variant, so a plain btree
-- index is enough for range scans.
CREATE INDEX IF NOT EXISTS idx_products_base_price ON products (base_price);

-- Only active products are ever returned to shoppers — a partial index
-- keeps this narrow and fast instead of indexing soft-deleted/inactive rows.
CREATE INDEX IF NOT EXISTS idx_products_active ON products (id) WHERE is_active = true;

-- Sorting by recency ("Newest") is a common sortBy option.
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products (created_at DESC);

-- Vendor lookups (e.g. "shop by vendor" pages).
CREATE INDEX IF NOT EXISTS idx_products_vendor_id ON products (vendor_id);

-- Junction table lookups — Postgres does NOT automatically index the second
-- column of a composite PK for reverse lookups, so we add the inverse index
-- explicitly. This is what makes "products WHERE category = X" and
-- "products WHERE tag IN (...)" fast in both directions.
CREATE INDEX IF NOT EXISTS idx_product_categories_category_id ON product_categories (category_id);
CREATE INDEX IF NOT EXISTS idx_product_categories_product_id ON product_categories (product_id);
CREATE INDEX IF NOT EXISTS idx_product_tags_tag_id ON product_tags (tag_id);
CREATE INDEX IF NOT EXISTS idx_product_tags_product_id ON product_tags (product_id);

-- Variant stock rollups (SUM(stock_quantity) per product) benefit from an
-- index on the FK used to GROUP BY.
CREATE INDEX IF NOT EXISTS idx_product_variants_product_id ON product_variants (product_id);

-- Slug lookups for categories/tags (used when resolving ?category=keyboards
-- and ?tags=wireless,mechanical into ids before hitting the products table).
CREATE UNIQUE INDEX IF NOT EXISTS idx_categories_slug ON categories (slug);
CREATE UNIQUE INDEX IF NOT EXISTS idx_tags_slug ON tags (slug);

-- Full-text search index for ?search= — trigram index supports fast
-- ILIKE '%term%' matches, which a plain btree cannot do efficiently.
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX IF NOT EXISTS idx_products_title_trgm ON products USING gin (title gin_trgm_ops);

COMMIT;

-- ============================================================================
-- updated_at trigger (keeps products.updated_at accurate on writes)
-- ============================================================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_products_updated_at ON products;
CREATE TRIGGER trg_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
