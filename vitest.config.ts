import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [Vue()],
  test: {
    globals: true,
    coverage: {
      provider: 'istanbul'
    },
    environment: "happy-dom",
  },
});
