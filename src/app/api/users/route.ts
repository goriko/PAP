import { NextResponse } from "next/server";
import db from "@/infrastructure/db";
import { user } from "@/infrastructure/db/schema/auth.schema";

export async function GET() {
    try {
        const allUsersRaw = await db.select().from(user).execute();
        const allUsers = allUsersRaw.map((u) => ({
            ...u,
            createdAt: u.createdAt.toISOString(),
            updatedAt: u.updatedAt.toISOString(),
        }));

        return NextResponse.json(allUsers);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}