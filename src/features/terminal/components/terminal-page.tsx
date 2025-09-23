"use client";

import { TerminalSelect } from "./terminal-select";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/features/shared/components/base/select";
import { useUserEvents } from "../data/use-user-events";
import { useEffect, useRef } from "react";
import { useUsers } from "../data/use-users";
import { useState } from "react";
import { DoorOpen, LogIn } from "lucide-react";
import { VALID_TERMINAL_IDS } from "@/features/qr-code/components/scanner/types/confirmation-data";

type Event = { id: number; title: string; type: string };

export function TerminalPage({ events }: { events: Event[] }) {
	const [terminal, setTerminal] = useState<string>(VALID_TERMINAL_IDS[0]);
	const [selectedEvent, setSelectedEvent] = useState<string>("");

	// Find selected eventId from events list
	const selectedEventObj = events.find(ev => ev.title === selectedEvent);
	const eventId = selectedEventObj?.id ?? null;

	const { data: userEvents, isLoading: loadingUserEvents, refetch } = useUserEvents(eventId, terminal);
	const { data: users, isLoading: loadingUsers, refetch: refetchUsers } = useUsers();

	// Refetch userEvents when eventId or terminal changes
	useEffect(() => {
		if (eventId && terminal) {
			refetch();
		}
	}, [eventId, terminal, refetch]);

	// Listen for check-in and kit claim events from scanner via BroadcastChannel
	useEffect(() => {
		if (typeof window === 'undefined' || !('BroadcastChannel' in window)) return;
		const channel = new BroadcastChannel('user-event-checkin');
		const handler = (event: MessageEvent) => {
			const { type, eventId: eId, terminalId: tId } = event.data || {};
			if ((type === 'checkin' || type === 'kitclaim') && String(eId) === String(eventId) && String(tId) === String(terminal)) {
				refetch();
				refetchUsers();
				// Also refetch allUserEventsForEvent for status update
			}
		};
		channel.addEventListener('message', handler);
		return () => channel.removeEventListener('message', handler);
	}, [eventId, terminal, refetch, refetchUsers]);

	// Map userId to user_event row for this event and terminal
	const userEventMap = (userEvents ?? []).reduce((acc: Record<string, any>, ue: any) => {
		acc[ue.userId] = ue;
		return acc;
	}, {});

	// For status logic, fetch ALL user_event rows for this event (across all terminals)
	const [allUserEventsForEvent, setAllUserEventsForEvent] = useState<any[]>([]);
	useEffect(() => {
		async function fetchAllUserEvents() {
			if (!eventId) return;
			const res = await fetch(`/api/user-event?eventId=${eventId}`);
			if (res.ok) {
				setAllUserEventsForEvent(await res.json());
			}
		}
		fetchAllUserEvents();
	}, [eventId]);

	// Track last check-in time per user to prevent status flip
	const lastCheckInRef = useRef<Record<string, number>>({});
	// Only show users who are in user_event for this event and terminal (i.e., checked in at this terminal)
	const checkedInUsers = (users ?? []).filter((u: any) => userEventMap[u.id]);
	const userInitial = users?.name?.charAt(0)?.toUpperCase() ?? "?";
	const photoUrl = users?.photoUrl ?? null;
	const orderedCheckedInUsers = checkedInUsers.sort((a: any, b: any) => {
		const eventA = userEventMap[a.id];
		const eventB = userEventMap[b.id];

		// You can sort based on the last check-in time or another field from the event
		return new Date(eventB.last_checkin_at).getTime() - new Date(eventA.last_checkin_at).getTime();
	});

	const reversedCheckedInUsers = [...orderedCheckedInUsers].reverse();
	return (
		<div className="grid">
			<div className="mb-4 rounded-md border bg-accent p-6 py-4">
				<h1 className="col-span-full flex gap-1 font-bold text-3xl text-foreground">
					<span>Terminal</span>
					<TerminalSelect
						terminal={terminal}
						setTerminal={setTerminal}
						terminalIds={VALID_TERMINAL_IDS}
					/>
					<Select
						value={selectedEvent}
						onValueChange={setSelectedEvent}
					>
						<SelectTrigger className="w-fit border-transparent bg-card pl-1 text-3xl shadow-none">
							<SelectValue placeholder="Select Event" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Select Event Name</SelectLabel>
								{events.map((ev) => (
									<SelectItem key={ev.id} value={ev.title}>
										{ev.title}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</h1>
			</div>

			<div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
				<section className="rounded-md border bg-accent p-6">
					<h2 className="mb-4 flex items-center font-bold text-2xl">
						<div className="mr-3 rounded-sm bg-success/10 p-2">
							<LogIn className="text-success" />
						</div>
						Check-ins
					</h2>

					{loadingUserEvents || loadingUsers ? (
						<p className="text-muted-foreground text-sm">Loading...</p>
					) : checkedInUsers.length === 0 ? (
						<p className="text-muted-foreground text-sm">None so far.</p>
					) : (
						<div className="flex w-full flex-col gap-4">
							{reversedCheckedInUsers.map((u: any) => {
								const checkedInAt = userEventMap[u.id]?.checkedInAt;
								const firstCheckinAt = userEventMap[u.id]?.firstCheckinAt;
								const lastCheckinAt = userEventMap[u.id]?.lastCheckinAt;

								// If more than one check-in → already checked in
								const userEventsForUser = (userEvents ?? []).filter(
									(ue: any) => ue.userId === u.id
								);
								const alreadyCheckedIn = userEventsForUser.length > 1;

								let status = "—";
								if (firstCheckinAt) {
									status =
										lastCheckinAt && lastCheckinAt !== firstCheckinAt
											? "👤 User has already checked in"
											: "✅ Successfully checked in!";
								}

								const userInitial = u.name?.charAt(0)?.toUpperCase() ?? "?";
								const photoUrl = u.photoUrl ?? null;

								return (
									<>
										<div
											key={u.id}
											className="flex items-start gap-4 rounded-md border bg-background p-4"
										>
											{/* Left side: image or initial */}
											<div className="flex-shrink-0">
												{photoUrl ? (
													<img
														src={photoUrl}
														alt="User Photo"
														className="h-20 w-20 rounded-md border object-cover"
													/>
												) : (
													<div className="flex h-20 w-20 items-center justify-center rounded-md border bg-muted font-semibold text-3xl text-muted-foreground">
														{userInitial}
													</div>
												)}
											</div>

											{/* Right side: table with user details */}
											<div className="flex-grow overflow-auto">
												<table className="w-full border-collapse border border-gray-200">
													<tbody>
														<tr>
															{/* <td className="border p-2 font-semibold">Name</td> */}
															<td className="border p-2 text-2xl">{u.name ?? "—"}</td>
														</tr>
														{selectedEventObj?.type == "Main Event" && (
															<tr>
																{/* <td className="border p-2 font-semibold">Kit Claimed</td> */}
																<td className="border p-2">
																	{u.hasClaimedKit ? "✅ Kit has been claimed" : "❌ Kit not claimed"}
																</td>
															</tr>
														)}
														{/* <tr> */}
														{/* <td className="border p-2 font-semibold">Checked In At</td> */}
														{/* <td className="border p-2">
															{firstCheckinAt
																? new Date(firstCheckinAt).toLocaleString()
																: "—"}
														</td>
													</tr> */}
														<tr>
															{/* <td className="border p-2 font-semibold">Status</td> */}
															<td className="border p-2">{status}</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
									</>
								);
							})}
						</div>
					)}
				</section>
				<section className="rounded-md border bg-accent p-6">
					<h2 className="mb-4 flex items-center font-bold text-2xl">
						<div className="mr-3 rounded-sm bg-destructive/10 p-2">
							<DoorOpen className="text-destructive" />
						</div>
						Check-outs
					</h2>
					<p className="text-muted-foreground text-sm">None so far.</p>
				</section>
			</div>
		</div>
	);
}
