"use client";

import { useState } from "react";

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

    const filteredUsers = users.filter((u) => {
        const q = search.toLowerCase();
        return (
            u.name?.toLowerCase().includes(q) ||
            u.email?.toLowerCase().includes(q) ||
            u.role.toLowerCase().includes(q)
        );
    });

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
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="text-center p-4 text-muted-foreground"
                                >
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
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
