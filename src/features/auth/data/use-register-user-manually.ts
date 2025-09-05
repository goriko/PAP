import { rpc } from "@/infrastructure/server/rpc";
import { useMutation } from "@tanstack/react-query";
import type { InferRequestType } from "hono";

const $registerUser = rpc.user.seed.manual.$post;
type Input = InferRequestType<typeof $registerUser>["json"];

export function useRegisterUserManually() {
	return useMutation({
		mutationFn: async (payload: Input) => {
			const res = await $registerUser({ json: payload });

			if (!res.ok) {
				throw new Error("Failed to manually register user");
			}

			const data = await res.json();

			return data;
		},
	});
}
