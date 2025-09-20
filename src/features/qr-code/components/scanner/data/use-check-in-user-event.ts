import { useMutation } from "@tanstack/react-query";

export function useCheckInUserEvent() {
    return useMutation({
        mutationFn: async ({ userId, eventId, terminalId }: { userId: string; eventId: number; terminalId: string }) => {
            const res = await fetch("/api/user-event", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, eventId, terminalId }),
            });
            if (!res.ok) {
                throw new Error("Failed to check in user for event");
            }
            return res.json();
        },
    });
}
