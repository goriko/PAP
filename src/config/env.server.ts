// Not using 'server-only' because it breaks the Better Auth and Drizzle CLI's
// See https://www.answeroverflow.com/m/1351139964632694794
// and https://github.com/drizzle-team/drizzle-orm/issues/4208

import { z } from "zod";

const isNotTrailingSlash = (val: string) => !val.endsWith("/");
const isValidRemoteUrl = (val: string) =>
	(val.startsWith("https://") || val.startsWith("http://")) &&
	val.endsWith("*");

const envParseResult = z
	.object({
		DB_URL: z.string().url().startsWith("postgres://"),
		REDIS_URL: z.string().url().startsWith("redis://"),
		BETTER_AUTH_SECRET: z.string().min(1, "BETTER_AUTH_SECRET is required"),
		RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required"),
		RESEND_FROM_EMAIL: z.string().email(),
		BETTER_AUTH_URL: z
			.string()
			.url()
			.refine(isNotTrailingSlash, {
				message: "BETTER_AUTH_URL must not end with a slash",
			})
			.default("http://localhost:6969/auth"),
		REMOTE_PATTERNS: z
			.array(
				z.string().refine(isValidRemoteUrl, {
					message:
						"Remote patterns need to be parseable with the URL constructor. See the Next.js docs for more info: https://nextjs.org/docs/pages/api-reference/components/image#remotepatterns",
				}),
			)
			.default([]),
	})
	.safeParse({
		...process.env,
		REMOTE_PATTERNS: process.env.REMOTE_PATTERNS?.split(",") ?? [],
	});

if (!envParseResult.success) {
	console.error(
		"❌ Invalid environment variables:",
		envParseResult.error.format(),
	);
	throw new Error("Invalid environment variables");
}

export const env = envParseResult.data;
