import { hc } from "hono/client";
import { env } from "@/config/env.client";
import type { AppType } from "./index";

export const rpc = hc<AppType>(env.NEXT_PUBLIC_API_BASE_URL, {
	fetch: ((input, init) => {
		return fetch(input, {
			...init,
			credentials: "include",
		});
	}) satisfies typeof fetch,
});
