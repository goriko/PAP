import { z } from "zod";
import { Logger } from "@/features/shared/lib/logger";

export const LogContentSchema = z.object({
	msg: z.string().optional(),
	level: z.number(),
	time: z.string(),
	group: z.string(),
	environment: z.enum(["production", "development", "test"]),
	context: z.any().optional(),
});
export type LogContent = z.infer<typeof LogContentSchema>;

export const LogSchema = z.object({
	id: z.number().nonnegative(),
	content: LogContentSchema,
});
export type Log = z.infer<typeof LogSchema>;

export const GetLogsQueryParamsSchema = z.object({
	group: z.string().optional(),
	level: z
		.enum(Object.keys(Logger.levelMap) as [keyof typeof Logger.levelMap])
		.optional(),
	environment: z.enum(["production", "development", "test"]).optional(),
	limit: z.number().positive().default(100).optional(),
	startTime: z.string().datetime().optional(),
	endTime: z.string().datetime().optional(),
});
export type GetLogsQueryParams = z.infer<typeof GetLogsQueryParamsSchema>;
