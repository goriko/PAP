import { LOG_GROUPS } from "@/features/shared/lib/logger";
import type { TransformedLog } from "../types/transformed-log";

// TODO: Implement for the rest of these and dont use static placeholders
export function getSubtitleByLogGroup(log: TransformedLog): string {
	switch (log.group) {
		case LOG_GROUPS.QR: {
			const userName = log.context?.user?.name || "Unknown user";
			const confirmationData = log.context?.confirmationData;

			if (!confirmationData) return `${userName} - QR scan`;

			const parts = [userName];
			if (confirmationData.actionType) {
				const actionText =
					confirmationData.actionType === "check-in"
						? "Check-in"
						: confirmationData.actionType === "check-out"
							? "Check-out"
							: confirmationData.actionType.replace("-", " ");
				parts.push(actionText);
			}
			if (confirmationData.kitClaiming) parts.push("Kit claiming");

			return parts.join(" • ");
		}

		case LOG_GROUPS.SERVER:
			return "Server activity";

		case LOG_GROUPS.DATABASE:
			return "Database operation";

		case LOG_GROUPS.WEBSOCKET:
			return "WebSocket activity";

		case LOG_GROUPS.AUTH:
			return "Authentication event";

		case LOG_GROUPS.NOTIFICATIONS:
			return "Notification activity";

		case LOG_GROUPS.REGISTRATION:
			return "Registration activity";

		case LOG_GROUPS.KITS:
			return "Kit management";

		case LOG_GROUPS.ADMIN:
			return "Admin activity";

		case LOG_GROUPS.TEST:
			return "Test execution";

		case LOG_GROUPS.DEBUG:
			return "Debug information";

		default:
			return "Log activity";
	}
}
