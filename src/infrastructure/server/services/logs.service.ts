import db from "@/infrastructure/db";
import { logs } from "@/infrastructure/db/schema/logs.schema";
import { Logger } from "@/features/shared/lib/logger";
import type {
	LogContent,
	GetLogsQueryParams,
} from "@/types/entities/logs.entity";
import { eq, sql, and } from "drizzle-orm";

export class LogsService {
	private logger: Logger;

	constructor(logger: Logger) {
		this.logger = logger;
	}

	public async insertLog(logContent: LogContent) {
		const result = await db
			.insert(logs)
			.values({ content: logContent })
			.returning();
		return result[0];
	}

	public async getLogs(query: GetLogsQueryParams) {
		const conditions = [sql`jsonb_typeof(content) = 'object'`];

		if (query.group) {
			conditions.push(eq(sql`content->>'group'`, query.group));
		}

		if (query.level !== undefined) {
			conditions.push(
				eq(sql`(content->>'level')::int`, Logger.getLogLevelValue(query.level)),
			);
		}

		if (query.environment) {
			conditions.push(eq(sql`content->>'environment'`, query.environment));
		}

		if (query.startTime) {
			conditions.push(sql`content->>'time' >= ${query.startTime}`);
		}

		if (query.endTime) {
			conditions.push(sql`content->>'time' <= ${query.endTime}`);
		}

		const result = await db
			.select()
			.from(logs)
			.where(conditions.length ? and(...conditions) : undefined)
			.orderBy(sql`content->>'time' DESC`)
			.limit(query.limit ?? 100);

		return result;
	}
}
