const { Pool } = require('pg');

// A single shared pool for the process. pg handles connection reuse/queuing
// internally, so route handlers should just `await pool.query(...)` rather
// than opening/closing their own clients.
const pool = new Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT) || 5432,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  max: 10,
  idleTimeoutMillis: 30000,
});

pool.on('error', (err) => {
  // Idle clients emit errors on unexpected disconnects (e.g. DB restart).
  // Log and let the process keep running — pg will create new clients
  // on the next query rather than crashing the server.
  console.error('Unexpected error on idle Postgres client', err);
});

module.exports = { pool };
