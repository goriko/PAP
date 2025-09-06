"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/features/shared/components/base/card";
import { QrCode } from "lucide-react";
import { QRCodeDisplay } from "./qr-code-display";
import { authClient } from "@/infrastructure/auth/auth-client";

export function QRCodeGenerator() {
	const { data: session } = authClient.useSession();
	const [qrValue, setQrValue] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchQr = async () => {
			if (!session) return;

			try {
				const res = await fetch("/api/qr", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						userId: session.user.id,
						userData: {
							email: session.user.email,
							name: session.user.name,
							userId: session.user.id,
						},
					}),
				});

				const data = await res.json();
				setQrValue(data.qrData);
			} catch (err) {
				console.error("Failed to fetch QR:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchQr();
	}, [session]);

	if (!session) {
		return (
			<div className="flex h-full items-center justify-center">
				<p className="text-muted-foreground">No session detected yet...</p>
			</div>
		);
	}

	if (loading) {
		return (
			<div className="flex h-full items-center justify-center">
				<p className="text-muted-foreground">Loading QR...</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col space-y-6">
			<div className="space-y-1">
				<div className="flex items-center gap-2">
					<QrCode className="size-8" />
					<h1 className="font-bold text-2xl tracking-tight">
						QR Code Generator
					</h1>
				</div>
				<p className="text-muted-foreground">
					Your QR code has been generated automatically for event access.
				</p>
			</div>

			<Card className="mx-auto w-full flex-grow">
				<CardContent className="space-y-6">
					<QRCodeDisplay isGenerated={!!qrValue} qrValue={qrValue} />
				</CardContent>
			</Card>
		</div>
	);
}
