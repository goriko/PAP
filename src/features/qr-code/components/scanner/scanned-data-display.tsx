import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/features/shared/components/base/card";
import { Label } from "@/features/shared/components/base/label";
import type { ScanResult } from "./types/scan-result";

interface ScannedDataDisplayProps {
	scanResult: ScanResult;
}

export function ScannedDataDisplay({ scanResult }: ScannedDataDisplayProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-base">Scanned Information</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Label className="text-muted-foreground text-xs">
						Decrypted Data
					</Label>
					<div className="mt-1 max-h-32 overflow-y-auto break-all rounded bg-muted p-3 font-mono text-sm">
						{JSON.stringify(scanResult.decryptedData) ||
							"Unable to decrypt data"}
					</div>
				</div>
				<div className="space-y-2">
					<Label className="text-muted-foreground text-xs">Raw QR Data</Label>
					<div className="mt-1 max-h-20 overflow-y-auto break-all rounded bg-muted/50 p-2 font-mono text-muted-foreground text-xs">
						{scanResult.rawData}
					</div>
				</div>
				<div>
					<Label className="text-muted-foreground text-xs">Scanned At</Label>
					<p className="mt-1 text-sm">
						{scanResult.timestamp.toLocaleString()}
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
