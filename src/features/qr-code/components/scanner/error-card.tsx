import { Card, CardContent } from "@/features/shared/components/base/card";

interface ErrorCardProps {
	error: string;
}

export function ErrorCard({ error }: ErrorCardProps) {
	return (
		<Card className="border-destructive/50 bg-destructive/10">
			<CardContent>
				<div className="flex items-start gap-3">
					<div className="flex-shrink-0 text-destructive text-lg">⚠️</div>
					<div className="min-w-0 flex-1">
						<h3 className="font-semibold text-destructive">Scanner Error</h3>
						<p className="mt-1 break-words text-destructive/80 text-sm">
							{error}
						</p>
						<p className="mt-2 text-muted-foreground text-xs">
							Make sure to allow camera permissions and try refreshing the page.
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
