import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Forwards /api/* to the Express backend during local dev so the
      // frontend can call relative paths without a CORS dance.
      '/api': 'http://localhost:4000',
    },
  },
});
