import { TerminalBadgeNewest } from "./terminal-badge-newest";
import { TerminalBadgeSmall } from "./terminal-badge-small";
import { Clock } from "lucide-react";
import { QRScanActionEnum } from "@/types/enums/QRScanActionEnum";
import { cn } from "@/features/shared/lib/utils";
import type { FullQrLog } from "../terminal-page";

export function TerminalHistory({
	logs,
	action,
}: {
	logs: FullQrLog[];
	action: QRScanActionEnum;
}) {
	const NUM_LOGS_TO_SHOW = 6;

	// Exclude the first log (the recent scan)
	const pastLogs = logs.slice(1, NUM_LOGS_TO_SHOW + 1);

	return (
		<div>
			<TerminalBadgeNewest log={logs[0]} />
			<h3 className="mt-6 mb-4 flex items-center font-bold text-2xl">
				<div
					className={cn("mr-3 rounded-sm bg-success/10 p-2", {
						"bg-success/10": action === QRScanActionEnum.CHECK_IN,
						"bg-destructive/10": action === QRScanActionEnum.CHECK_OUT,
					})}
				>
					<Clock
						className={cn("text-success", {
							"text-success": action === QRScanActionEnum.CHECK_IN,
							"text-destructive": action === QRScanActionEnum.CHECK_OUT,
						})}
					/>
				</div>
				Past Scans
			</h3>
			<div className="flex flex-wrap gap-4">
				{pastLogs.length ? (
					pastLogs.map((l, i) => (
						<TerminalBadgeSmall
							key={`${i}-${l.content.context.user.userId}-${l.content.context.confirmationData.actionType}`}
							log={l}
						/>
					))
				) : (
					<p className="text-muted-foreground text-sm">None so far.</p>
				)}
			</div>
		</div>
	);
}
