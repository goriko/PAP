import type { Log } from "@/types/entities/logs.entity";
import { Users, QrCode, Activity, Shield } from "lucide-react";
import { LOG_GROUPS, Logger } from "../../shared/lib/logger";

export interface TransformedLog {
	id: number;
	status: string;
	heading: string;
	group: string;
	time: string;
	date: string;
	context: any;
}

export const LOG_TABS = [
	{
		id: LOG_GROUPS.REGISTRATION,
		label: "Registration Logs",
		icon: Users,
		description: "User registration and onboarding activities",
		color: "bg-analytics-primary",
	},
	{
		id: LOG_GROUPS.QR,
		label: "QR Scanning Logs",
		icon: QrCode,
		description: "QR code scanning and verification events",
		color: "bg-success",
	},
	{
		id: LOG_GROUPS.KITS,
		label: "Kits",
		icon: Activity,
		description: "Event kits claiming",
		color: "bg-analytics-warning",
	},
	{
		id: LOG_GROUPS.ADMIN,
		label: "Admin Activity Logs",
		icon: Shield,
		description: "Administrative actions and system changes",
		color: "bg-analytics-danger",
	},
];

export function transformLogsForComponents(logs: Log[]): TransformedLog[] {
	return logs.map((log) => ({
		id: log.id,
		status: Logger.getLevelName(log.content.level),
		heading: log.content.msg || "No message",
		group: log.content.group || "unknown",
		time: new Date(log.content.time).toLocaleTimeString(),
		date: new Date(log.content.time).toLocaleDateString(),
		context: log.content.context,
	}));
}
