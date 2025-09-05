import { requestId } from "hono/request-id";
import { loggerMiddleware } from "./middleware/logger.middleware";
import {
	socketIoMiddleware,
	initWebsocket,
} from "./middleware/socket-io.middleware";
import { authMiddleware } from "./middleware/auth.middleware";
import user from "./routers/user.router";
import logs from "./routers/logs.router";
import auth from "../auth";
import { factory } from "./utils/factory";
import { serve } from "@hono/node-server";

import { env } from "@/config/env.client";
import { cors } from "hono/cors";

export const app = factory
	.createApp()
	.use(
		cors({
			origin: env.NEXT_PUBLIC_BASE_URL,
			allowHeaders: ["Content-Type", "Authorization"],
			allowMethods: ["POST", "GET", "OPTIONS", "PATCH"],
			exposeHeaders: ["Content-Length"],
			maxAge: 600,
			credentials: true,
		}),
	)
	.use(authMiddleware({ auth: auth.auth }))
	.use(requestId())
	.use(loggerMiddleware)
	.use(socketIoMiddleware)
	.on(["GET", "POST"], "/auth/**", (c) => auth.auth.handler(c.req.raw))
	.route("/user", user)
	.route("/logs", logs);

const server = serve({ fetch: app.fetch, port: 6969 }, (info) => {
	console.log(`Server is running on http://localhost:${info.port}`);
});

initWebsocket(server);

/**
 * @example
 * import { hc } from 'hono/client';
 *
 * import type { AppType } from 'server';
 *
 * const client = hc<App>(process.env.NEXT_PUBLIC_BASE_URL); // we have to pass a full URL like 'http://localhost:3000'
 */
export type AppType = typeof app;
