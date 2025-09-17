"use server";

import { EvaluationService } from "@/infrastructure/server/services/evaluation.service";

export async function saveEvaluationAction(data: {
    userId: string;
    ratings: Record<string, number>;
    textAnswers?: Record<string, string>;
    selectedSessions?: string[];
    selectedParallel?: string[];
}) {
    const evaluationService = new EvaluationService();
    await evaluationService.save(data);
}
