import { rpc } from "@/infrastructure/server/rpc";
import { useMutation } from "@tanstack/react-query";
import type { InferRequestType } from "hono";

const $claimKitForUser = rpc.user["kit-claim"][":userId"].$patch;
type Payload = InferRequestType<typeof $claimKitForUser>["json"];
type Param = InferRequestType<typeof $claimKitForUser>["param"];
type Input = Payload & Param;

export function useClaimUserKit() {
	return useMutation({
		mutationFn: async (payload: Input) => {
			const res = await $claimKitForUser({
				json: { hasClaimedKit: payload.hasClaimedKit },
				param: { userId: payload.userId },
			});

			if (!res.ok) {
				throw new Error("Failed to claim kit for user");
			}

			const data = await res.json();

			return data;
		},
	});
}
