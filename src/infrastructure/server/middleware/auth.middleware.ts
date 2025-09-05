import { createMiddleware } from "hono/factory";

import type {
	AuthInstance,
	AuthSessionData,
	Session,
} from "@/infrastructure/auth";

export type AuthMiddlewareVariables = AuthSessionData & {
	auth: AuthInstance;
};

export const authMiddleware = ({ auth }: { auth: AuthInstance }) =>
	createMiddleware<{
		Variables: AuthSessionData & { auth: AuthInstance };
	}>(async (c, next) => {
		const session = (await auth.api.getSession({
			headers: c.req.raw.headers,
		})) as Session;

		c.set("auth", auth);

		if (!session) {
			c.set("user", null);
			c.set("session", null);

			return next();
		}

		c.set("user", session.user);
		c.set("session", session.session);

		return next();
	});
