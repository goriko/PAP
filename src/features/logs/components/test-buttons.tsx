import { Button } from "@/features/shared/components/base/button";
import { Card, CardContent } from "@/features/shared/components/base/card";
import { Logger } from "@/features/shared/lib/logger";
import { Cog } from "lucide-react";

interface TestButtonsProps {
	group: string;
}

// TODO: Remove when we integrate auth and other actions with logs. This is just a temporary component to test the logs.
export default function TestButtons({ group }: TestButtonsProps) {
	const testActions = [
		{
			label: "Generate Info Log",
			action: () =>
				Logger.info(`Test info log for ${group}`, {
					group,
					testData: "sample info",
				}),
			className:
				"bg-analytics-primary hover:bg-analytics-primary-dark text-white",
		},
		{
			label: "Generate Warning",
			action: () =>
				Logger.warn(`Test warning for ${group}`, {
					group,
					testData: "sample warning",
				}),
			className:
				"bg-analytics-warning hover:bg-analytics-warning-dark text-black",
		},
		{
			label: "Generate Error",
			action: () =>
				Logger.error(`Test error for ${group}`, {
					group,
					testData: "sample error",
				}),
			className:
				"bg-analytics-danger hover:bg-analytics-danger-dark text-white",
		},
	];

	return (
		<Card className="border-border dark:bg-card">
			<CardContent className="p-3 sm:p-4">
				<div className="flex gap-2">
					<Cog className="mt-0.5 h-8 w-8 text-muted-foreground" />
					<div className="flex-1">
						<p className="mb-2 font-bold text-foreground text-lg">
							[TEST] Log Generation
						</p>
						<div className="flex flex-wrap gap-2">
							{testActions.map((action) => (
								<Button
									key={action.label}
									size="sm"
									onClick={action.action}
									className={action.className}
								>
									{action.label}
								</Button>
							))}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
