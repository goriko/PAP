import type { FullQrLog } from "../terminal-page";

export function TerminalBadgeSmall({ log }: { log: FullQrLog }) {
	const user = log.content.context.user;
	return (
		<div className="flex flex-col items-center gap-2 rounded-md border border-border bg-accent p-4">
			<p className="font-semibold">{user.name}</p>
			<p className="text-muted-foreground">{user.email}</p>
			<p className="text-muted-foreground text-sm">
				{new Date(log.content.time).toLocaleTimeString()}
			</p>
		</div>
	);
}
