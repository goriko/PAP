import { factory } from "../utils/factory";
import { validator } from "hono/validator";
import { zValidator } from "@hono/zod-validator";
import type {
	ClientErrorStatusCode,
	ServerErrorStatusCode,
	SuccessStatusCode,
} from "hono/utils/http-status";
import {
	LogContentSchema,
	GetLogsQueryParamsSchema,
} from "@/types/entities/logs.entity";
import { LogsService } from "../services/logs.service";
import { LOG_GROUPS } from "@/features/shared/lib/logger";
import { withRole } from "../middleware/with-role.middleware";

const ROUTER_GROUP = LOG_GROUPS.DATABASE;

const validateLog = validator("json", (value, c) => {
	const parsed = LogContentSchema.safeParse(value);
	if (!parsed.success) {
		return c.text("Malformed log structure.", 400 as ClientErrorStatusCode);
	}
	return parsed.data;
});

const app = factory
	.createApp()
	.post("/", validateLog, async (c) => {
		const logContent = c.req.valid("json");
		const logsService = new LogsService(c.var.logger);

		try {
			const newLog = await logsService.insertLog(logContent);
			c.var.io.emit(logContent.group, newLog);
		} catch (error) {
			c.var.logger.error(
				"An error occured while inserting a log to the database.",
				{ error, group: ROUTER_GROUP },
			);
			return c.body(null, 500 as ServerErrorStatusCode);
		}

		return c.body(null, 201 as SuccessStatusCode);
	})
	.use(withRole("ADMIN"))
	.get("/", zValidator("query", GetLogsQueryParamsSchema), async (c) => {
		const query = c.req.valid("query");
		const logsService = new LogsService(c.var.logger);

		const result = await logsService.getLogs(query);

		return c.json(result);
	});

export default app;
