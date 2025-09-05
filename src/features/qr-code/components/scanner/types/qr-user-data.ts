import { z } from "zod";

export const QrUserDataSchema = z.object({
	userId: z.string(),
	name: z.string(),
	email: z.string().email(),
	// * Enable if photoUrl is provided
	// photoUrl: z.string().url(),
});

export type QrUserData = z.infer<typeof QrUserDataSchema>;
