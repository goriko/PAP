import db from "@/infrastructure/db";
import { eventName } from "@/infrastructure/db/schema/auth.schema";
import { TerminalPage } from "@/features/terminal/components/terminal-page";

export const dynamic = "force-dynamic";

export default async function TerminalPageRoute() {
	const events = await db.select().from(eventName).execute();
	return <TerminalPage events={events} />;
}
