const express = require('express');
const { pool } = require('../db/db');
const { parseProductQuery } = require('../utils/parseQuery');
const { buildProductQuery } = require('../db/queryBuilder');
const { filterMockProducts } = require('../utils/filterMockData');

const router = express.Router();

/**
 * Shapes a raw DB/mock row into the API's public product representation.
 * Prices are converted from integer cents to a decimal string with two
 * places so the frontend never has to know about the storage unit.
 */
function serializeProduct(row) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    price: (Number(row.base_price) / 100).toFixed(2),
    vendor: row.vendor_name,
    categories: row.category_slugs ?? [],
    tags: row.tag_slugs ?? [],
    stock: Number(row.total_stock),
    createdAt: row.created_at,
  };
}

// GET /api/products
router.get('/', async (req, res) => {
  const { filters, errors } = parseProductQuery(req.query);

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Invalid query parameters', details: errors });
  }

  try {
    let rows;
    let totalItems;

    if (process.env.USE_MOCK_DB === 'true') {
      const result = filterMockProducts(filters);
      rows = result.page;
      totalItems = result.totalItems;
    } else {
      const { sql, params, countSql, countParams } = buildProductQuery(filters);

      // Run the page query and the count query concurrently — they're
      // independent reads against the same snapshot-consistent connection
      // pool, so there's no reason to serialize them.
      const [productsResult, countResult] = await Promise.all([
        pool.query(sql, params),
        pool.query(countSql, countParams),
      ]);

      rows = productsResult.rows;
      totalItems = Number(countResult.rows[0]?.total ?? 0);
    }

    const totalPages = totalItems === 0 ? 0 : Math.ceil(totalItems / filters.limit);

    return res.status(200).json({
      metadata: {
        totalItems,
        totalPages,
        currentPage: filters.page,
        limit: filters.limit,
      },
      products: rows.map(serializeProduct),
    });
  } catch (err) {
    // Never leak raw DB errors (connection strings, table names, etc) to
    // the client — log server-side, return a generic message.
    console.error('GET /api/products failed:', err);
    return res.status(500).json({ error: 'Something went wrong while fetching products.' });
  }
});

module.exports = router;
