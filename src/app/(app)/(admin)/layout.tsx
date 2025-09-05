import { requireAdmin } from "@/features/auth/utils/require-admin";

export default async function AppLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// Route protection logic
	await requireAdmin();

	return <>{children}</>;
}
