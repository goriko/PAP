ALTER TABLE "user_event" ADD COLUMN "terminal_id" text;
-- Backfill: If you want to set existing rows, you can update them manually or leave as NULL.
