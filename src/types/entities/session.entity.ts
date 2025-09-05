import type { Session as BetterAuthSession } from "@/infrastructure/auth";
import type { UserRoleEnum } from "../enums/UserRoleEnum";

export interface ExtendedSession extends BetterAuthSession {
	user: BetterAuthSession["user"] & {
		role: UserRoleEnum;
	};
}
