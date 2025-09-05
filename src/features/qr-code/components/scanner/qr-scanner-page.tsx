"use client";

import { useState, useEffect } from "react";
import { decryptUserData } from "@/features/qr-code/lib/encryption";
import { QRScannerHeader } from "@/features/qr-code/components/scanner/qr-scanner-header";
import { CameraStatusCard } from "@/features/qr-code/components/scanner/camera-status-card";
import { ErrorCard } from "@/features/qr-code/components/scanner/error-card";
import { ScannerCard } from "@/features/qr-code/components/scanner/scanner-card";
import { TroubleshootingCard } from "@/features/qr-code/components/scanner/troubleshooting-card";
import { ConfirmationSheet } from "@/features/qr-code/components/scanner/confirmation-sheet";
import { LOG_GROUPS, Logger } from "@/features/shared/lib/logger";
import { QRScanActionEnum } from "@/types/enums/QRScanActionEnum";
import SuccessCard from "@/features/qr-code/components/scanner/success-card";
import type { ScanResult } from "@/features/qr-code/components/scanner/types/scan-result";
import {
	VALID_TERMINAL_IDS,
	type ConfirmationData,
} from "@/features/qr-code/components/scanner/types/confirmation-data";
import { QrCodeLogSchema } from "@/features/logs/types/qr-code-log";
import { useClaimUserKit } from "./data/use-claim-user-kit";
import { toast } from "sonner";

export function QRScannerPage() {
	const [scanResult, setScanResult] = useState<ScanResult | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [cameraReady, setCameraReady] = useState(false);
	const [permissionStatus, setPermissionStatus] = useState<string>("checking");
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [scannerActive, setScannerActive] = useState(true);

	const [confirmationData, setConfirmationData] = useState<ConfirmationData>({
		actionType: QRScanActionEnum.CHECK_IN,
		event: "",
		terminalId: VALID_TERMINAL_IDS[0],
		kitClaiming: false,
	});

	const [isProcessing, setIsProcessing] = useState(false);

	const mutation = useClaimUserKit();

	// Check camera permissions on component mount
	useEffect(() => {
		const checkCameraPermission = async () => {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({
					video: true,
				});
				stream.getTracks().forEach((track) => track.stop());

				setPermissionStatus("granted");
				setCameraReady(true);
			} catch (err) {
				Logger.error("Camera permission error:", { err });
				setPermissionStatus("denied");
				setError(`Camera access denied: ${err}`);
			}
		};

		checkCameraPermission();
	}, []);

	const handleScanResult = (detectedCodes: any[]) => {
		if (!scannerActive || showConfirmation || showSuccess) return;

		if (detectedCodes && detectedCodes.length > 0) {
			const firstCode = detectedCodes[0];

			try {
				const decryptedData = decryptUserData(firstCode.rawValue);

				const result: ScanResult = {
					rawData: firstCode.rawValue,
					decryptedData,
					timestamp: new Date(),
				};

				setScanResult(result);
				setShowConfirmation(true);
				setScannerActive(false);
				setError(null);
			} catch (e) {
				handleScanError(e);
			}
		}
	};

	const handleScanError = (error: unknown) => {
		Logger.error("QR Scanner error:", { error });

		const errorMessage =
			error && typeof error === "object" && "message" in error
				? (error as { message: string }).message
				: "Unknown scanner error";

		setError(`Scanner error: ${errorMessage}`);
	};

	const handleConfirmAction = async () => {
		if (!scanResult) return;

		setIsProcessing(true);

		try {
			// Push log to database with user details & confirmation status
			const context = QrCodeLogSchema.parse({
				user: scanResult.decryptedData,
				confirmationData,
			});

			Logger.info(`QR Scanned at Terminal ${confirmationData.terminalId}`, {
				group: LOG_GROUPS.QR,
				context,
			});

			mutation.mutate({
				userId: scanResult.decryptedData.userId,
				hasClaimedKit: confirmationData.kitClaiming,
			});

			toast.success("Action processed successfully!");
			setShowConfirmation(false);
			setShowSuccess(true);
			setScanResult(null);
		} catch (error) {
			Logger.error("Error processing action:", { error });
			setError("Failed to process the action. Please try again.");
		} finally {
			setIsProcessing(false);
		}
	};

	const handleCancelScan = () => {
		setShowConfirmation(false);
		setScannerActive(true);
		setScanResult(null);
		setConfirmationData((prev) => ({
			actionType: QRScanActionEnum.CHECK_IN,
			event: prev.event,
			terminalId: prev.terminalId,
			kitClaiming: false,
		}));
	};

	const handleScanNext = () => {
		setShowSuccess(false);
		setScannerActive(true);
		setError(null);
		setConfirmationData((prev) => ({
			actionType: QRScanActionEnum.CHECK_IN,
			event: prev.event,
			terminalId: prev.terminalId,
			kitClaiming: false,
		}));
	};

	const handleUpdateConfirmationData = (data: Partial<ConfirmationData>) => {
		setConfirmationData((prev) => ({ ...prev, ...data }));
	};

	const handleUpdateShowConfirmation = (isOpen: boolean) => {
		if (!isOpen) {
			handleCancelScan();
		}

		setShowConfirmation(isOpen);
	};

	return (
		<div className="col-span-full flex flex-col">
			<div className="flex flex-col space-y-4 p-4 sm:space-y-6 sm:p-6">
				<QRScannerHeader />

				<CameraStatusCard
					permissionStatus={permissionStatus}
					{...confirmationData}
				/>

				{error && <ErrorCard error={error} />}
				{showSuccess && <SuccessCard handleScanNext={handleScanNext} />}

				<ScannerCard
					cameraReady={cameraReady}
					permissionStatus={permissionStatus}
					onScan={handleScanResult}
					onError={handleScanError}
					scannerActive={scannerActive}
					showSuccess={showSuccess}
				/>

				<TroubleshootingCard />

				<ConfirmationSheet
					open={showConfirmation}
					onOpenChange={handleUpdateShowConfirmation}
					scanResult={scanResult}
					confirmationData={confirmationData}
					onUpdateData={handleUpdateConfirmationData}
					onConfirm={handleConfirmAction}
					onCancel={handleCancelScan}
					isProcessing={isProcessing}
				/>
			</div>
		</div>
	);
}
