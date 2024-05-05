import { sql } from "@vercel/postgres";
import { pgEnum, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/vercel-postgres";

// Use this object to send drizzle queries to your DB
export const db = drizzle(sql);

export const ratingEnum = pgEnum("rating_enum", ["1", "2", "3", "4", "5"]);

export const Experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  strain: text("strain").notNull(),
  rating: ratingEnum("rating").notNull(),
  effects: varchar("effects", { length: 100 }).array().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
