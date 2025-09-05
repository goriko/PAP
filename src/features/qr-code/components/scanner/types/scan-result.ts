import type { QrUserData } from "./qr-user-data";

export interface ScanResult {
	rawData: string;
	decryptedData: QrUserData;
	timestamp: Date;
}
