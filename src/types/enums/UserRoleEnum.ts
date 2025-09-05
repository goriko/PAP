import { z } from "zod";

export const UserRoleEnumSchema = z.enum(["USER", "ADMIN", "STAFF"]);
export type UserRoleEnum = z.infer<typeof UserRoleEnumSchema>;
