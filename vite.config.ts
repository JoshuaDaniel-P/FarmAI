import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const base = process.env.BASE_URL || '/Agroaura/';

export default defineConfig({
  base: base.endsWith('/') ? base : `${base}/`,
  plugins: [react()],
});
