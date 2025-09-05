import { pgTable, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const logs = pgTable("logs", {
	id: integer().generatedAlwaysAsIdentity().primaryKey(),
	content: jsonb(),
});

export const InsertLogSchema = createInsertSchema(logs);
export type InsertLog = typeof logs.$inferInsert;

export const SelectLogSchema = createSelectSchema(logs);
export type SelectLog = typeof logs.$inferSelect;
