import RegistrationForm from "@/features/auth/components/registration-form";

export const dynamic = "force-dynamic";

export default async function RegistrationPage() {
	return (
		<div className="col-span-full flex flex-col ">
			<RegistrationForm />
		</div>
	);
}
