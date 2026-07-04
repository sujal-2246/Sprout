require('dotenv').config();
const express = require('express');
const cors = require('cors');

const productsRouter = require('./routes/products');

const app = express();

app.use(cors());
app.use(express.json());

// Lightweight request log — swap for pino/morgan in production.
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', mockDb: process.env.USE_MOCK_DB === 'true' });
});

app.use('/api/products', productsRouter);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: `No route for ${req.method} ${req.originalUrl}` });
});

// Centralized error handler — catches anything thrown/passed to next(err)
// that individual routes didn't already handle themselves.
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Sprout API listening on http://localhost:${PORT}`);
  console.log(`Mock DB mode: ${process.env.USE_MOCK_DB === 'true' ? 'ON (hardcoded data)' : 'OFF (Postgres)'}`);
});
