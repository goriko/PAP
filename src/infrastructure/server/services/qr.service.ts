import db from "@/infrastructure/db";
import { user } from "@/infrastructure/db/schema/auth.schema";
import { eq } from "drizzle-orm";
import { encryptUserData } from "../../../features/qr-code/lib/encryption";

export class QrService {
	public async getOrCreateQr(userId: string, userData: any) {
		// Find user first
		const [selectedUser] = await db
			.select()
			.from(user)
			.where(eq(user.id, userId))
			.limit(1);

		if (!selectedUser) {
			throw new Error(`User not found: ${userId}`);
		}

		if (selectedUser.rawQrData) {
			return selectedUser.rawQrData;
		}

		// Generate new QR
		const qrValue = encryptUserData(userData);

		const updatedUsers = await db
			.update(user)
			.set({ rawQrData: qrValue })
			.where(eq(user.id, userId))
			.returning();

		if (!updatedUsers || updatedUsers.length === 0) {
			throw new Error(`Failed to update QR for user: ${userId}`);
		}

		return updatedUsers[0].rawQrData;
	}
}
