import { Button } from "@/features/shared/components/base/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/features/shared/components/base/sheet";
import { Separator } from "@/features/shared/components/base/separator";
import { ScannedDataDisplay } from "./scanned-data-display";
import { ActionForm } from "./action-form";
import type { ScanResult } from "./types/scan-result";
import type { ConfirmationData } from "./types/confirmation-data";

interface ConfirmationSheetProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	scanResult: ScanResult | null;
	confirmationData: ConfirmationData;
	onUpdateData: (data: Partial<ConfirmationData>) => void;
	onConfirm: () => void;
	onCancel: () => void;
	isProcessing: boolean;
}

export function ConfirmationSheet({
	open,
	onOpenChange,
	scanResult,
	confirmationData,
	onUpdateData,
	onConfirm,
	onCancel,
	isProcessing,
}: ConfirmationSheetProps) {
	const isFormValid = confirmationData.event && confirmationData.terminalId;

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent
				side="right"
				className="flex h-full w-full flex-col p-6 sm:max-w-lg"
			>
				<SheetHeader className="flex-shrink-0 p-2">
					<SheetTitle className="text-lg">Confirm Scan Result</SheetTitle>
					<SheetDescription>
						Review the scanned information and complete the action.
					</SheetDescription>
				</SheetHeader>

				<div className="flex-1 overflow-y-auto">
					<div className="space-y-6 p-1">
						{scanResult && <ScannedDataDisplay scanResult={scanResult} />}

						<Separator />

						<ActionForm
							confirmationData={confirmationData}
							onUpdateData={onUpdateData}
						/>
					</div>
				</div>

				<div className="flex-shrink-0 border-t pt-4">
					<div className="flex gap-3">
						<Button
							variant="outline"
							onClick={onCancel}
							className="flex-1"
							disabled={isProcessing}
						>
							Cancel
						</Button>
						<Button
							onClick={onConfirm}
							className="flex-1"
							disabled={!isFormValid || isProcessing}
						>
							{isProcessing
								? "Processing..."
								: `Confirm ${confirmationData.actionType}`}
						</Button>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
