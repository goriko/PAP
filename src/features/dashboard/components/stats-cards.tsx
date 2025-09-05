import { Card, CardContent } from "@/features/shared/components/base/card";
import { Users, UserCheck, TrendingUp } from "lucide-react";

export function StatsCards() {
	const stats = [
		{
			title: "Total Registered",
			value: "2,847",
			icon: Users,
			change: "+12%",
			changeType: "positive" as const,
		},
		{
			title: "Present Today",
			value: "1,923",
			icon: UserCheck,
			change: "+8%",
			changeType: "positive" as const,
		},
		{
			title: "Turnout Rate",
			value: "67.5%",
			icon: TrendingUp,
			change: "+3.2%",
			changeType: "positive" as const,
		},
	];

	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
			{stats.map((stat) => (
				<Card
					key={stat.title}
					className="rounded-2xl border-border text-accent-foreground shadow-lg"
				>
					<CardContent className="px-8 py-4">
						<div className="space-y-4">
							<div className="flex items-start justify-between">
								<div className="space-y-3">
									<p className="font-medium text-base text-muted-foreground">
										{stat.title}
									</p>
									<p className="font-bold text-5xl">{stat.value}</p>
									<p
										className={`font-medium text-base ${
											stat.changeType === "positive"
												? "text-success dark:text-success"
												: "text-analytics-danger dark:text-analytics-danger"
										}`}
									>
										{stat.change} from yesterday
									</p>
								</div>
								<div className="rounded-full bg-muted p-3">
									<stat.icon className="h-10 w-10 text-foreground" />
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
