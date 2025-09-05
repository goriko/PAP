import type { ClientErrorStatusCode } from "hono/utils/http-status";
import type { UserRoleEnum } from "@/types/enums/UserRoleEnum";
import { factory } from "../utils/factory";

export const withRole = (role: UserRoleEnum) =>
	factory.createMiddleware(async (c, next) => {
		const user = c.get("user");

		if (!user) {
			return c.json(
				"You are not authorized to access this resource",
				401 as ClientErrorStatusCode,
			);
		}

		if (user.role !== role) {
			return c.json(
				"You do not have the proper permissions to access this resource",
				403 as ClientErrorStatusCode,
			);
		}

		await next();
	});
