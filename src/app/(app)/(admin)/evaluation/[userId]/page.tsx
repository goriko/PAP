import { EvaluationComponent } from "@/features/evaluation/components/evaluation-component";
import db from "@/infrastructure/db";
import { user } from "@/infrastructure/db/schema/auth.schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function EvaluationPage(props: {
    params: Promise<{ userId: string }>;
}) {
    const { userId } = await props.params;

    // Check user exists
    const [foundUser] = await db
        .select()
        .from(user)
        .where(eq(user.id, userId));

    if (!foundUser) {
        return (
            <div className="text-center mt-20 text-red-600 font-bold text-lg">
                User not found.
            </div>
        );
    }

    // Fetch events user attended
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user-event?userId=${userId}`,
        { cache: "no-store" }
    );

    if (!res.ok) {
        return (
            <div className="text-center mt-20 text-red-600 font-bold text-lg">
                Failed to load evaluation data.
            </div>
        );
    }

    const userEvents = await res.json();

    // Require at least one check-in
    const hasCheckedIn = userEvents.some((ue: any) => ue.firstCheckinAt !== null);
    if (!hasCheckedIn) {
        return (
            <div className="text-center mt-20 text-red-600 font-bold text-lg">
                You must check in first to access the evaluation form.
            </div>
        );
    }

    return (<EvaluationComponent user={foundUser} attendedEvents={userEvents} />);
}