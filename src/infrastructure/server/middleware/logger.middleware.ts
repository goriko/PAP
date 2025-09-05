import { getConnInfo } from "hono/vercel";
import { LOG_GROUPS, Logger } from "@/features/shared/lib/logger";
import { factory } from "../utils/factory";

/**
 * Attaches a `logger` instance to each request with the requestId included in the context.
 * Allows us to track the events during the lifecycle of the same request.
 *
 * Also, imitates the behavior of hono/logger to log out incoming & outgoing requests with their time taken (in miliseconds).
 *
 * Credits to: https://github.com/pinojs/pino/issues/1969#issuecomment-2311788254
 */
export const loggerMiddleware = factory.createMiddleware(async (c, next) => {
	const start = Date.now();

	const connInfo = getConnInfo(c);
	const requestLoggerInstance = new Logger({
		group: LOG_GROUPS.SERVER,
		requestId: c.var.requestId,
		method: c.req.method,
		path: c.req.path,
		ip: connInfo.remote.address,
		userAgent: c.req.header("user-agent") || "unknown",
	});

	c.set("logger", requestLoggerInstance);
	c.var.logger.debug(`--> ${c.req.method} ${c.req.path}`);

	await next();

	const duration = Date.now() - start;
	c.var.logger.debug(
		`<-- ${c.req.method} ${c.req.path} ${c.res.status} in ${duration}ms`,
	);
});
