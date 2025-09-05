import { Scanner } from "@yudiel/react-qr-scanner";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/features/shared/components/base/card";

interface ScannerCardProps {
	cameraReady: boolean;
	permissionStatus: string;
	onScan: (detectedCodes: any[]) => void;
	onError: (error: unknown) => void;
	scannerActive?: boolean;
	showSuccess?: boolean;
}

export function ScannerCard({
	cameraReady,
	permissionStatus,
	onScan,
	onError,
	scannerActive = true,
	showSuccess = false,
}: ScannerCardProps) {
	const shouldShowScanner = cameraReady && scannerActive && !showSuccess;

	return (
		<Card className="mx-auto flex w-full">
			<CardHeader>
				<CardTitle className="text-lg sm:text-xl">Scanner View</CardTitle>
			</CardHeader>
			<CardContent className="self-center">
				<div className="relative max-h-[60vh] overflow-hidden rounded-lg bg-black sm:aspect-[4/3]">
					{shouldShowScanner ? (
						<Scanner
							onScan={onScan}
							onError={onError}
							constraints={{
								facingMode: "environment", // Use back camera on mobile, front on desktop
								width: { ideal: 1280 },
								height: { ideal: 720 },
							}}
							scanDelay={300}
							allowMultiple={false}
							styles={{
								container: {
									width: "100%",
									height: "100%",
									borderRadius: "8px",
									overflow: "hidden",
								},
								video: {
									width: "100%",
									height: "100%",
									objectFit: "cover" as const,
								},
							}}
						/>
					) : (
						<div className="flex h-full items-center justify-center text-white">
							<div className="space-y-4 p-4 text-center">
								<div className="space-y-2">
									<p className="font-medium text-sm sm:text-lg">
										{showSuccess
											? "Scan completed successfully!"
											: permissionStatus === "checking"
												? "Initializing camera..."
												: permissionStatus === "denied"
													? "Camera access denied"
													: !scannerActive
														? "Scanner paused"
														: "Preparing scanner..."}
									</p>
									<p className="text-gray-300 text-xs sm:text-sm">
										{showSuccess
											? 'Click "Scan Next QR Code" to continue'
											: scannerActive
												? "Position QR code within the viewfinder"
												: "Complete the confirmation to continue scanning"}
									</p>
								</div>
							</div>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
