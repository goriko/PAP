import {
	Table,
	TableBody,
	TableCell,
	TableRow,
} from "@/features/shared/components/base/table";

type FullQrLog = {
	content: {
		context: {
			user: {
				userId: string;
				name?: string;
				email?: string;
				photoUrl?: string;
				[key: string]: any;
			};
			confirmationData: {
				event: string;
				hasClaimedKit?: boolean;
				actionType: string;
				[key: string]: any;
			};
			[key: string]: any;
		};
		time: string;
	};
};

export function TerminalBadgeNewest({
	log,
	allLogs = [],
}: {
	log: FullQrLog;
	allLogs?: FullQrLog[];
}) {
	const user = log.content.context.user;
	const { email, userId, photoUrl, ...userDetails } = user;
	const { event, hasClaimedKit, actionType } = log.content.context.confirmationData;

	// User is already checked in if there is any previous check-in for the same user and event (regardless of terminal)
	const alreadyCheckedIn = allLogs.some(
		(l) =>
			l.content.context.user.userId === userId &&
			l.content.context.confirmationData.event === event &&
			l.content.context.confirmationData.actionType === "check-in" &&
			new Date(l.content.time) < new Date(log.content.time)
	);

	const rows = {
		...userDetails,
		event,
		actionType,
		time: `${new Date(log.content.time).toLocaleDateString()} ${new Date(log.content.time).toLocaleTimeString()}`,
	};
	const userInitial = userDetails.name?.charAt(0)?.toUpperCase() ?? "?";

	return (
		<div className="flex w-full flex-wrap justify-center gap-4 rounded-md border bg-background p-4">
			<div className="flex-shrink-0">
				{photoUrl ? (
					<img
						src={photoUrl}
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
								} else if (value !== null && value !== undefined) {
									displayValue = String(value);
								}
								// Only show event row, and after it, show kit claim status if available
								if (key === "event") {
									return (
										<>
											<TableRow key={key} className="[&>:not(:last-child)]:border-r">
												<TableCell className="py-2">{displayValue}</TableCell>
											</TableRow>
											{typeof hasClaimedKit === 'boolean' && (
												<TableRow key="kit-status" className="[&>:not(:last-child)]:border-r">
													<TableCell className="py-2">
														{hasClaimedKit ? "✅ Kit has been claimed" : "❌ Kit not claimed"}
													</TableCell>
												</TableRow>
											)}
										</>
									);
								}
								// Hide any boolean kit status row (true/false)
								if (key === "hasClaimedKit" || key === "kitClaiming") {
									return null;
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
