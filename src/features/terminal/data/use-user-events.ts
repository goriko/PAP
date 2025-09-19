import { useQuery } from "@tanstack/react-query";


export async function fetchUserEvents(eventId: number, terminalId?: string) {
    let url = `/api/user-event?eventId=${eventId}`;
    if (terminalId) {
        url += `&terminalId=${encodeURIComponent(terminalId)}`;
    }
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch user events");
    return res.json();
}

export function useUserEvents(eventId: number | null, terminalId?: string) {
    return useQuery({
        queryKey: ["user-events", eventId, terminalId],
        queryFn: () => fetchUserEvents(eventId!, terminalId),
        enabled: !!eventId,
    });
}
