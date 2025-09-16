"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/features/shared/components/base/card";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/features/shared/components/base/tabs";
import FileUpload from "./file-upload";
import UserInputForm from "./user-input-form";
import UserTable, { User } from "./user-table";
import { useState } from "react";

export default function RegistrationForm({ initialUsers }: { initialUsers: User[] }) {
	const [users, setUsers] = useState<User[]>(initialUsers);

	const handleUserAdded = async () => {
		const res = await fetch("/api/users", { cache: "no-store" });
		if (res.ok) {
			const latestUsers = await res.json();
			setUsers(latestUsers);
		}
	};

	return (
		<Card className="w-full overflow-y-auto border-border shadow-sm">
			<CardHeader className="space-y-1">
				<CardTitle className="font-bold text-foreground text-xl">
					Registration
				</CardTitle>
				<CardDescription className="text-muted-foreground">
					Upload a file or enter information manually
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Tabs defaultValue="upload" className="w-full">
					<TabsList className="grid h-fit w-full grid-cols-3 gap-2 rounded-full border border-input bg-background p-2">
						<TabsTrigger
							value="upload"
							className="text-foreground data-[state=active]:border-input data-[state=active]:bg-accent data-[state=active]:shadow-none"
						>
							File Upload
						</TabsTrigger>
						<TabsTrigger
							value="manual"
							className="text-foreground data-[state=active]:border-input data-[state=active]:bg-accent data-[state=active]:shadow-none"
						>
							Manual Entry
						</TabsTrigger>
						<TabsTrigger
							value="users"
							className="text-foreground data-[state=active]:border-input data-[state=active]:bg-accent data-[state=active]:shadow-none"
						>
							User List
						</TabsTrigger>
					</TabsList>

					<TabsContent value="upload" className="mt-6">
						<FileUpload />
					</TabsContent>

					<TabsContent value="manual" className="mt-6">
						<UserInputForm onUserAdded={handleUserAdded} />
					</TabsContent>

					<TabsContent value="users" className="mt-6">
						<UserTable users={users} />
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	);
}