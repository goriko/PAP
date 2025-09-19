import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import db from "@/infrastructure/db";
import { user } from "@/infrastructure/db/schema/auth.schema";

// GET /api/users
export async function GET(req: NextRequest) {
    const rows = await db.select().from(user);
    return NextResponse.json(rows);
}
