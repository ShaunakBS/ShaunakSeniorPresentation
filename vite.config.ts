import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Base path: set VITE_BASE (e.g. "/my-repo/") for GitHub Pages project sites.
// The default "./" makes every asset URL relative, so the build also works under any subpath.
export default defineConfig({
  base: process.env.VITE_BASE || './',
  plugins: [react()],
  server: { host: '127.0.0.1', port: 5173 },
});
