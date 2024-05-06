import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export interface Env {
  DB: D1Database;
}

// Use this object to send drizzle queries to your DB
// export const db = drizzle(env.DB);

export const experiences = sqliteTable("experiences", {
  id: integer("id").primaryKey(),
  strain: text("strain").notNull(),
  rating: text("rating", { enum: ["1", "2", "3", "4", "5"] }).notNull(),
  effects: text("effects", { mode: "json" }).notNull().$type<string[]>(),
  createdAt: text("createdAt")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});
