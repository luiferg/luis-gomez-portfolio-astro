import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";

export default defineConfig({
  // Default static for the portfolio. Routes that need SSR (brief gate +
  // submission endpoints) opt in via `export const prerender = false`.
  output: "static",
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
