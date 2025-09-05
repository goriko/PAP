import { TableCell, TableRow } from "@/features/shared/components/base/table";
import {
	Dialog,
	DialogTrigger,
} from "@/features/shared/components/base/dialog";
import { Clock } from "lucide-react";
import { useState } from "react";
import StatusBadge from "./status-badge";
import LogDetailsModal from "./log-details-modal";
import type { TransformedLog } from "../types/transformed-log";
import { getSubtitleByLogGroup } from "../lib/getSubtitleByLogGroup";

interface LogRowProps {
	log: TransformedLog;
}

export default function LogRow({ log }: LogRowProps) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<TableRow className="cursor-pointer transition-colors hover:bg-muted/50">
					<TableCell className="p-4">
						<StatusBadge status={log.status} />
					</TableCell>
					<TableCell className="p-4">
						<div>
							<div className="font-medium text-foreground">{log.heading}</div>
							<div className="text-foreground text-sm">
								{getSubtitleByLogGroup(log)}
							</div>
						</div>
					</TableCell>
					<TableCell className="p-4 text-foreground">
						<div className="flex items-center space-x-2">
							<Clock className="h-4 w-4 text-muted-foreground" />
							<span>{log.time}</span>
						</div>
					</TableCell>
					<TableCell className="p-4 text-foreground">{log.date}</TableCell>
				</TableRow>
			</DialogTrigger>
			<LogDetailsModal log={log} />
		</Dialog>
	);
}
