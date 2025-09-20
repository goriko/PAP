import db from "@/infrastructure/db";
import { eventName } from "@/infrastructure/db/schema/auth.schema";
import { QRScannerPage } from "@/features/qr-code/components/scanner/qr-scanner-page";

export const dynamic = "force-dynamic";

export default async function QRScanPage() {
	const events = await db.select().from(eventName).execute();
	return <QRScannerPage events={events} />;
}
