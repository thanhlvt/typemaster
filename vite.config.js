import { defineConfig } from 'vite';

export default defineConfig({
  // '/' for Cloudflare Pages / Netlify with custom domain (root deployment)
  // Change to './' if deploying to GitHub Pages subfolder (e.g. /typemaster/)
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    target: 'esnext',
  },
  server: {
    port: 5173,
    open: true
  }
});
