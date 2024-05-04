import { sentryVitePlugin } from "@sentry/vite-plugin";
import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { vercelPreset } from "@vercel/remix/vite";

installGlobals();

export default defineConfig({
  plugins: [remix({
    presets: [vercelPreset()],
  }), tsconfigPaths(), sentryVitePlugin({
    org: "sean-96",
    project: "weed-tracker"
  })],

  build: {
    sourcemap: true
  }
});