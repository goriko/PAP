import { EvaluationComponent } from "@/features/evaluation/components/evaluation-component";
import { LogsService } from "@/infrastructure/server/services/logs.service";
import { Logger } from "@/features/shared/lib/logger";
import type { FullQrLog } from "@/features/terminal/components/terminal-page";

export const dynamic = "force-dynamic";

export default async function EvaluationPage({ params, }: { params: Promise<{ userId: string }>; }) {
    const { userId } = await params;

    const logsService = new LogsService(new Logger({ name: "ServerEvaluation" }));
    const allLogsRaw = await logsService.getLogs({ group: "qr", limit: 1000 });
    const userLogs: FullQrLog[] = allLogsRaw.filter((l) => {
        const logUserId = (l.content as any)?.context?.user?.userId;
        return String(logUserId) === String(userId);
    }) as FullQrLog[];

    const hasCheckedIn = userLogs.some((l) => {
        const actionType = (l.content as any)?.context?.confirmationData?.actionType;
        return actionType && actionType.toLowerCase() === "check-in";
    });

    if (!hasCheckedIn) {
        return (
            <div className="text-center mt-20 text-red-600 font-bold text-lg">
                You must check in first to access the evaluation form.
            </div>
        );
    }

    return <EvaluationComponent userLogs={userLogs} />;
}