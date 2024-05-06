import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./app/db.server.ts",
  driver: "d1",
  dbCredentials: {
    wranglerConfigPath: "./wrangler.toml",
    dbName: "weed-tracker",
  },
});
