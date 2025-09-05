import {
	Table,
	TableBody,
	TableCell,
	TableRow,
} from "@/features/shared/components/base/table";
import type { FullQrLog } from "../terminal-page";

export function TerminalBadgeNewest({ log }: { log: FullQrLog }) {
	const user = log.content.context.user;
	const { event } = log.content.context.confirmationData;
	const rows = {
		...user,
		event,
		time: `${new Date(log.content.time).toLocaleDateString()} ${new Date(log.content.time).toLocaleTimeString()}`,
	};

	return (
		<div className="flex">
			<div className="flex w-full flex-wrap justify-center gap-4 rounded-md border bg-background p-4">
				<div className="flex-grow overflow-auto">
					<div className="overflow-hidden rounded-md border bg-background">
						<Table>
							<TableBody>
								{Object.entries(rows).map(([key, value]) =>
									key === "photoUrl" ? null : (
										<TableRow
											key={key}
											className="[&>:not(:last-child)]:border-r"
										>
											<TableCell className="bg-muted/50 py-2 font-medium lowercase">
												{key}
											</TableCell>
											<TableCell className="py-2">{value}</TableCell>
										</TableRow>
									),
								)}
							</TableBody>
						</Table>
					</div>
				</div>
			</div>
		</div>
	);
}
