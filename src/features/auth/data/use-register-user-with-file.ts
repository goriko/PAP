import { rpc } from "@/infrastructure/server/rpc";
import { useMutation } from "@tanstack/react-query";
import type { InferRequestType } from "hono";

const $registerUserWithFile = rpc.user.seed.file.$post;
type Input = InferRequestType<typeof $registerUserWithFile>["form"];

export function useRegisterUserWithFile() {
	return useMutation({
		mutationFn: async (payload: Input) => {
			const res = await $registerUserWithFile({ form: payload });

			if (!res.ok) {
				throw new Error("Failed to register user with excel");
			}

			const data = await res.json();
			return data;
		},
	});
}
