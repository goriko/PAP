import {
	Table,
	TableBody,
	TableCell,
	TableRow,
} from "@/features/shared/components/base/table";
import type { FullQrLog } from "../terminal-page";

export function TerminalBadgeNewest({
	log,
	allLogs = [],
}: {
	log: FullQrLog;
	allLogs?: FullQrLog[];
}) {
	const user = log.content.context.user;
	const { email, userId, photoUrl, ...userDetails } = user;
	const { event, kitClaiming, actionType } =
		log.content.context.confirmationData;

	const alreadyCheckedIn = allLogs.some(
		(l) =>
			l.content.context.user.userId === userId &&
			l.content.context.confirmationData.event === event &&
			l.content.context.confirmationData.actionType === "check-in" &&
			new Date(l.content.time) < new Date(log.content.time),
	);

	const rows = {
		...userDetails,
		event,
		kitClaiming,
		actionType,
		time: `${new Date(log.content.time).toLocaleDateString()} ${new Date(log.content.time).toLocaleTimeString()}`,
	};
	const userInitial = userDetails.name?.charAt(0)?.toUpperCase() ?? "?";

	return (
		<div className="flex w-full flex-wrap justify-center gap-4 rounded-md border bg-background p-4">
			<div className="flex-shrink-0">
				{photoUrl ? (
					<img
						src="{photoUrl}"
						alt="User Photo"
						className="h-32 w-32 rounded-md border object-cover"
					/>
				) : (
					<div className="flex h-32 w-32 items-center justify-center rounded-md border bg-muted font-semibold text-4xl text-muted-foreground">
						{userInitial}
					</div>
				)}
			</div>

			<div className="flex-grow overflow-auto">
				<div className="overflow-hidden rounded-md border bg-background">
					<Table>
						<TableBody>
							{Object.entries(rows).map(([key, value]) => {
								let displayValue: string | boolean | number = "—";

								if (
									key === "kitClaiming" &&
									!(
										event.toLowerCase() === "main event" ||
										event.toLowerCase() === "pre-convention"
									)
								) {
									return null;
								}

								if (key === "actionType") {
									if (value === "check-in") {
										if (alreadyCheckedIn) {
											displayValue = "👤 User has already checked in";
										} else {
											displayValue = `✅ Successfully checked in to ${event}!`;
										}
									} else if (value === "check-out") {
										displayValue = "👋 User has checked out";
									} else {
										displayValue = String(value);
									}
								} else if (key === "kitClaiming") {
									displayValue = value
										? "✅ Kit has been claimed"
										: "❌ Kit not claimed";
								} else if (value !== null && value !== undefined) {
									displayValue =
										typeof value === "boolean"
											? value.toString()
											: String(value);
								}

								return (
									<TableRow
										key={key}
										className="[&>:not(:last-child)]:border-r"
									>
										<TableCell className="py-2">{displayValue}</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
}
