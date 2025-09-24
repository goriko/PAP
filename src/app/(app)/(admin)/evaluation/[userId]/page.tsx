import { EvaluationComponent } from "@/features/evaluation/components/evaluation-component";
import db from "@/infrastructure/db";
import { user, userEvent, eventName } from "@/infrastructure/db/schema/auth.schema";
import { evaluation } from "@/infrastructure/db/schema/evaluation.schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

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

    const [foundEvaluation] = await db
        .select()
        .from(evaluation)
        .where(eq(evaluation.userId, userId));

    if (foundEvaluation) {
        return (
            <div className="flex flex-col items-center gap-4 mt-6">
                <p>Your evaluation has already been submitted.</p>
                <a href={`/api/certificate/${userId}`} target="_blank" rel="noopener noreferrer">
                    Click here to view your certificate
                </a>
                <a
                    href={`/api/certificate/${userId}`}
                    download
                    className="text-blue-600 hover:underline"
                >
                    Download Certificate
                </a>
            </div>

        );
    }

    // Check user exists
    const res = await db
        .select()
        .from(userEvent)
        .where(eq(userEvent.userId, userId))
        .leftJoin(eventName, eq(userEvent.eventId, eventName.id));

    if (!res) {
        return (
            <div className="text-center mt-20 text-red-600 font-bold text-lg">
                Failed to load evaluation data.
            </div>
        );
    }

    const userEvents = res;

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