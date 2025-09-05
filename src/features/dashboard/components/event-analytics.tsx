import { Card, CardContent } from "@/features/shared/components/base/card";
import { ArrowUpRight } from "lucide-react";

export function EventAnalytics() {
	return (
		<Card className="relative h-full overflow-hidden rounded-2xl border-border shadow-lg">
			{/* Background accent */}
			<div className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-analytics-warning-dark">
				<ArrowUpRight className="h-4 w-4 text-black" />
			</div>

			<CardContent className="px-8 py-4">
				<div className="space-y-6">
					<div>
						<div className="font-medium text-base text-muted-foreground">
							Event Analytics
						</div>
						<div className="mt-1 text-muted-foreground text-sm">Real-time</div>
					</div>

					<div className="space-y-4">
						<div>
							<div className="mb-1 text-muted-foreground text-sm">
								Peak Check-in Time
							</div>
							<div className="font-bold text-3xl">9:30 AM</div>
						</div>

						<div>
							<div className="mb-1 text-muted-foreground text-sm">
								Average Stay
							</div>
							<div className="font-bold text-3xl">4.2h</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
