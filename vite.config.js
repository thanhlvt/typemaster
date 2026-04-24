import { defineConfig } from 'vite';

export default defineConfig({
  // Set base to './' so that the build uses relative paths for all assets.
  // This is essential for deploying to GitHub Pages in a subfolder like /typemaster/
  base: './',
  build: {
    // Ensure the build output is clean
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    port: 5173,
    open: true
  }
});
