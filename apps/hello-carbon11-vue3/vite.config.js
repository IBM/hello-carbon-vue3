import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        // treat all tags starting with cds- as custom elements
        isCustomElement: tag => tag.startsWith("cds-"),
      },
    },
  })],
  server: {
    port: 5174,
    watch: {
      ignored: "**/cypress/**",
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    chunkSizeWarningLimit: 975,
    // Exclude the Cypress folder from being processed by Vite
    exclude: ["cypress/**"],
  },
});
