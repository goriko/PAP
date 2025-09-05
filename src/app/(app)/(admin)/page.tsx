import { Dashboard } from "@/features/dashboard/components/dashboard";

export const dynamic = "force-dynamic";

export default async function Home() {
	return (
		<div className="col-span-full flex flex-col">
			<Dashboard />
		</div>
	);
}
