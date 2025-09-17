import db from "@/infrastructure/db";
import { evaluation } from "@/infrastructure/db/schema/evaluation.schema";

export class EvaluationService {
    async save(data: {
        userId: string;
        ratings: Record<string, number>;
        textAnswers?: Record<string, string>;
        selectedSessions?: string[];
        selectedParallel?: string[];
    }) {
        return await db.insert(evaluation).values({
            userId: data.userId,
            ratings: data.ratings,
            textAnswers: data.textAnswers,
            selectedSessions: data.selectedSessions ?? [],
            selectedParallel: data.selectedParallel ?? [],
        });
    }
}
