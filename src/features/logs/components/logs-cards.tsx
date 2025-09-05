import { Card, CardContent } from "@/features/shared/components/base/card";
import { Clock } from "lucide-react";
import StatusBadge from "./status-badge";
import type { TransformedLog } from "../types/transformed-log";
import { getSubtitleByLogGroup } from "../lib/getSubtitleByLogGroup";

interface LogsCardsProps {
	logs: TransformedLog[];
}

export default function LogsCards({ logs }: LogsCardsProps) {
	return (
		<div className="space-y-3 sm:hidden">
			{logs.map((log) => (
				<Card className="border-border" key={log.id}>
					<CardContent className="p-4">
						<div className="space-y-3">
							<div className="flex items-start justify-between">
								<div className="min-w-0 flex-1">
									<div className="truncate font-medium text-foreground">
										{log.heading}
									</div>
									<div className="truncate text-muted-foreground text-sm">
										{getSubtitleByLogGroup(log)}
									</div>
								</div>
								<div className="ml-3 flex-shrink-0">
									<StatusBadge status={log.status} />
								</div>
							</div>
							<div className="flex items-center justify-between text-sm">
								<div className="flex items-center space-x-1 text-muted-foreground">
									<Clock className="h-3 w-3 text-muted-foreground" />
									<span>{log.time}</span>
								</div>
								<div className="text-muted-foreground">Date {log.date}</div>
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
