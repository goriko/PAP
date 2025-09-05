import { Server } from "socket.io";
import { factory } from "../utils/factory";
import { LOG_GROUPS, Logger } from "@/features/shared/lib/logger";
import type { ServerType } from "@hono/node-server";
import IORedis from "ioredis";
import { createAdapter } from "@socket.io/redis-adapter";
import { env } from "@/config/env.server";

const pubClient = new IORedis(env.REDIS_URL);
const subClient = pubClient.duplicate();

async function initRedis() {
	await Promise.all([pubClient, subClient]);
}

initRedis().catch(console.error);

let io: Server | null;

export function initWebsocket(server: ServerType) {
	io = new Server(server, {
		adapter: createAdapter(pubClient, subClient),
		cors: {
			origin: "*",
		},
		serveClient: false,
	});

	io.on("error", (err) => {
		Logger.error("A websocket error occured", {
			group: LOG_GROUPS.WEBSOCKET,
			err,
		});
	});
}

export const socketIoMiddleware = factory.createMiddleware(async (c, next) => {
	if (!c.var.io && io) {
		c.set("io", io);
	}
	await next();
});
