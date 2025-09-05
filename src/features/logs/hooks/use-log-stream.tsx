import { useState, useEffect } from "react";
import { io, type Socket } from "socket.io-client";
import { rpc } from "@/infrastructure/server/rpc";
import type { GetLogsQueryParams } from "@/types/entities/logs.entity";
import { Logger } from "@/features/shared/lib/logger";
import type { Log } from "@/types/entities/logs.entity";
import { env } from "@/config/env.client";

/**
 * You can pass your own log types via `<T>` for soft type-safety.
 * NOTE: It's not enforced on the server though, so you need to double-check whether `logs` actually conform to your type.
 *
 * @param query the query params to GET /logs for the initial logs before streaming new ones
 * @returns
 */
export function useLogStream<T = Log>(
	query: GetLogsQueryParams & { group: string },
) {
	const [logs, setLogs] = useState<T[]>([]);
	const [socket, setSocket] = useState<Socket | null>(null);

	useEffect(() => {
		const fetchInitial = async () => {
			const res = await rpc.logs.$get({
				query: {
					...query,
					limit: query.limit ? String(query.limit) : undefined,
				},
			});

			if (!res.ok) {
				Logger.debug("Failed to fetch initial logs.");
				setLogs([]);
			} else {
				const fetchedLogs = await res.json();
				setLogs(fetchedLogs);
			}
		};

		fetchInitial();

		const socket = io(env.NEXT_PUBLIC_API_BASE_URL, {
			transports: ["websocket"],
		});

		// Listen for new logs from the group
		socket.on(query.group, (newLog: T) => {
			setLogs((prev) => [...prev, newLog]);
		});

		setSocket(socket);

		return () => {
			socket.disconnect();
		};
	}, [query.group, query]);

	return { logs, socket };
}
