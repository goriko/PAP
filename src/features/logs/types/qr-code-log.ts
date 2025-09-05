import { z } from "zod";
import { QrUserDataSchema } from "@/features/qr-code/components/scanner/types/qr-user-data";
import { ConfirmationDataSchema } from "@/features/qr-code/components/scanner/types/confirmation-data";

export const QrCodeLogSchema = z.object({
	user: QrUserDataSchema,
	confirmationData: ConfirmationDataSchema,
});

export type QrCodeLog = z.infer<typeof QrCodeLogSchema>;
