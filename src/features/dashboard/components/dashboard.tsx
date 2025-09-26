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
import { Card, CardContent } from "@/features/shared/components/base/card";
import {
	Building,
	Calendar,
	Home,
	Inbox,
	QrCode,
	UserPlus,
	MonitorStop,
	User,
	Gift,
	Clipboard,
	Award,
	CheckSquare
} from "lucide-react";

import db from "@/infrastructure/db";
import { settings } from "@/infrastructure/db/schema/auth.schema";
import { eq } from "drizzle-orm";

export async function Dashboard() {
	const session = (await authClient.getSession({
		fetchOptions: {
			headers: await headers(),
		},
	})) as { data: ExtendedSession | null };

	const userId = session.data?.user.id;

	const [systemSettings] = await db
		.select()
		.from(settings)
		.where(eq(settings.name, "evaluation"));

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

			<div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-4">
				<Card className="mx-auto w-full flex-grow">
					<CardContent className="space-y-6">
						<a
							href="/"
							className="flex flex-col items-center hover:bg-gray-100 transition"
						>
							<div className="text-blue-600 mb-2"><Home /></div>
							<span className="text-sm font-medium text-gray-700">Home</span>
						</a>
					</CardContent>
				</Card>
				<Card className="mx-auto w-full flex-grow">
					<CardContent className="space-y-6">
						<a
							href="/qr-code"
							className="flex flex-col items-center hover:bg-gray-100 transition"
						>
							<div className="text-blue-600 mb-2"><QrCode /></div>
							<span className="text-sm font-medium text-gray-700">QR Code</span>
						</a>
					</CardContent>
				</Card>
				<Card className="mx-auto w-full flex-grow">
					<CardContent className="space-y-6">
						<a
							href="/schedule"
							className="flex flex-col items-center hover:bg-gray-100 transition"
						>
							<div className="text-blue-600 mb-2"><Calendar /></div>
							<span className="text-sm font-medium text-gray-700">Event Schedule</span>
						</a>
					</CardContent>
				</Card>
				<Card className="mx-auto w-full flex-grow">
					<CardContent className="space-y-6">
						<a
							target="_blank"
							href="https://heyzine.com/flip-book/ad312031f8.html?fbclid=IwY2xjawNDsA5leHRuA2FlbQIxMABicmlkETFFblR0dVpvRXZraXJsUXdQAR5Fgwau9z2qJQr861csObYsxcaz6Vicc9Gp92yK-XbFZcBz3vu7Az5jMHRbLA_aem_ohrn_Q7AHdD1k9t7LKSLhQ"
							className="flex flex-col items-center hover:bg-gray-100 transition"
						>
							<div className="text-blue-600 mb-2"><Gift /></div>
							<span className="text-sm font-medium text-gray-700">Souvenir</span>
						</a>
					</CardContent>
				</Card>
				<Card className="mx-auto w-full flex-grow">
					<CardContent className="space-y-6">
						<a
							href={`/session/${userId}`}
							className="flex flex-col items-center hover:bg-gray-100 transition"
						>
							<div className="text-blue-600 mb-2"><CheckSquare /></div>
							<span className="text-sm font-medium text-gray-700">Attended Sessions</span>
						</a>
					</CardContent>
				</Card>
				{systemSettings && systemSettings.value == true ? (<>
					<Card className="mx-auto w-full flex-grow">
						<CardContent className="space-y-6">
							<a
								href={`/evaluation/${userId}`}
								className="flex flex-col items-center hover:bg-gray-100 transition"
							>
								<div className="text-blue-600 mb-2"><Clipboard /></div>
								<span className="text-sm font-medium text-gray-700">Evaluation</span>
							</a>
						</CardContent>
					</Card>
					<Card className="mx-auto w-full flex-grow">
						<CardContent className="space-y-6">
							<a
								href={`/certificate/${userId}`}
								className="flex flex-col items-center hover:bg-gray-100 transition"
							>
								<div className="text-blue-600 mb-2"><Award /></div>
								<span className="text-sm font-medium text-gray-700">Certificate</span>
							</a>
						</CardContent>
					</Card>
				</>) : (<></>)}
			</div>
		</div>
	);

}
