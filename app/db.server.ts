import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export interface Env {
  DB: D1Database;
}

export const experiences = sqliteTable("experiences", {
  id: integer("id").primaryKey(),
  strain: text("strain").notNull(),
  rating: text("rating", { enum: ["1", "2", "3", "4", "5"] }).notNull(),
  effects: text("effects", { mode: "json" }).notNull().$type<string[]>(),
  createdAt: text("createdAt")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  userId: text("user_id").notNull(),
});

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  userId: text("userId").notNull(), // From Clerk
});

export const userRelations = relations(users, ({ many }) => ({
  experience: many(experiences),
}));

export const experiencesRelations = relations(experiences, ({ one }) => ({
  user: one(users, {
    fields: [experiences.userId],
    references: [users.userId],
  }),
}));
