const SORT_COLUMN_MAP = {
  newest: 'p.created_at DESC',
  price_asc: 'p.base_price ASC',
  price_desc: 'p.base_price DESC',
  // "relevance" only means something when a search term is present;
  // buildProductQuery falls back to newest when search is empty.
  relevance: 'similarity_score DESC',
};

/**
 * Builds a parameterized SQL query (+ matching params array) for
 * GET /api/products, adding a WHERE clause fragment only for filters that
 * are actually present. Every value is bound as a placeholder ($1, $2...)
 * — never string-interpolated — so this is immune to SQL injection
 * regardless of what the client sends.
 *
 * Returns { sql, params, countSql, countParams } — two queries because we
 * need both the page of results AND the total match count for pagination
 * metadata, and running COUNT(*) OVER() on every row is more expensive
 * than a second, simpler query in most cases at this scale.
 */
function buildProductQuery(filters) {
  const { category, tags, minPriceCents, maxPriceCents, search, sortBy, limit, offset } = filters;

  const whereClauses = ['p.is_active = true'];
  const params = [];

  // Helper to push a param and return its placeholder ($1, $2, ...) so
  // clause construction below stays readable instead of manually tracking
  // an index counter at every call site.
  const addParam = (value) => {
    params.push(value);
    return `$${params.length}`;
  };

  if (category) {
    whereClauses.push(`
      EXISTS (
        SELECT 1 FROM product_categories pc
        JOIN categories c ON c.id = pc.category_id
        WHERE pc.product_id = p.id AND c.slug = ${addParam(category)}
      )
    `);
  }

  if (tags.length > 0) {
    // "Match at least one selected tag" — ANY() against the array param.
    whereClauses.push(`
      EXISTS (
        SELECT 1 FROM product_tags pt
        JOIN tags t ON t.id = pt.tag_id
        WHERE pt.product_id = p.id AND t.slug = ANY(${addParam(tags)})
      )
    `);
  }

  if (minPriceCents !== null) {
    whereClauses.push(`p.base_price >= ${addParam(minPriceCents)}`);
  }

  if (maxPriceCents !== null) {
    whereClauses.push(`p.base_price <= ${addParam(maxPriceCents)}`);
  }

  if (search) {
    // ILIKE with leading wildcard relies on the pg_trgm GIN index defined
    // in schema.sql (idx_products_title_trgm) to stay fast at scale.
    whereClauses.push(`p.title ILIKE ${addParam(`%${search}%`)}`);
  }

  const whereSql = whereClauses.length ? `WHERE ${whereClauses.join(' AND ')}` : '';

  // "relevance" without a search term doesn't mean anything — fall back
  // to newest so we never sort by a column that doesn't exist.
  const effectiveSort = sortBy === 'relevance' && !search ? 'newest' : sortBy;
  const orderBySql = SORT_COLUMN_MAP[effectiveSort] ?? SORT_COLUMN_MAP.newest;

  const sql = `
    SELECT
      p.id,
      p.title,
      p.description,
      p.base_price,
      p.created_at,
      v.name AS vendor_name,
      COALESCE(SUM(pv.stock_quantity), 0) AS total_stock,
      ARRAY_AGG(DISTINCT c.slug) FILTER (WHERE c.slug IS NOT NULL) AS category_slugs,
      ARRAY_AGG(DISTINCT t.slug) FILTER (WHERE t.slug IS NOT NULL) AS tag_slugs
    FROM products p
    JOIN vendors v ON v.id = p.vendor_id
    LEFT JOIN product_variants pv ON pv.product_id = p.id
    LEFT JOIN product_categories pc ON pc.product_id = p.id
    LEFT JOIN categories c ON c.id = pc.category_id
    LEFT JOIN product_tags pt ON pt.product_id = p.id
    LEFT JOIN tags t ON t.id = pt.tag_id
    ${whereSql}
    GROUP BY p.id, v.name
    ORDER BY ${orderBySql}
    LIMIT ${addParam(limit)} OFFSET ${addParam(offset)}
  `;

  // Count query reuses the same WHERE clause and params but drops
  // LIMIT/OFFSET (and the two params that go with them) since we only
  // need a row count, not the rows themselves.
  const countParams = params.slice(0, params.length - 2);
  const countSql = `
    SELECT COUNT(DISTINCT p.id) AS total
    FROM products p
    JOIN vendors v ON v.id = p.vendor_id
    ${whereSql}
  `;

  return { sql, params, countSql, countParams };
}

module.exports = { buildProductQuery };
