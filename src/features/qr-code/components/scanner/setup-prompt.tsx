import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/features/shared/components/base/dialog";
import { Button } from "@/features/shared/components/base/button";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/features/shared/components/base/select";
import {
	VALID_TERMINAL_IDS,
	VALID_EVENT_NAMES,
} from "./types/confirmation-data";

type SetupPromptProps = {
	open: boolean;
	event: string;
	terminalId: string;
	onUpdate: (data: { event: string; terminalId: string }) => void;
	onConfirm: () => void;
};

export function SetupPrompt({
	open,
	event,
	terminalId,
	onUpdate,
	onConfirm,
}: SetupPromptProps) {
	const handleConfirm = () => {
		onUpdate({ event, terminalId });
		onConfirm();
	};
	return (
		<Dialog open={open}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Setup Scanner</DialogTitle>
				</DialogHeader>

				{/* Event select */}
				<div className="space-y-2">
					<label className="font-medium text-sm">Event Name</label>
					<Select
						value={event}
						onValueChange={(value) => onUpdate({ event: value, terminalId })}
					>
						<SelectTrigger>
							<SelectValue placeholder="Choose event" />
						</SelectTrigger>
						<SelectContent>
							{VALID_EVENT_NAMES.map((ename) => (
								<SelectItem key={ename} value={ename}>
									{ename}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{/* Terminal ID select */}
				<div className="mt-4 space-y-2">
					<label className="font-medium text-sm">Select Terminal</label>
					<Select
						value={terminalId}
						onValueChange={(value) => onUpdate({ event, terminalId: value })}
					>
						<SelectTrigger>
							<SelectValue placeholder="Choose terminal" />
						</SelectTrigger>
						<SelectContent>
							{VALID_TERMINAL_IDS.map((tid) => (
								<SelectItem key={tid} value={tid}>
									{tid}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<DialogFooter className="mt-6">
					<Button disabled={!event || !terminalId} onClick={handleConfirm}>
						Continue
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
