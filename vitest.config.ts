import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    include: ["src/**/__tests__/**/*.test.{ts,tsx}"],
    // next build sets this from trailingSlash: true in next.config.ts;
    // next/link reads it to keep the slash on rendered hrefs.
    env: { __NEXT_TRAILING_SLASH: "true" },
  },
});
