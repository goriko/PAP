import { QRScanActionEnum } from "@/types/enums/QRScanActionEnum";
import { z } from "zod";

export const ConfirmationDataSchema = z.object({
	actionType: z.nativeEnum(QRScanActionEnum),
	event: z.string(),
	terminalId: z.string(),
	kitClaiming: z.boolean().optional().default(false),
});

export type ConfirmationData = z.infer<typeof ConfirmationDataSchema>;

export const VALID_TERMINAL_IDS: ConfirmationData["terminalId"][] = [
	"1",
	"2",
	"3",
	"4",
	"5",
];
