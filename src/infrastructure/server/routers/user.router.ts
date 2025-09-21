import { userEvent, eventName } from "@/infrastructure/db/schema/auth.schema";
import { nanoid } from "nanoid";
import { zValidator } from "@hono/zod-validator";
import auth from "@/infrastructure/auth";
import z from "zod/v4";
import xlsx from "node-xlsx";
import generateRandomPassword from "./utils/generate-random-password";
import { factory } from "../utils/factory";
import type { UserRoleEnum } from "@/types/enums/UserRoleEnum";
import { withRole } from "../middleware/with-role.middleware";
import type { ServerErrorStatusCode } from "hono/utils/http-status";
import db from "@/infrastructure/db";
import { user } from "@/infrastructure/db/schema/auth.schema";
import { eq, and } from "drizzle-orm";

const routes = factory
	.createApp()
	.use(withRole("ADMIN"))
	.post(
		"seed/manual",
		zValidator(
			"json",
			z.object({
				email: z.email(),
				firstName: z.string().min(1),
				middleName: z.string().optional(),
				lastName: z.string().min(1),
				// Using string since zod enums get inferred as `unknown`,
				// causing this parsing to break
				role: z.string(),
				hasClaimedKit: z.boolean().default(false),
			}),
		),
		async (c) => {
			const data = c.req.valid("json");

			try {
				await auth.auth.api.signUpEmail({
					body: {
						email: data.email,
						name: `${data.firstName} ${data.middleName} ${data.lastName}`,
						role: data.role as UserRoleEnum,
						hasClaimedKit: data.hasClaimedKit,
						password: generateRandomPassword(),
					},
				});

				return c.json({
					message: `Successfully registered user ${data.email}`,
				});
			} catch (error) {
				c.var.logger.error("An error occurred while registering a user.", {
					error,
				});

				return c.text(
					"An error occurred while registering the user. Please try again later.",
					500 as ServerErrorStatusCode,
				);
			}
		},
	)
	.post(
		"seed/file",
		zValidator(
			"form",
			z.object({
				file: z.instanceof(File).refine(
					(file) =>
						[
							"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // xls
							"application/vnd.ms-excel", // xlsx
							"text/csv", // csv
						].includes(file.type),
					{
						error: "Invalid file type.",
					},
				),
			}),
		),
		async (c) => {
			const { file } = c.req.valid("form");

			const arrayBuffer = await file.arrayBuffer();
			const buffer = Buffer.from(arrayBuffer);

			// Should expect name, email, and role
			// The actual shape is TBD, but I'll assume that the file has the following structure:
			// [
			// 	["name", "email", "role"],
			// 	["John Doe", "john.doe@example.com", "ADMIN"],
			// 	["Jane Smith", "jane.smith@example.com", "USER"],
			// ]
			const sheets = xlsx.parse(buffer);
			const data = sheets[0].data as [string, string, string][];
			const userInformation: {
				name: string;
				email: string;
				role: UserRoleEnum;
			}[] = data.slice(1).map(([name, email, role]) => ({
				name,
				email,
				role: role as UserRoleEnum,
			}));

			// TODO: Add logger for errors and check if user already exists
			await Promise.all(
				userInformation.map(async (user) => {
					await auth.auth.api.signUpEmail({
						body: {
							email: user.email,
							name: user.name,
							role: user.role,
							password: generateRandomPassword(),
							hasClaimedKit: false,
						},
					});
				}),
			);

			return c.json({
				message: `Successfully seeded ${userInformation.length} users`,
			});
		},
	)
	.patch(
		"kit-claim/:userId",
		zValidator("param", z.object({ userId: z.string() })),
		zValidator("json", z.object({ hasClaimedKit: z.boolean() })),
		async (c) => {
			const { userId } = c.req.valid("param");
			const { hasClaimedKit } = c.req.valid("json");

			await db
				.update(user)
				.set({
					hasClaimedKit,
				})
				.where(eq(user.id, userId));

			return c.json({
				message: `Successfully updated user kit claim`,
			});
		},
	)
	.get(
		":userId",
		zValidator("param", z.object({ userId: z.string() })),
		async (c) => {
			const { userId } = c.req.valid("param");

			// Fetch user from the database
			const [foundUser] = await db
				.select()
				.from(user)
				.where(eq(user.id, userId))
				.execute();

			if (!foundUser) {
				return c.text("User not found", 404);
			}

			return c.json({
				id: foundUser.id,
				email: foundUser.email,
				name: foundUser.name,
				hasClaimedKit: foundUser.hasClaimedKit,
			});
		},
	);


// PATCH /check-in/:userId (move inside routes chain)
routes.patch(
	"check-in/:userId",
	zValidator("param", z.object({ userId: z.string() })),
	zValidator("json", z.object({ eventId: z.number() })),
	async (c) => {
		const { userId } = c.req.valid("param");
		const { eventId } = c.req.valid("json");

		// Check if user already checked in for this event
		const [existing] = await db
			.select()
			.from(userEvent)
			.where(
				and(
					eq(userEvent.userId, userId),
					eq(userEvent.eventId, eventId)
				)
			)
			.execute();

		if (existing) {
			return c.json({ message: "User already checked in for this event" });
		}

		// Insert new check-in record
		await db.insert(userEvent).values({
			id: nanoid(),
			userId,
			eventId,
			// checkedInAt: new Date(),
			firstCheckinAt: new Date(),
			lastCheckinAt: new Date(),
		});

		return c.json({ message: "User checked in successfully" });
	}
);

export default routes;
