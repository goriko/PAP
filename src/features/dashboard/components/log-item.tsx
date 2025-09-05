import StatusBadge from "@/features/logs/components/status-badge";
import type { TransformedLog } from "@/features/logs/types/transformed-log";
import { Clock } from "lucide-react";

interface LogItemProps {
	log: TransformedLog;
}

export function LogItem({ log }: LogItemProps) {
	return (
		<div
			className={`grid grid-cols-12 gap-4 border-l-4 px-4 py-3 text-sm transition-colors hover:bg-muted/50`}
		>
			<div className="col-span-2">
				<StatusBadge status={log.status} />
			</div>
			<div className="col-span-4">
				<div className="font-medium">{log.heading}</div>
				<div className="text-muted-foreground text-xs">{log.group}</div>
			</div>
			<div className="col-span-4 flex items-center gap-1">
				<Clock className="h-3 w-3 text-muted-foreground" />
				{log.time}
			</div>
			<div className="col-span-2 text-muted-foreground">{log.time}</div>
		</div>
	);
}
