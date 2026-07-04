-- ============================================================================
-- SPROUT — EXAMPLE LOOKUP QUERY
-- ============================================================================
-- "Fetch products that belong to a specific category, match at least one
--  selected tag, fall within a price range, and calculate total available
--  stock across all variants."
--
-- Parameters (bind them with your driver of choice — this uses named
-- placeholders for readability; node-postgres uses $1, $2... positionally):
--   :category_slug   -> e.g. 'keyboards'
--   :tag_slugs[]     -> e.g. ARRAY['wireless', 'mechanical']
--   :min_price_cents -> e.g. 5000
--   :max_price_cents -> e.g. 20000
-- ============================================================================

SELECT
    p.id,
    p.title,
    p.description,
    p.base_price,
    v.name AS vendor_name,
    -- Roll up stock across every variant belonging to this product. COALESCE
    -- guards against products that have zero variants (base-only listings).
    COALESCE(SUM(pv.stock_quantity), 0) AS total_stock,
    -- Surface the matched tags for this product so the frontend can render
    -- "why this matched" chips without a second round trip.
    ARRAY_AGG(DISTINCT t.slug) FILTER (WHERE t.slug IS NOT NULL) AS matched_tags
FROM products p
JOIN vendors v
    ON v.id = p.vendor_id
JOIN product_categories pc
    ON pc.product_id = p.id
JOIN categories c
    ON c.id = pc.category_id
   AND c.slug = :category_slug
JOIN product_tags pt
    ON pt.product_id = p.id
JOIN tags t
    ON t.id = pt.tag_id
   AND t.slug = ANY(:tag_slugs)          -- "match at least one selected tag"
LEFT JOIN product_variants pv
    ON pv.product_id = p.id
WHERE p.is_active = true
  AND p.base_price BETWEEN :min_price_cents AND :max_price_cents
GROUP BY p.id, v.name
ORDER BY p.created_at DESC
LIMIT :limit OFFSET :offset;

-- ----------------------------------------------------------------------------
-- Notes on why it's built this way:
--
-- 1. Category is an INNER JOIN filtered in the ON clause (not WHERE) — this
--    reads slightly cleaner when combined with the tag join below and makes
--    it obvious both are "match conditions," not post-filters.
--
-- 2. Tags use `t.slug = ANY(:tag_slugs)` which is an OR-style "at least one"
--    match. If you instead need "must match ALL selected tags," swap this
--    join for a HAVING COUNT(DISTINCT t.slug) = array_length(:tag_slugs, 1)
--    clause so every requested tag has to appear at least once per product.
--
-- 3. Stock rollup uses a LEFT JOIN (not INNER) so a product with zero
--    variants still returns a row with total_stock = 0 instead of vanishing
--    from results entirely.
--
-- 4. GROUP BY p.id is sufficient in Postgres once p.id is the primary key
--    (functional dependency lets you select other p.* columns without
--    listing them all in GROUP BY) — v.name is included explicitly since it
--    comes from a joined table.
-- ============================================================================
