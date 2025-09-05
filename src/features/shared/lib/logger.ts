import pino, { type Logger as PinoLogger } from "pino";
import { rpc } from "@/infrastructure/server/rpc";

// #region Constants

const environment = process.env.NODE_ENV;

const COLOR = {
	GREEN: `\x1b[32m`,
	RED: `\x1b[31m`,
	WHITE: `\x1b[37m`,
	YELLOW: `\x1b[33m`,
	CYAN: `\x1b[36m`,
};

const LEVEL_COLORS = {
	FATAL: COLOR.RED,
	ERROR: COLOR.RED,
	WARN: COLOR.YELLOW,
	INFO: COLOR.GREEN,
	DEBUG: COLOR.GREEN,
	TRACE: COLOR.GREEN,
};

export const LOG_GROUPS = {
	// Infrastructure
	SERVER: "server",
	DATABASE: "database",
	WEBSOCKET: "ws",

	// Features
	AUTH: "auth",
	NOTIFICATIONS: "notifications",

	// Required in contract
	REGISTRATION: "registration",
	QR: "qr",
	KITS: "kits",
	ADMIN: "admin",

	// Development
	TEST: "test",
	DEBUG: "debug",
} as const;

export type LogGroup = (typeof LOG_GROUPS)[keyof typeof LOG_GROUPS];

// #region Helpers

function formatTime(date: Date): string {
	const pad = (n: number, z = 2) => String(n).padStart(z, "0");
	return (
		pad(date.getHours()) +
		":" +
		pad(date.getMinutes()) +
		":" +
		pad(date.getSeconds()) +
		"." +
		pad(date.getMilliseconds(), 3)
	);
}

// #region Logger Class

/**
 * Application-level logger that supports structured logging with context.
 *
 * Intended for both server and browser environments. Logs are pretty-printed
 * in development and structured in production. Context (e.g., `userId`, `group`)
 * will be included in every log entry.
 *
 * @example
 * // Basic usage
 * const logger = new Logger();
 * logger.info("App started");
 *
 * @example
 * // With context
 * const authLogger = new Logger({ group: "auth", userId: "abc123" });
 * authLogger.debug("User authenticated", { email: "user@example.com" });
 *
 * @example
 * // Logging an error
 * const taskLogger = new Logger({ group: "queue" });
 * taskLogger.error("Job failed", { jobId: "xyz789", reason: "timeout" });
 *
 * @example
 * // Static logging (no context)
 * Logger.warn("Something unexpected happened", { code: 123 });
 */
export class Logger {
	// biome-ignore lint: context can be any type
	private context: Record<string, any>;
	private logger: PinoLogger;

	public static levelMap: Record<pino.Level, number> = {
		fatal: 60,
		error: 50,
		warn: 40,
		info: 30,
		debug: 20,
		trace: 10,
	};

	// biome-ignore lint: context can be any type
	constructor(context: Record<string, any> = {}) {
		this.context = context;
		this.logger = Logger.baseLogger.child({
			group: context.group ?? LOG_GROUPS.DEBUG,
		});
	}

	private static readonly baseLogger: PinoLogger = pino({
		level: process.env.PINO_LOG_LEVEL || "trace",
		timestamp: pino.stdTimeFunctions.isoTime,
		browser: {
			asObject: true,
			write: (logObj) => {
				const { level, msg, group, time } = logObj as Record<string, string>;

				rpc.logs.$post({
					json: {
						...logObj,
						time,
						msg,
						environment,
						level: Logger.getLogLevelValue(level as pino.Level),
						group: group ?? LOG_GROUPS.DEBUG,
					},
				});

				const levelUpper = level.toUpperCase();
				const color =
					LEVEL_COLORS[levelUpper as keyof typeof LEVEL_COLORS] || COLOR.WHITE;
				const timeFormatted = formatTime(new Date(time));
				const groupDisplay = group ? ` ${COLOR.CYAN}[${group}]` : "";

				console.log(
					`[${timeFormatted}] ${color}${levelUpper}${groupDisplay} ${msg} ${COLOR.WHITE}`,
					logObj,
				);
			},
			formatters: {
				level: (label) => ({ level: label }),
			},
		},
		...(environment === "production"
			? {}
			: {
					transport: {
						target: "pino-pretty",
						options: {
							colorize: true,
							messageFormat: "[{group}] {msg}",
						},
					},
				}),
	});

	public static getLogLevelValue(logLevel: pino.Level): number {
		return Logger.levelMap[logLevel] ?? -1;
	}

	public static getLevelName(levelValue: number): string {
		const entry = Object.entries(Logger.levelMap).find(
			([_, value]) => value === levelValue,
		);
		return entry ? entry[0] : "unknown";
	}

	private static formatPayload(data?: object) {
		return data ? { ...data, environment } : { environment };
	}

	private formatWithContext(data?: object) {
		const { group: _, ...restContext } = this.context ?? {};
		return {
			...Logger.formatPayload(data),
			...(Object.keys(restContext).length > 0 ? { context: restContext } : {}),
		};
	}

	debug(msg: string, data?: object) {
		this.logger.debug(this.formatWithContext(data), msg);
	}

	static debug(msg: string, data?: object) {
		Logger.baseLogger.debug(Logger.formatPayload(data), msg);
	}

	info(msg: string, data?: object) {
		this.logger.info(this.formatWithContext(data), msg);
	}
	static info(msg: string, data?: object) {
		Logger.baseLogger.info(Logger.formatPayload(data), msg);
	}

	warn(msg: string, data?: object) {
		this.logger.warn(this.formatWithContext(data), msg);
	}

	static warn(msg: string, data?: object) {
		Logger.baseLogger.warn(Logger.formatPayload(data), msg);
	}

	error(msg: string, data?: object) {
		this.logger.error(this.formatWithContext(data), msg);
	}

	static error(msg: string, data?: object) {
		Logger.baseLogger.error(Logger.formatPayload(data), msg);
	}
}
