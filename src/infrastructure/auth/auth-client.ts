import { createAuthClient } from "better-auth/react";
import { magicLinkClient } from "better-auth/client/plugins";
import { env } from "@/config/env.client";

export const authClient = createAuthClient({
	baseURL: `${env.NEXT_PUBLIC_API_BASE_URL}/auth`,
	plugins: [magicLinkClient()],
	fetchOptions: {
		credentials: "include",
	},
});
