import { Card, CardContent } from "@/features/shared/components/base/card";
import { Badge } from "@/features/shared/components/base/badge";

interface CameraStatusCardProps {
	permissionStatus: string;
	terminalId: string;
	event: string;
}

export function CameraStatusCard({
	permissionStatus,
	terminalId,
	event,
}: CameraStatusCardProps) {
	return (
		<Card>
			<CardContent>
				<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<p className="text-base text-muted-foreground sm:text-lg">
							Camera Status
						</p>
						<div className="mt-2 flex items-center gap-2">
							<Badge
								variant={
									permissionStatus === "granted"
										? "default"
										: permissionStatus === "denied"
											? "destructive"
											: "secondary"
								}
							>
								{permissionStatus === "granted"
									? "Ready"
									: permissionStatus === "denied"
										? "Access Denied"
										: "⏳ Initializing..."}
							</Badge>
						</div>
					</div>

					<div className="flex flex-col items-start justify-start gap-2 sm:flex-row sm:gap-4">
						<div className="w-full p-2 px-4">
							<p className="text-base text-muted-foreground">Event</p>
							<p className="font-bold font-mono">{event || "Not Set"}</p>
						</div>
						<div className="w-full p-2 px-4">
							<p className="text-base text-muted-foreground">
								Terminal&nbsp;ID
							</p>
							<p className="font-bold font-mono">{terminalId || "Not Set"}</p>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
