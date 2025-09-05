import { LogsPage } from "@/features/logs/components/logs-page";

export const dynamic = "force-dynamic";

export default async function LogsPageRoute() {
	return <LogsPage />;
}
