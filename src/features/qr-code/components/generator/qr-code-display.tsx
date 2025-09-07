import { QrCode, AlertTriangle } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

interface QRCodeDisplayProps {
	isGenerated: boolean;
	qrValue: string | null;
}

export function QRCodeDisplay({ isGenerated, qrValue }: QRCodeDisplayProps) {
	if (!isGenerated || !qrValue) {
		return (
			<div className="flex flex-col items-center justify-center py-12 text-center">
				<div className="mb-4 rounded-full bg-muted/50 p-6">
					<QrCode className="size-12 text-muted-foreground/50" />
				</div>
				<p className="text-muted-foreground text-sm">
					Click "Generate QR Code" to create your QR code
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{/* QR Code */}
			<div className="flex items-center justify-center overflow-hidden">
				<div className="w-full max-w-full p-2 sm:max-w-sm md:max-w-md">
					<QRCodeSVG
						value={qrValue}
						size={280}
						level="M"
						includeMargin={true}
						className="h-auto w-full max-w-full"
					/>
				</div>
			</div>

			<div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-orange-200 bg-orange-50 p-3 text-orange-800 text-sm md:flex-row md:text-lg dark:border-orange-800 dark:bg-orange-900/20 dark:text-orange-200">
				<AlertTriangle className="size-10 flex-shrink-0 text-analytics-danger md:size-6" />
				<span className="font-medium">Security Notice:</span>
				<span className="text-center">
					Do not share this QR code with anyone. It contains your personal
					authentication credentials.
				</span>
			</div>
		</div>
	);
}
