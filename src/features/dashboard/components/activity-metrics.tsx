import { Card, CardContent } from "@/features/shared/components/base/card";
import { cn } from "@/features/shared/lib/utils";

interface ActivityMetricsProps {
	newCheckins: number;
	newRegistrations: number;
	className?: string;
}

export function ActivityMetrics({
	newCheckins,
	newRegistrations,
	className,
}: ActivityMetricsProps) {
	const total = newCheckins + newRegistrations;
	const checkinPercentage = total > 0 ? (newCheckins / total) * 100 : 0;
	const registrationPercentage =
		total > 0 ? (newRegistrations / total) * 100 : 0;

	// Sample data for bar chart visualization
	const data = [
		{ value: 40, color: "bg-analytics-primary" },
		{ value: 60, color: "bg-info-light" },
		{ value: 30, color: "bg-analytics-primary-dark" },
		{ value: 80, color: "bg-analytics-primary" },
		{ value: 50, color: "bg-info-light" },
		{ value: 90, color: "bg-analytics-primary-dark" },
		{ value: 70, color: "bg-analytics-primary" },
	];

	return (
		<Card className={cn("rounded-2xl border-border shadow-lg", className)}>
			<CardContent className="px-8 py-4">
				<div className="flex items-center justify-between">
					<div className="space-y-3">
						<div className="font-medium text-base text-muted-foreground">
							Recent Activity
						</div>
						<div className="flex items-center space-x-3">
							<span className="font-bold text-4xl">
								{total.toLocaleString()}
							</span>
							<span className="rounded bg-success-dark px-2 py-1 font-semibold text-sm text-success-foreground">
								+{Math.round(((newCheckins + newRegistrations) / 2000) * 100)}%
							</span>
						</div>
						<div className="text-base text-muted-foreground">
							actions this week
						</div>
					</div>

					{/* Chart Area */}
					<div className="relative h-20 w-32">
						<div className="flex h-full items-end justify-between space-x-1">
							{data.map((bar) => (
								<div
									key={bar.value}
									className={`${bar.color} w-3 rounded-t transition-all duration-500`}
									style={{ height: `${bar.value}%` }}
								/>
							))}
						</div>
					</div>
				</div>

				{/* Activity Breakdown */}
				<div className="mt-6 space-y-3">
					<div className="space-y-2">
						<div className="flex items-center justify-between text-base">
							<span className="text-muted-foreground">Check-ins</span>
							<span className="font-semibold">
								{newCheckins.toLocaleString()}
							</span>
						</div>
						<div className="h-2 overflow-hidden rounded-full bg-muted">
							<div
								className="h-full rounded-full bg-primary transition-all duration-500"
								style={{ width: `${checkinPercentage}%` }}
							/>
						</div>
					</div>

					<div className="space-y-2">
						<div className="flex items-center justify-between text-base">
							<span className="text-muted-foreground">New Registrations</span>
							<span className="font-semibold">
								{newRegistrations.toLocaleString()}
							</span>
						</div>
						<div className="h-2 overflow-hidden rounded-full bg-muted">
							<div
								className="h-full rounded-full bg-primary transition-all duration-500"
								style={{ width: `${registrationPercentage}%` }}
							/>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
