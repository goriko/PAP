import {
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/features/shared/components/base/dialog";
import { Clock, Calendar, FileText } from "lucide-react";
import StatusBadge from "./status-badge";
import type { TransformedLog } from "../types/transformed-log";

interface LogDetailsModalProps {
	log: TransformedLog;
}

export default function LogDetailsModal({ log }: LogDetailsModalProps) {
	return (
		<DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto rounded border-border bg-background">
			<DialogHeader>
				<DialogTitle className="flex items-center gap-2 text-foreground text-xl">
					<FileText className="h-8 w-8" />
					Log Details
				</DialogTitle>
			</DialogHeader>
			<StatusBadge status={log.status} />
			<div className="space-y-6 ">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<div className="font-medium text-foreground text-sm">ID</div>
						<div className="rounded border border-border bg-muted p-2 font-mono text-foreground text-sm">
							{log.id}
						</div>
					</div>
					<div className="space-y-2">
						<div className="font-medium text-foreground text-sm">Group</div>
						<div className="rounded border border-border bg-muted p-2 text-foreground text-sm">
							{log.group}
						</div>
					</div>
				</div>
				<div className="space-y-2">
					<div className="font-medium text-foreground text-sm">Event</div>
					<div className="rounded border border-border bg-muted p-3 text-foreground text-sm">
						{log.heading}
					</div>
				</div>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<div className="flex items-center gap-2 font-medium text-foreground text-sm">
							<Clock className="h-4 w-4 text-muted-foreground" />
							Time
						</div>
						<div className="rounded border border-border bg-muted p-2 text-foreground text-sm">
							{log.time}
						</div>
					</div>
					<div className="space-y-2">
						<div className="flex items-center gap-2 font-medium text-foreground text-sm">
							<Calendar className="h-4 w-4 text-muted-foreground" />
							Date
						</div>
						<div className="rounded border border-border bg-muted p-2 text-foreground text-sm">
							{log.date}
						</div>
					</div>
				</div>
				<div className="space-y-2">
					<div className="font-medium text-foreground text-sm">Context</div>
					<div className="rounded border border-border bg-muted p-3 text-foreground text-sm">
						<pre className="overflow-x-auto whitespace-pre-wrap font-mono text-xs">
							{log.context
								? JSON.stringify(log.context, null, 2)
								: "No context available"}
						</pre>
					</div>
				</div>
			</div>
		</DialogContent>
	);
}
