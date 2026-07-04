-- ============================================================================
-- SPROUT — SEED DATA
-- ============================================================================
-- Small, realistic dataset for local dev. Run after schema.sql.
-- Covers: multiple vendors, overlapping categories/tags, and variants with
-- different stock levels so pagination, filtering, and stock rollups all
-- have something meaningful to return.
-- ============================================================================

BEGIN;

INSERT INTO vendors (name, slug) VALUES
  ('Northbend Audio', 'northbend-audio'),
  ('Fieldcraft Goods', 'fieldcraft-goods'),
  ('Keystroke Labs', 'keystroke-labs')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO categories (name, slug) VALUES
  ('Keyboards', 'keyboards'),
  ('Footwear', 'footwear'),
  ('Audio', 'audio')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO tags (name, slug) VALUES
  ('Wireless', 'wireless'),
  ('Mechanical', 'mechanical'),
  ('Water Resistant', 'water-resistant'),
  ('Noise Cancelling', 'noise-cancelling'),
  ('Limited Edition', 'limited-edition')
ON CONFLICT (slug) DO NOTHING;

-- Products -------------------------------------------------------------------
INSERT INTO products (id, title, description, base_price, vendor_id) VALUES
  (1, 'Aria 75 Mechanical Keyboard', 'A compact 75% board with hot-swappable switches.', 14900,
     (SELECT id FROM vendors WHERE slug = 'keystroke-labs')),
  (2, 'Trailhead Waterproof Boot', 'All-weather boot built for long-distance trail use.', 18900,
     (SELECT id FROM vendors WHERE slug = 'fieldcraft-goods')),
  (3, 'Halcyon ANC Headphones', 'Over-ear wireless headphones with adaptive noise cancelling.', 22900,
     (SELECT id FROM vendors WHERE slug = 'northbend-audio'))
ON CONFLICT (id) DO NOTHING;

-- Keep the sequence in sync since we inserted explicit ids above.
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));

-- product_categories -----------------------------------------------------
INSERT INTO product_categories (product_id, category_id)
SELECT 1, id FROM categories WHERE slug = 'keyboards'
UNION ALL
SELECT 2, id FROM categories WHERE slug = 'footwear'
UNION ALL
SELECT 3, id FROM categories WHERE slug = 'audio'
ON CONFLICT DO NOTHING;

-- product_tags -------------------------------------------------------------
INSERT INTO product_tags (product_id, tag_id)
SELECT 1, id FROM tags WHERE slug IN ('wireless', 'mechanical')
UNION ALL
SELECT 2, id FROM tags WHERE slug IN ('water-resistant', 'limited-edition')
UNION ALL
SELECT 3, id FROM tags WHERE slug IN ('wireless', 'noise-cancelling')
ON CONFLICT DO NOTHING;

-- product_variants -----------------------------------------------------------
INSERT INTO product_variants (product_id, variant_name, sku, price_override, stock_quantity) VALUES
  (1, 'Linear Red Switch / Ivory',   'ARIA75-RED-IVR',  NULL,  42),
  (1, 'Tactile Brown Switch / Slate', 'ARIA75-BRN-SLT', 15400, 17),
  (2, 'Size 9 / Loam Brown',  'TRAIL-9-LOAM',  NULL,  12),
  (2, 'Size 10 / Loam Brown', 'TRAIL-10-LOAM', NULL,  9),
  (2, 'Size 10 / Charcoal',   'TRAIL-10-CHAR', 19900, 0),
  (3, 'Midnight Black', 'HALCYON-BLK', NULL, 30),
  (3, 'Fog Grey',        'HALCYON-GRY', NULL, 0)
ON CONFLICT (sku) DO NOTHING;

COMMIT;
