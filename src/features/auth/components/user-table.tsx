"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/features/shared/components/base/dialog";
import {
    Card,
    CardContent,
} from "@/features/shared/components/base/card";

export interface User {
    id: string;
    name: string | null;
    email: string | null;
    role: string;
    emailVerified: boolean;
    hasClaimedKit: boolean;
    createdAt: string;
    updatedAt: string;
}

export default function UserTable({ users }: { users: User[] }) {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [sessionData, setSessionData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const filteredUsers = users.filter((u) => {
        const q = search.toLowerCase();
        return (
            u.name?.toLowerCase().includes(q) ||
            u.email?.toLowerCase().includes(q) ||
            u.role.toLowerCase().includes(q)
        );
    });

    const viewEvents = async (userId: string) => {
        setSelectedUserId(userId);
        setOpen(true);
        setLoading(true);

        try {
            const res = await fetch(`/api/user-event?userId=${userId}&includeEvent=true`);
            const data = await res.json();
            setSessionData(data);
            console.log(data)
        } catch (err) {
            console.error("Failed to fetch session data:", err);
            setSessionData([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            {/* Search bar */}
            <input
                type="text"
                placeholder="Search by name, email, or role..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Table */}
            <div className="overflow-auto rounded-md border bg-background">
                <table className="w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2 text-center">Name</th>
                            <th className="border p-2 text-center">Email</th>
                            <th className="border p-2 text-center">Role</th>
                            <th className="border p-2 text-center">Is Email Verified?</th>
                            <th className="border p-2 text-center">Kit Claimed</th>
                            <th className="border p-2 text-center">Created</th>
                            <th className="border p-2 text-center">Attended Session</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center p-4 text-muted-foreground">
                                    No users found
                                </td>
                            </tr>
                        ) : (
                            filteredUsers.map((u) => (
                                <tr key={u.id}>
                                    <td className="border p-2 text-center">{u.name ?? "—"}</td>
                                    <td className="border p-2 text-center">{u.email ?? "—"}</td>
                                    <td className="border p-2 text-center">{u.role}</td>
                                    <td className="border p-2 text-center">
                                        {u.emailVerified ? "✅" : "❌"}
                                    </td>
                                    <td className="border p-2 text-center">
                                        {u.hasClaimedKit ? "✅" : "❌"}
                                    </td>
                                    <td className="border p-2 text-center">
                                        {new Date(u.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="border p-2 text-center">
                                        <button
                                            className="text-blue-600 hover:underline"
                                            onClick={() => viewEvents(u.id)}
                                        >
                                            Click Here
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Attendance Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>User Sessions</DialogTitle>
                        <DialogDescription>
                            Viewing session attendance for selected user.
                        </DialogDescription>
                    </DialogHeader>

                    <Card className="w-full max-w-md shadow-lg border-none shadow-none">
                        <CardContent>
                            <table className="w-full border-collapse border border-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="border p-2 text-center">Session Name</th>
                                        <th className="border p-2 text-center">Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan={2} className="text-center p-4 text-muted-foreground">
                                                Loading...
                                            </td>
                                        </tr>
                                    ) : sessionData.length === 0 ? (
                                        <tr>
                                            <td colSpan={2} className="text-center p-4 text-muted-foreground">
                                                No session data found
                                            </td>
                                        </tr>
                                    ) : (
                                        sessionData.map((session, index) => (
                                            <tr key={index}>
                                                <td className="border p-2 text-center">{session.event_name.title}</td>
                                                <td className="border p-2 text-center">{session.event_name.type}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>
                </DialogContent>
            </Dialog>
        </div>
    );
}