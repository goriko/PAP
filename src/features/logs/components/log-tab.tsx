import { useState, useMemo, useCallback } from "react";
import { useLogStream } from "@/features/logs/hooks/use-log-stream";
import { Card, CardContent } from "@/features/shared/components/base/card";
import { Database } from "lucide-react";
import { transformLogsForComponents } from "../types/transformed-log";
import LogsTable from "./logs-table";
import LogsCards from "./logs-cards";
import Pagination from "./pagination";
import TestButtons from "./test-buttons";
import LogsHeader from "./logs-header";
import StatsCards from "./stats-cards";
import LogsFilters from "./logs-filters";
import type { Log } from "@/types/entities/logs.entity";

interface LogTabProps {
	group: string;
}

export default function LogTab({ group }: LogTabProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const logsPerPage = 10;

	const query = useMemo(
		() => ({
			group,
		}),
		[group],
	);

	const { logs } = useLogStream<Log>(query);

	const filteredLogs = useMemo(() => {
		if (!searchQuery) return logs;
		return logs.filter(
			(log) =>
				log.content.msg?.toLowerCase().includes(searchQuery.toLowerCase()) ||
				log.content.group.toLowerCase().includes(searchQuery.toLowerCase()),
		);
	}, [logs, searchQuery]);

	const paginatedLogs = useMemo(() => {
		const startIndex = (currentPage - 1) * logsPerPage;
		return filteredLogs.slice(startIndex, startIndex + logsPerPage);
	}, [filteredLogs, currentPage]);

	const transformedLogs = useMemo(
		() => transformLogsForComponents(paginatedLogs),
		[paginatedLogs],
	);

	const handleSearch = useCallback((query: string) => {
		setSearchQuery(query);

		// Reset to first page when searching
		setCurrentPage(1);
	}, []);

	return (
		<div className="space-y-4">
			<LogsHeader group={group} logsCount={logs.length} />
			<TestButtons group={group} />
			<StatsCards logs={filteredLogs} />
			<LogsFilters onSearch={handleSearch} />

			{filteredLogs.length === 0 ? (
				<Card>
					<CardContent className="p-8 text-center">
						<Database className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
						<p className="text-muted-foreground">
							{searchQuery
								? "No logs match your search"
								: "No logs yet for this group"}
						</p>
						<p className="mt-1 text-muted-foreground text-sm">
							{!searchQuery &&
								"Use the test buttons above to generate some logs"}
						</p>
					</CardContent>
				</Card>
			) : (
				<>
					<LogsTable logs={transformedLogs} />
					<LogsCards logs={transformedLogs} />
					<Pagination
						currentPage={currentPage}
						totalResults={filteredLogs.length}
						resultsPerPage={logsPerPage}
						onPrevious={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
						onNext={() => setCurrentPage((prev) => prev + 1)}
					/>
				</>
			)}
		</div>
	);
}
