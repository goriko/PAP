import { Badge } from "@/features/shared/components/base/badge";
import { Card, CardContent } from "@/features/shared/components/base/card";

export function RecentActivity() {
	const activities = [
		{ type: "Check-in", count: 156, status: "active" },
		{ type: "Registration", count: 23, status: "pending" },
		{ type: "No-shows", count: 8, status: "warning" },
	];

	return (
		<Card className="h-full border-border">
			<CardContent className="p-6">
				<div className="space-y-4">
					<h3 className="font-semibold text-lg">Recent Activity</h3>
					<div className="space-y-3">
						{activities.map((activity) => (
							<div
								key={activity.type}
								className="flex items-center justify-between"
							>
								<div>
									<p className="font-medium">{activity.type}</p>
									<p className="text-muted-foreground text-sm">Last hour</p>
								</div>
								<div className="text-right">
									<p className="font-bold text-xl">{activity.count}</p>
									<Badge
										variant={
											activity.status === "active"
												? "default"
												: activity.status === "pending"
													? "secondary"
													: "destructive"
										}
										className="text-xs"
									>
										{activity.status}
									</Badge>
								</div>
							</div>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
