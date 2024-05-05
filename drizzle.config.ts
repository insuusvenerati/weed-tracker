import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./app/db.server.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL!,
  },
});
