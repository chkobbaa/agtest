import { defineConfig } from "vite";

// DIGL is a fully static brand site. We use a relative base so the build
// can be dropped onto any host (Netlify, GitHub Pages, a subfolder, etc.)
// without rewriting asset URLs.
export default defineConfig({
  base: "./",
  build: {
    target: "es2019",
    cssMinify: true,
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ["gsap", "lenis"],
        },
      },
    },
  },
});
