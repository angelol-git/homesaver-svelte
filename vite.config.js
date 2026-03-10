import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  build: {
    // Ensure all JavaScript is externalized (no inline scripts)
    rollupOptions: {
      output: {
        // Prevent inline dynamic imports
        inlineDynamicImports: false,
        // Ensure all chunks are separate files
        manualChunks: undefined,
      },
    },
    // Don't inline assets
    assetsInlineLimit: 0,
  },
});
