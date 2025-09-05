import { authClient } from "@/infrastructure/auth/auth-client";
import { UserRoleEnumSchema } from "@/types/enums/UserRoleEnum";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { ExtendedSession } from "@/types/entities/session.entity";

/**
 * Helper function to require admin role access for a page
 * Redirects non-admin users to the specified redirect path (defaults to /qr-code)
 */
export async function requireAdmin(redirectTo: string = "/qr-code") {
	const { data: session } = (await authClient.getSession({
		fetchOptions: {
			headers: await headers(),
		},
	})) as { data: ExtendedSession | null };

	if (
		session?.user.role !== UserRoleEnumSchema.Enum.ADMIN &&
		session?.user.role !== UserRoleEnumSchema.Enum.STAFF
	) {
		redirect(redirectTo);
	}

	return session;
}
