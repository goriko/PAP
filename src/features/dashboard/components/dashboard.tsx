import { ActivityMetrics } from "./activity-metrics";
import { AuthLogs } from "./auth-logs";
import { EventAnalytics } from "./event-analytics";
import { RegistrationChart } from "./registration-chart";
import { StatsCards } from "./stats-cards";
import { TurnoutChart } from "./turnout-chart";

export function Dashboard() {
	return (
		<div className="grid auto-rows-min grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
			{/* Top Stats Row */}
			<div className="col-span-full">
				<StatsCards />
			</div>

			{/* Main Content Grid */}
			<div className="col-span-1 md:col-span-2 lg:col-span-3">
				<TurnoutChart attendees={3000} registered={2500} />
			</div>

			<div className="col-span-1 md:col-span-1 lg:col-span-3">
				<RegistrationChart />
			</div>

			<div className="col-span-1 md:col-span-1 lg:col-span-4">
				<ActivityMetrics newCheckins={1500} newRegistrations={1200} />
			</div>

			<div className="col-span-1 md:col-span-1 lg:col-span-2">
				<EventAnalytics />
			</div>

			<div className="col-span-full">
				<AuthLogs />
			</div>
		</div>
	);
}
