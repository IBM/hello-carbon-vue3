import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5174/",
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
});
