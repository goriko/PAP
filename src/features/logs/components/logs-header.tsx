import { Database } from "lucide-react";
import { LOG_TABS } from "../types/transformed-log";

interface LogsHeaderEnhancedProps {
	group: string;
	logsCount: number;
}

export default function LogsHeader({
	group,
	logsCount,
}: LogsHeaderEnhancedProps) {
	const tab = LOG_TABS.find((t) => t.id === group);
	const Icon = tab?.icon || Database;

	return (
		<div className="flex flex-col space-y-3 text-foreground sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
			<div className="flex items-center space-x-3">
				<Icon className="h-5 w-5 sm:h-6 sm:w-6" />
				<div>
					<h1 className="font-bold text-xl sm:text-2xl">
						{tab?.label || "Logs"}
					</h1>
					<p className="text-muted-foreground text-sm">{tab?.description}</p>
				</div>
			</div>
			<div className="flex items-center space-x-3">
				<div className="flex items-center gap-2">
					<div className="h-2 w-2 animate-pulse rounded-full bg-success" />
					<span className="font-medium text-sm text-success">
						Live ({logsCount})
					</span>
				</div>
			</div>
		</div>
	);
}
