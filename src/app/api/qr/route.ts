import { type NextRequest, NextResponse } from "next/server";
import { QrService } from "../../../infrastructure/server/services/qr.service";

const qrService = new QrService();

export async function POST(req: NextRequest) {
	try {
		const { userId, userData } = await req.json();
		const qrData = await qrService.getOrCreateQr(userId, userData);
		return NextResponse.json({ qrData });
	} catch (err) {
		console.error("QR API error:", err);
		return NextResponse.json(
			{ error: "Failed to generate QR" },
			{ status: 500 },
		);
	}
}
