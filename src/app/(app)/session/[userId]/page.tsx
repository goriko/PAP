import { SessionComponent } from "@/features/session/components/session-component";
import db from "@/infrastructure/db";
import { user, userEvent, eventName } from "@/infrastructure/db/schema/auth.schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function SessionPage(props: {
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

  const userEvents = await db
    .select()
    .from(userEvent)
    .where(eq(userEvent.userId, userId))
    .leftJoin(eventName, eq(userEvent.eventId, eventName.id));

  if (!userEvents) {
    return (
      <div className="text-center mt-20 text-red-600 font-bold text-lg">
        Failed to load session data.
      </div>
    );
  }

  console.log("event", userEvents)

  // Require at least one check-in
  const hasCheckedIn = userEvents.some((ue: any) => ue.firstCheckinAt !== null);
  if (!hasCheckedIn) {
    return (
      <div className="text-center mt-20 text-red-600 font-bold text-lg">
        No data found.
      </div>
    );
  }

  return (<SessionComponent user={foundUser} attendedEvents={userEvents} />);
}