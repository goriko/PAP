import { Header } from "@/features/shared/layout/header";
import { Footer } from "@/features/shared/layout/footer";
import { SidebarProvider } from "@/features/shared/components/base/sidebar";
import { AppSidebar } from "@/features/shared/layout/app-sidebar";
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

	if (!session) {
		redirect("/auth");
		return;
	}

	return (
		<SidebarProvider defaultOpen={true}>
			<div className="flex min-h-screen w-full">
				<AppSidebar />
				<div className="flex min-h-screen flex-1 flex-col bg-gradient-to-r from-background to-info-light/5 transition-all duration-300 ">
					<Header />
					<main className="w-full flex-1 overflow-auto px-4 py-8 md:px-10">
						{children}
					</main>
					<Footer />
				</div>
			</div>
		</SidebarProvider>
	);
}
