"use client";

import { TerminalSelect } from "./terminal-select";
import { useLogStream } from "@/features/logs/hooks/use-log-stream";
import { LOG_GROUPS } from "@/features/shared/lib/logger";
import { useMemo } from "react";
import type { QrCodeLog } from "@/features/logs/types/qr-code-log";
import { QRScanActionEnum } from "@/types/enums/QRScanActionEnum";
import { LogIn, DoorOpen } from "lucide-react";
import { useState } from "react";
import {
	VALID_TERMINAL_IDS,
	type ConfirmationData,
} from "@/features/qr-code/components/scanner/types/confirmation-data";
import { TerminalHistory } from "./terminal-history";

export type FullQrLog = { content: { context: QrCodeLog; time: string } };

export function TerminalPage() {
	const query = useMemo(() => ({ group: LOG_GROUPS.QR }), []);
	const [terminal, setTerminal] = useState<ConfirmationData["terminalId"]>(
		VALID_TERMINAL_IDS[0],
	);

	const { logs } = useLogStream<FullQrLog>(query);

	function filterLogsByAction(
		logs: FullQrLog[],
		terminal: string,
		action: QRScanActionEnum,
	) {
		return logs
			.filter(
				(l) =>
					l.content.context?.confirmationData?.actionType === action &&
					l.content.context?.confirmationData?.terminalId === terminal,
			)
			.sort(
				(a, b) =>
					new Date(b.content.time).getTime() -
					new Date(a.content.time).getTime(),
			);
	}

	const checkInLogs = filterLogsByAction(
		logs,
		terminal,
		QRScanActionEnum.CHECK_IN,
	);
	const checkOutLogs = filterLogsByAction(
		logs,
		terminal,
		QRScanActionEnum.CHECK_OUT,
	);
	return (
		<div className="grid">
			<div className="mb-4 rounded-md border bg-accent p-6 py-4">
				<h1 className="col-span-full flex gap-1 font-bold text-3xl text-foreground">
					<span>Terminal</span>
					<TerminalSelect
						terminal={terminal}
						setTerminal={setTerminal}
						terminalIds={VALID_TERMINAL_IDS}
					/>
				</h1>
			</div>

			<div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
				<section className="rounded-md border bg-accent p-6">
					<h2 className="mb-4 flex items-center font-bold text-2xl">
						<div className="mr-3 rounded-sm bg-success/10 p-2">
							<LogIn className="text-success" />
						</div>
						Check-ins
					</h2>
					{checkInLogs.length ? (
						<TerminalHistory
							logs={checkInLogs}
							action={QRScanActionEnum.CHECK_IN}
						/>
					) : (
						<p className="text-muted-foreground text-sm">None so far.</p>
					)}
				</section>
				<section className="rounded-md border bg-accent p-6">
					<h2 className="mb-4 flex items-center font-bold text-2xl">
						<div className="mr-3 rounded-sm bg-destructive/10 p-2">
							<DoorOpen className="text-destructive" />
						</div>
						Check-outs
					</h2>
					{checkOutLogs.length ? (
						<TerminalHistory
							logs={checkOutLogs}
							action={QRScanActionEnum.CHECK_OUT}
						/>
					) : (
						<p className="text-muted-foreground text-sm">None so far.</p>
					)}
				</section>
			</div>
		</div>
	);
}
