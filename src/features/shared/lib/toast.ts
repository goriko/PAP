import { toast as sonnerToast } from "sonner";
import { TOAST_DURATION } from "@/config/constants";

/**
 * Utility functions for toast notifications with predefined duration
 */
export const toast = {
	success: (
		message: string,
		options?: Parameters<typeof sonnerToast.success>[1],
	) => {
		return sonnerToast.success(message, {
			duration: TOAST_DURATION,
			...options,
		});
	},

	error: (
		message: string,
		options?: Parameters<typeof sonnerToast.error>[1],
	) => {
		return sonnerToast.error(message, {
			duration: TOAST_DURATION,
			...options,
		});
	},

	info: (message: string, options?: Parameters<typeof sonnerToast.info>[1]) => {
		return sonnerToast.info(message, {
			duration: TOAST_DURATION,
			...options,
		});
	},

	warning: (
		message: string,
		options?: Parameters<typeof sonnerToast.warning>[1],
	) => {
		return sonnerToast.warning(message, {
			duration: TOAST_DURATION,
			...options,
		});
	},
};
