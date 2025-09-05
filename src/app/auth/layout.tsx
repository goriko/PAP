import { authClient } from "@/infrastructure/auth/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AppLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// Route protection logic
	const { data: session } = await authClient.getSession({
		fetchOptions: {
			headers: await headers(),
		},
	});

	if (session) {
		redirect("/");
		return;
	}

	return <>{children}</>;
}
