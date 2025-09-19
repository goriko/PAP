import { eq, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import db from "@/infrastructure/db";
import { userEvent } from "@/infrastructure/db/schema/auth.schema";

// GET /api/user-event?eventId=123
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("eventId");
    const terminalId = searchParams.get("terminalId");
    if (!eventId) {
        return NextResponse.json({ error: "Missing eventId" }, { status: 400 });
    }
    const filters = [eq(userEvent.eventId, Number(eventId))];
    if (terminalId) {
        filters.push(eq(userEvent.terminalId, terminalId));
    }
    const whereClause = and(...filters);
    const rows = await db.select().from(userEvent).where(whereClause);
    return NextResponse.json(rows);
}
// POST /api/user-event
export async function POST(req: NextRequest) {
    try {
        const { userId, eventId, terminalId } = await req.json();
        if (!userId || !eventId || !terminalId) {
            return NextResponse.json(
                { error: "Missing userId, eventId, or terminalId" },
                { status: 400 }
            );
        }

        const id = `${userId}_${eventId}`;
        const now = new Date();

        // Check if this user_event already exists
        const [existing] = await db
            .select()
            .from(userEvent)
            .where(eq(userEvent.id, id))
            .execute();

        if (!existing) {
            // First ever check-in
            await db.insert(userEvent).values({
                id,
                userId,
                eventId,
                terminalId,
                firstCheckinAt: now,
                lastCheckinAt: now,
            });

            return NextResponse.json({
                success: true,
                isFirstCheckin: true,
                message: "User checked in successfully (first time)",
            });
        } else {
            // Already checked in before → update only lastCheckinAt
            await db
                .update(userEvent)
                .set({ lastCheckinAt: now, terminalId })
                .where(eq(userEvent.id, id));

            return NextResponse.json({
                success: true,
                isFirstCheckin: false,
                message: "User has already checked in",
            });
        }
    } catch (error) {
        return NextResponse.json({ error: error?.toString() }, { status: 500 });
    }
}
