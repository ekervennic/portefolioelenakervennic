// Standalone Vite config used ONLY for the GitHub Pages static build.
// The default `vite.config.ts` (Lovable / TanStack Start) is left untouched.
//
// Build locally with:  bunx vite build --config vite.config.gh.mts
// Output goes to dist/.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// If your repo is published at https://<user>.github.io/<repo>/
// set BASE_PATH=/<repo>/ (with leading & trailing slash).
// For a user/organization site (https://<user>.github.io/) leave it as "/".
const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
  base,
  plugins: [
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});