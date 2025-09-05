import { z } from "zod";

const isNotTrailingSlash = (val: string) => !val.endsWith("/");

const envParseResult = z
	.object({
		NEXT_PUBLIC_BASE_URL: z
			.string()
			.url()
			.refine(isNotTrailingSlash, {
				message: "NEXT_PUBLIC_BASE_URL must not end with a slash",
			})
			.default("http://localhost:3000"),
		NEXT_PUBLIC_API_BASE_URL: z
			.string()
			.url()
			.refine(isNotTrailingSlash, {
				message: "NEXT_PUBLIC_API_BASE_URL must not end with a slash",
			})
			.default("http://localhost:6969"),
		NEXT_PUBLIC_QR_ENCRYPTION_SECRET: z
			.string()
			.min(1)
			.default("qrencryptionsecret"),
	})
	.safeParse({
		// Add the client environment variables here!
		NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
		NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
		NEXT_PUBLIC_QR_ENCRYPTION_SECRET: process.env.QR_ENCRYPTION_SECRET,
	});

if (!envParseResult.success) {
	console.error(
		"❌ Invalid environment variables:",
		envParseResult.error.format(),
	);
	throw new Error("Invalid environment variables");
}

export const env = envParseResult.data;
