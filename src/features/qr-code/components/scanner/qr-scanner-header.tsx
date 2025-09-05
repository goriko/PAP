import { ScanLine } from "lucide-react";

export function QRScannerHeader() {
	return (
		<div className="space-y-1">
			<div className="flex items-center gap-2">
				<ScanLine className="size-6 sm:size-8" />
				<h1 className="font-bold text-xl tracking-tight sm:text-2xl">
					QR Code Scanner
				</h1>
			</div>
			<p className="text-muted-foreground text-sm sm:text-base">
				Scan QR codes for event check-in and check-out management.
			</p>
		</div>
	);
}
