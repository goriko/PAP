import RegistrationForm from "@/features/auth/components/registration-form";
import db from "@/infrastructure/db";
import { user } from "@/infrastructure/db/schema/auth.schema";

export const dynamic = "force-dynamic";

export default async function RegistrationPage() {
	const allUsersRaw = await db.select().from(user).execute();
	const allUsers = allUsersRaw.map((u) => ({
		...u,
		createdAt: u.createdAt.toISOString(),
		updatedAt: u.updatedAt.toISOString(),
	}));
	return (
		<div className="col-span-full flex flex-col ">
			<RegistrationForm initialUsers={allUsers} />;
		</div>
	);
}
