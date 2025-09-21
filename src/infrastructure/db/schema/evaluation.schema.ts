import { pgTable, integer, text, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { user } from "./auth.schema";

export const evaluation = pgTable("evaluation", {
    id: integer().generatedAlwaysAsIdentity().primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    ratings: jsonb("ratings").$type<Record<string, number>>().notNull(),
    textAnswers: jsonb("text_answers").$type<Record<string, string>>(),
    submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

export const InsertEvaluationSchema = createInsertSchema(evaluation);
export type InsertEvaluation = typeof evaluation.$inferInsert;

export const SelectEvaluationSchema = createSelectSchema(evaluation);
export type SelectEvaluation = typeof evaluation.$inferSelect;
