import db from "@/infrastructure/db";
import { user } from "@/infrastructure/db/schema/auth.schema";
import { evaluation } from "@/infrastructure/db/schema/evaluation.schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CertificatePage(props: {
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

    // Check if evaluation exists
    const [foundEvaluation] = await db
        .select()
        .from(evaluation)
        .where(eq(evaluation.userId, userId));

    if (foundEvaluation) {
        return (
            <div className="flex flex-col items-center gap-4 mt-6">
                <p>Your evaluation has already been submitted.</p>
                <a
                    href={`/api/certificate/${userId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                >
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

    // If no evaluation yet
    return (
        <div className="flex flex-col items-center gap-4 mt-6">
            <p>You have not submitted an evaluation yet.</p>
            <Link
                href={`/evaluation/${userId}`}
                className="text-blue-600 hover:underline"
            >
                Click here to evaluate
            </Link>
        </div>
    );
}
