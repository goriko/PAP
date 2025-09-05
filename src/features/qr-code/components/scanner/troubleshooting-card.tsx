import {
	Card,
	CardContent,
	CardTitle,
} from "@/features/shared/components/base/card";

export function TroubleshootingCard() {
	return (
		<Card>
			<CardContent>
				<CardTitle className="pb-4 text-lg sm:text-xl">
					⚠️ Troubleshooting
				</CardTitle>
				<ul className="space-y-2 text-muted-foreground text-sm sm:text-base">
					<li>• Refresh page if camera doesn't start</li>
					<li>• Close other apps using the camera</li>
					<li>• Check if camera works in other applications</li>
					<li>• Clear browser cache if issues persist</li>
					<li>• Try switching between front and back cameras</li>
					<li>• Ensure good lighting on the QR code</li>
				</ul>
			</CardContent>
		</Card>
	);
}
