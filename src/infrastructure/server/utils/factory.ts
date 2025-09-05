import { createFactory } from "hono/factory";
import type { RequestIdVariables } from "hono/request-id";
import type { Logger } from "@/features/shared/lib/logger";
import type { Context as HonoContext } from "hono";
import type { Server } from "socket.io";
import type { AuthMiddlewareVariables } from "../middleware/auth.middleware";

/**
 * If you're creating a new middleware that needs to attach a type to `c.var` or `c.env`, do it here.
 */
type AppEnv = {
	Variables: {
		logger: Logger;
		io: Server;
	} & RequestIdVariables &
		AuthMiddlewareVariables;
};

/**
 * Used to create middleware, handlers, and app to share definition of the Hono Env
 * Reference: https://hono.dev/docs/helpers/factory#createfactory
 */
export const factory = createFactory<AppEnv>();

/**
 * Can't type the websocket routes using the factory type, so we need to use this assert them on a per-route basis.
 */
export type Context = HonoContext<AppEnv>;
