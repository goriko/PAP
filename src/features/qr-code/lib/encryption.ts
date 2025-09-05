import CryptoJS from "crypto-js";
import { env } from "@/config/env.client";
import { Logger } from "@/features/shared/lib/logger";
import {
	type QrUserData,
	QrUserDataSchema,
} from "../components/scanner/types/qr-user-data";

const SECRET_KEY = env.NEXT_PUBLIC_QR_ENCRYPTION_SECRET;

export const encryptUserData = (data: QrUserData): string => {
	try {
		return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
	} catch (error) {
		Logger.error("Encryption failed", { error });

		return "Invalid User data";
	}
};

export const decryptUserData = (encryptedData: string): QrUserData => {
	const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
	const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

	if (!decryptedString) {
		throw new Error("Decryption resulted in empty string");
	}
	const decryptedUserData = QrUserDataSchema.parse(JSON.parse(decryptedString));

	return decryptedUserData;
};
