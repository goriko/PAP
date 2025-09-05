import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "@/config/env.server";

const db = drizzle(env.DB_URL);
export default db;
