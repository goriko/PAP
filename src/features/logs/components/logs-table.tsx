import { Card, CardContent } from "@/features/shared/components/base/card";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/features/shared/components/base/table";
import LogRow from "./log-row";
import type { TransformedLog } from "../types/transformed-log";

interface LogsTableProps {
	logs: TransformedLog[];
}

export default function LogsTable({ logs }: LogsTableProps) {
	return (
		<Card className="hidden border-border sm:block dark:bg-card">
			<CardContent className="p-0">
				<div className="overflow-x-auto">
					<Table className="min-w-[800px]">
						<TableHeader>
							<TableRow>
								<TableHead className="p-4 font-medium text-foreground">
									Status
								</TableHead>
								<TableHead className="p-4 font-medium text-foreground">
									Data
								</TableHead>
								<TableHead className="p-4 font-medium text-foreground">
									Time
								</TableHead>
								<TableHead className="p-4 font-medium text-foreground">
									Date
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{logs.map((log) => (
								<LogRow key={log.id} log={log} />
							))}
						</TableBody>
					</Table>
				</div>
			</CardContent>
		</Card>
	);
}
