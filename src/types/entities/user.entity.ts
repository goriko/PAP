import { z } from "zod/v4";

export const UserEntitySchema = z.object({
	id: z.uuid(),
	email: z.email(),
	password: z.string(),
	firstName: z.string(),
	middleName: z.string().optional(),
	lastName: z.string(),
	// * In case photoUrl is provided in pre-reg form
	photoUrl: z.string().optional(),
	role: z.string(),
});
export type UserEntity = z.infer<typeof UserEntitySchema>;

export const UserCreateEntitySchema = UserEntitySchema.pick({
	email: true,
	password: true,
	firstName: true,
	middleName: true,
	lastName: true,
	photoUrl: true,
	role: true,
});
export type UserCreateEntity = z.infer<typeof UserCreateEntitySchema>;
