import { env } from "@/config/env.server";
import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./src/infrastructure/db/migrations",
	schema: "./src/infrastructure/db/schema",
	dialect: "postgresql",
	dbCredentials: {
		url: env.DB_URL,
	},
});
