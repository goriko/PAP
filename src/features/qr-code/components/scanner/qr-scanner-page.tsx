"use client";

import { useState, useEffect, useRef } from "react";
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
import type { ConfirmationData } from "@/features/qr-code/components/scanner/types/confirmation-data";
import { QrCodeLogSchema } from "@/features/logs/types/qr-code-log";
import { useClaimUserKit } from "./data/use-claim-user-kit";
import { toast } from "sonner";
import { SetupPrompt } from "./setup-prompt";

export function QRScannerPage() {
	const [scanResult, setScanResult] = useState<ScanResult | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [cameraReady, setCameraReady] = useState(false);
	const [permissionStatus, setPermissionStatus] = useState<string>("checking");
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [scannerActive, setScannerActive] = useState(true);

	const eventRef = useRef<string>("");
	const terminalRef = useRef<string>("");
	const [confirmationData, setConfirmationData] = useState<ConfirmationData>({
		actionType: QRScanActionEnum.CHECK_IN,
		event: "",
		terminalId: "",
		kitClaiming: false,
		hasClaimedKit: false,
	});

	const [isProcessing, setIsProcessing] = useState(false);
	const [setupOpen, setSetupOpen] = useState(true);

	const mutation = useClaimUserKit();

	const handleQrScan = async (userId: string) => {
		try {
			const res = await fetch(`/user/${userId}`);
			const data = await res.json();

			const updatedData: ConfirmationData = {
				actionType: QRScanActionEnum.CHECK_IN,
				event: eventRef.current || confirmationData.event || "",
				terminalId: terminalRef.current || confirmationData.terminalId || "",
				hasClaimedKit: Boolean(data.hasClaimedKit),
				kitClaiming: Boolean(data.hasClaimedKit),
			};

			handleUpdateConfirmationData(updatedData);
			return updatedData;
		} catch (err) {
			Logger.error("Failed to fetch user data:", { err });
			setError("Failed to fetch user data. Please try again.");
			return null;
		}
	};

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

	const handleScanResult = async (detectedCodes: any[]) => {
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
				setError(null);
				setScannerActive(false);

				const updatedConfirmation = await handleQrScan(decryptedData.userId);
				if (!updatedConfirmation) return;

				const selectedEvent = (eventRef.current || "").toLowerCase();
				if (
					selectedEvent === "main event" ||
					selectedEvent === "pre-convention"
				) {
					setShowConfirmation(true);
				} else {
					setShowConfirmation(false);

					const finalConfirmation: ConfirmationData = {
						...updatedConfirmation,
						event:
							updatedConfirmation.event ||
							eventRef.current ||
							confirmationData.event ||
							"",
						terminalId:
							updatedConfirmation.terminalId ||
							terminalRef.current ||
							confirmationData.terminalId ||
							"",
					};

					handleUpdateConfirmationData(finalConfirmation);
					await doConfirmAction(finalConfirmation, result);
					setScanResult(null);
					setScannerActive(true);
				}
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

	const doConfirmAction = async (
		finalData: ConfirmationData,
		finalResult: ScanResult,
	) => {
		setIsProcessing(true);

		try {
			const context = QrCodeLogSchema.parse({
				user: finalResult.decryptedData,
				confirmationData: finalData,
			});

			Logger.info(`QR Scanned at Terminal ${finalData.terminalId}`, {
				group: LOG_GROUPS.QR,
				context,
			});

			mutation.mutate({
				userId: finalResult.decryptedData.userId,
				hasClaimedKit: finalData.kitClaiming,
			});

			toast.success("Action processed successfully!");
			setShowConfirmation(false);
			setShowSuccess(true);
			setTimeout(() => setShowSuccess(false), 3000);
		} catch (error) {
			Logger.error("Error processing action:", { error });
			setError("Failed to process the action. Please try again.");
		} finally {
			setIsProcessing(false);
		}
	};

	const handleConfirmAction = async () => {
		if (!scanResult) {
			return;
		}
		await doConfirmAction(confirmationData, scanResult);
		setScanResult(null);
		setScannerActive(true);
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
			hasClaimedKit: false,
		}));
	};

	const handleUpdateConfirmationData = (data: Partial<ConfirmationData>) => {
		if (data.event !== undefined) {
			eventRef.current = data.event;
		}
		if (data.terminalId !== undefined) {
			terminalRef.current = data.terminalId;
		}
		setConfirmationData((prev) => ({ ...prev, ...data }));
	};

	const handleUpdateShowConfirmation = (isOpen: boolean) => {
		if (!isOpen) {
			handleCancelScan();
		}

		setShowConfirmation(isOpen);
	};

	const handleSetupConfirm = () => {
		setSetupOpen(false); // close the dialog
	};

	return (
		<div className="col-span-full flex flex-col">
			<div className="flex flex-col space-y-4 p-4 sm:space-y-6 sm:p-6">
				<QRScannerHeader />

				<CameraStatusCard
					permissionStatus={permissionStatus}
					terminalId={confirmationData.terminalId}
					event={confirmationData.event}
				/>

				{error && <ErrorCard error={error} />}
				{showSuccess && <SuccessCard />}

				<ScannerCard
					cameraReady={cameraReady}
					permissionStatus={permissionStatus}
					onScan={handleScanResult}
					onError={handleScanError}
					scannerActive={scannerActive}
					showSuccess={showSuccess}
				/>

				<TroubleshootingCard />

				{["main event", "pre-convention"].includes(
					(eventRef.current || confirmationData.event || "").toLowerCase(),
				) && (
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
				)}

				<SetupPrompt
					open={setupOpen}
					event={confirmationData.event}
					terminalId={confirmationData.terminalId}
					onUpdate={handleUpdateConfirmationData}
					onConfirm={handleSetupConfirm}
				/>
			</div>
		</div>
	);
}
