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
import { useCheckInUserEvent } from "./data/use-check-in-user-event";
import { toast } from "sonner";
import { SetupPrompt } from "./setup-prompt";

// BroadcastChannel for notifying terminal page to refetch
const checkInChannel = typeof window !== 'undefined' && 'BroadcastChannel' in window ? new BroadcastChannel('user-event-checkin') : null;
// Helper to get eventId from event title
function getEventIdByTitle(events: Event[], title: string): number | null {
	const found = events.find(e => e.title === title);
	return found ? found.id : null;
}
type Event = { id: number; title: string };
export function QRScannerPage({ events }: { events: Event[] }) {
	const [scanResult, setScanResult] = useState<ScanResult | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [cameraReady, setCameraReady] = useState(false);
	const [permissionStatus, setPermissionStatus] = useState<string>("checking");
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [scannerActive, setScannerActive] = useState(true);
	const [setupOpen, setSetupOpen] = useState(true);
	const [isProcessing, setIsProcessing] = useState(false);
	const [confirmationData, setConfirmationData] = useState<ConfirmationData>({
		actionType: QRScanActionEnum.CHECK_IN,
		event: "",
		terminalId: "",
		kitClaiming: false,
		hasClaimedKit: false,
	});

	const kitClaimMutation = useClaimUserKit();
	const checkInUserEventMutation = useCheckInUserEvent();
	// Camera permission check
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

	// SetupPrompt handlers
	const handleUpdateConfirmationData = (data: Partial<ConfirmationData>) => {
		setConfirmationData((prev) => ({ ...prev, ...data }));
	};
	const handleSetupConfirm = () => {
		setSetupOpen(false);
	};
	// Scanner error handler
	const handleScanError = (error: unknown) => {
		Logger.error("QR Scanner error:", { error });
		const errorMessage =
			error && typeof error === "object" && "message" in error
				? (error as { message: string }).message
				: "Unknown scanner error";
		setError(`Scanner error: ${errorMessage}`);
	};

	// Fetch user data for confirmation
	const fetchUserConfirmation = async (userId: string) => {
		try {
			const res = await fetch(`/user/${userId}`);
			const data = await res.json();
			const claimed =
				typeof data.hasClaimedKit === "boolean"
					? data.hasClaimedKit
					: typeof data.has_claimed_kit === "boolean"
						? data.has_claimed_kit
						: false;
			return {
				hasClaimedKit: claimed,
				kitClaiming: claimed,
			};
		} catch (err) {
			Logger.error("Failed to fetch user data:", { err });
			setError("Failed to fetch user data. Please try again.");
			return null;
		}
	};

	// Helper: check if event is a main event or pre-convention
	const isMainOrPreConvention = (eventStr: string) => {
		const lower = eventStr.toLowerCase();
		return (
			lower.includes("main event day 1") ||
			lower.includes("main event day 2") ||
			lower.includes("main event day 3") ||
			lower.includes("pre-convention")
		);
	};

	// Confirm action handler
	const doConfirmAction = async (finalData: ConfirmationData, finalResult: ScanResult, skipLog?: boolean) => {
		setIsProcessing(true);
		try {
			let updatedConfirmationData = finalData;
			// Always upsert user_event check-in for all events, using correct eventId
			const eventId = getEventIdByTitle(events, finalData.event);
			if (eventId) {
				checkInUserEventMutation.mutate({
					userId: finalResult.decryptedData.userId,
					eventId,
					terminalId: finalData.terminalId,
				}, {
					onSuccess: () => {
						checkInChannel && checkInChannel.postMessage({ type: 'checkin', eventId, terminalId: finalData.terminalId });
					}
				});
			}
			// Only mutate kit claim for main/pre-convention events
			if (isMainOrPreConvention(finalData.event)) {
				await kitClaimMutation.mutateAsync({
					userId: finalResult.decryptedData.userId,
					hasClaimedKit: finalData.kitClaiming,
				});
				// Broadcast after kit claim as well
				if (eventId) {
					checkInChannel && checkInChannel.postMessage({ type: 'kitclaim', eventId, terminalId: finalData.terminalId });
				}
				// Refetch user data and update kit status in UI and for logging
				const userConfirmation = await fetchUserConfirmation(finalResult.decryptedData.userId);

				// If event is NOT main/preconvention, auto-check-in and skip confirmation/setup
				const eventStr = confirmationData.event || "";
				const isMain = isMainOrPreConvention(eventStr);
				if (!isMain) {
					// Auto check-in
					const eventId = getEventIdByTitle(events, eventStr);
					if (eventId) {
						checkInUserEventMutation.mutate({
							userId: finalResult.decryptedData.userId,
							eventId,
							terminalId: confirmationData.terminalId,
						}, {
							onSuccess: () => {
								// Broadcast to terminal page to refetch
								checkInChannel && checkInChannel.postMessage({ type: 'checkin', eventId, terminalId: confirmationData.terminalId });
								toast.success("Checked in!");
								setShowSuccess(true);
								setTimeout(() => setShowSuccess(false), 2000);
								setScanResult(null);
								setScannerActive(true);
							}
						});
					}
					return;
				}
				// Otherwise, show confirmation as usual
				setShowConfirmation(true);
				if (userConfirmation) {
					updatedConfirmationData = {
						...finalData,
						hasClaimedKit: userConfirmation.hasClaimedKit,
						kitClaiming: userConfirmation.kitClaiming,
					};
					setConfirmationData((prev) => ({ ...prev, hasClaimedKit: userConfirmation.hasClaimedKit, kitClaiming: userConfirmation.kitClaiming }));
				}
			}
			if (!skipLog) {
				const context = QrCodeLogSchema.parse({
					user: finalResult.decryptedData,
					confirmationData: updatedConfirmationData,
				});
				Logger.info(`QR Scanned at Terminal ${finalData.terminalId}`, {
					group: LOG_GROUPS.QR,
					context,
				});
			}
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

	// Scan result handler
	const handleScanResult = async (detectedCodes: any[]) => {
		if (!scannerActive || showConfirmation || showSuccess) return;
		if (detectedCodes && detectedCodes.length > 0) {
			const firstCode = detectedCodes[0];
			try {
				const decryptedData = decryptUserData(firstCode.rawValue);
				const eventStr = confirmationData.event || "";
				const isMain = isMainOrPreConvention(eventStr);
				if (!isMain) {
					// Auto check-in for non-main/preconvention events
					const eventId = getEventIdByTitle(events, eventStr);
					if (eventId) {
						checkInUserEventMutation.mutate({
							userId: decryptedData.userId,
							eventId,
							terminalId: confirmationData.terminalId,
						}, {
							onSuccess: () => {
								checkInChannel && checkInChannel.postMessage({ type: 'checkin', eventId, terminalId: confirmationData.terminalId });
								toast.success("Checked in!");
								setShowSuccess(true);
								setTimeout(() => setShowSuccess(false), 2000);
								setScanResult(null);
								setScannerActive(true);
							}
						});
					}
					return;
				}
				// For main/preconvention events, show confirmation/setup
				const result: ScanResult = {
					rawData: firstCode.rawValue,
					decryptedData,
					timestamp: new Date(),
				};
				setScanResult(result);
				setError(null);
				setScannerActive(false);
				// Fetch user kit status
				const userConfirmation = await fetchUserConfirmation(decryptedData.userId);
				if (!userConfirmation) return;
				setConfirmationData((prev) => ({
					...prev,
					hasClaimedKit: userConfirmation.hasClaimedKit,
					kitClaiming: userConfirmation.kitClaiming,
				}));
				setShowConfirmation(true);
			} catch (e) {
				handleScanError(e);
			}
		}
	};

	// ConfirmationSheet handlers
	const handleUpdateShowConfirmation = (open: boolean) => {
		setShowConfirmation(open);
		if (!open) {
			setScanResult(null);
			setScannerActive(true);
		}
	};
	const handleConfirmAction = async () => {
		if (!scanResult) return;
		await doConfirmAction(confirmationData, scanResult);
		setScanResult(null);
		setScannerActive(true);
	};
	const handleCancelScan = () => {
		setShowConfirmation(false);
		setScanResult(null);
		setScannerActive(true);
	};

	return (
		<div className="flex flex-col space-y-4 p-4 sm:space-y-6 sm:p-6">
			<QRScannerHeader />
			<CameraStatusCard
				permissionStatus={permissionStatus}
				terminalId={confirmationData.terminalId}
				event={confirmationData.event}
			/>
			{error && <ErrorCard error={error} />}
			{showSuccess && <SuccessCard />}
			{/* Only allow scanning if event and terminalId are set */}
			{confirmationData.event && confirmationData.terminalId ? (
				<ScannerCard
					cameraReady={cameraReady}
					permissionStatus={permissionStatus}
					onScan={handleScanResult}
					onError={handleScanError}
					scannerActive={scannerActive}
					showSuccess={showSuccess}
				/>
			) : null}
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
			{/* Always show SetupPrompt if event or terminalId is not set */}
			<SetupPrompt
				open={setupOpen || !confirmationData.event || !confirmationData.terminalId}
				event={confirmationData.event}
				terminalId={confirmationData.terminalId}
				onUpdate={handleUpdateConfirmationData}
				onConfirm={handleSetupConfirm}
				events={events}
			/>
		</div>
	);
}