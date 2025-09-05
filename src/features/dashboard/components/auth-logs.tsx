"use client";

import { useMemo } from "react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/features/shared/components/base/card";
import { User, Database } from "lucide-react";
import { LogItem } from "./log-item";
import { useLogStream } from "@/features/logs/hooks/use-log-stream";
import { transformLogsForComponents } from "@/features/logs/types/transformed-log";
import { LOG_GROUPS } from "@/features/shared/lib/logger";
import type { Log } from "@/types/entities/logs.entity";

export function AuthLogs() {
	const query = useMemo(
		() => ({
			group: LOG_GROUPS.REGISTRATION,
		}),
		[],
	);

	const { logs } = useLogStream<Log>(query);

	const transformedLogs = useMemo(
		() => transformLogsForComponents(logs.slice(0, 10)), // Show only the latest 10 logs
		[logs],
	);

	return (
		<Card className="border-border shadow-lg">
			<CardHeader className="px-8 pt-4">
				<CardTitle className="flex items-center gap-2">
					<User className="h-5 w-5" />
					Registration Logs
				</CardTitle>
			</CardHeader>
			<CardContent className="px-8 pb-4">
				<div className="space-y-1">
					<div className="overflow-x-auto">
						<div className="min-w-[640px]">
							<div className="grid grid-cols-12 gap-4 border-border border-b px-4 py-2 font-medium text-muted-foreground text-sm">
								<div className="col-span-2">Status</div>
								<div className="col-span-4">Message</div>
								<div className="col-span-4">Time</div>
								<div className="col-span-2">Group</div>
							</div>

							<div className="max-h-[340px] space-y-1 overflow-y-auto">
								{transformedLogs.length === 0 ? (
									<div className="flex flex-col items-center justify-center py-8 text-center">
										<Database className="mb-4 h-12 w-12 text-muted-foreground" />
										<p className="text-muted-foreground">
											No authentication logs yet
										</p>
										<p className="mt-1 text-muted-foreground text-sm">
											Logs will appear here when authentication events occur
										</p>
									</div>
								) : (
									transformedLogs.map((log) => (
										<LogItem key={log.id} log={log} />
									))
								)}
							</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
