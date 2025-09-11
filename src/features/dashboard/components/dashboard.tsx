import { ActivityMetrics } from "./activity-metrics";
import { AuthLogs } from "./auth-logs";
import { EventAnalytics } from "./event-analytics";
import { RegistrationChart } from "./registration-chart";
import { StatsCards } from "./stats-cards";
import { TurnoutChart } from "./turnout-chart";
import { authClient } from "@/infrastructure/auth/auth-client";
import { headers } from "next/headers";
import type { ExtendedSession } from "@/types/entities/session.entity";
import {
	type UserRoleEnum,
	UserRoleEnumSchema,
} from "@/types/enums/UserRoleEnum";

export async function Dashboard() {
	const session = (await authClient.getSession({
		fetchOptions: {
			headers: await headers(),
		},
	})) as { data: ExtendedSession | null };

	const userRole = session.data?.user.role as UserRoleEnum;
	if (userRole === UserRoleEnumSchema.Enum.ADMIN || userRole === UserRoleEnumSchema.Enum.STAFF) {
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
	return (
		<div className="col-span-full flex flex-col items-center justify-center text-center p-8">
			<h1 className="text-2xl font-bold mb-4">
				FUTURESCAPING PSYCHOLOGY: Our Role in Attaining the Sustainable Development Goals
			</h1>
			<p className="text-lg text-gray-700 leading-relaxed">
				IC3 CONVENTION CENTER CEBU <br />
				September 24, 2025 Preconvention Workshops <br />
				September 25–27, 2025 Convention
			</p>
		</div>
	);

}
