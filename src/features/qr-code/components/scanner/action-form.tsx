import { Input } from "@/features/shared/components/base/input";
import { Label } from "@/features/shared/components/base/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/features/shared/components/base/select";
import { QRScanActionEnum } from "@/types/enums/QRScanActionEnum";
import {
	VALID_TERMINAL_IDS,
	type ConfirmationData,
} from "./types/confirmation-data";

interface ActionFormProps {
	confirmationData: ConfirmationData;
	onUpdateData: (data: Partial<ConfirmationData>) => void;
}

export function ActionForm({
	confirmationData,
	onUpdateData,
}: ActionFormProps) {
	return (
		<div className="space-y-4">
			<div className="flex items-end justify-between">
				<div className="space-y-2">
					<Label htmlFor="actionType">Action Type</Label>
					<Select
						value={confirmationData.actionType}
						onValueChange={(
							value: QRScanActionEnum.CHECK_IN | QRScanActionEnum.CHECK_OUT,
						) => onUpdateData({ actionType: value })}
					>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value={QRScanActionEnum.CHECK_IN}>
								Check In
							</SelectItem>
							<SelectItem value={QRScanActionEnum.CHECK_OUT}>
								Check Out
							</SelectItem>
						</SelectContent>
					</Select>
				</div>

				{confirmationData.actionType === "check-in" && (
					<div className="flex items-center space-x-2">
						<input
							type="checkbox"
							id="kitClaiming"
							checked={confirmationData.kitClaiming || false}
							onChange={(e) => onUpdateData({ kitClaiming: e.target.checked })}
							className="h-4 w-4 rounded border-border"
							aria-label="Kit claiming for registration events only"
						/>
						<Label htmlFor="kitClaiming" className="text-sm">
							Kit claiming
						</Label>
					</div>
				)}
			</div>
			<div className="space-y-2">
				<Label htmlFor="event">Event</Label>
				<Input
					id="event"
					placeholder="Enter event name"
					value={confirmationData.event}
					onChange={(e) => onUpdateData({ event: e.target.value })}
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="terminalId">Terminal ID</Label>
				<Select
					value={confirmationData.terminalId}
					onValueChange={(value) => onUpdateData({ terminalId: value })}
				>
					<SelectTrigger className="w-fit bg-card shadow-none">
						<SelectValue placeholder="??" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Select a Terminal</SelectLabel>
							{VALID_TERMINAL_IDS.map((tid) => (
								<SelectItem key={`terminal-select__${tid}`} value={tid}>
									{tid}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}
