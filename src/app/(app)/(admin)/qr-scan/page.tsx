import { QRScannerPage } from "@/features/qr-code/components/scanner/qr-scanner-page";

export const dynamic = "force-dynamic";

export default async function QRScanPage() {
	return <QRScannerPage />;
}
