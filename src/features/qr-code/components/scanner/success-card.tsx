import { Card, CardContent } from "@/features/shared/components/base/card";
import { CheckCircle } from "lucide-react";

export default function SuccessCard() {
	return (
		<Card className="border-success/50 bg-success/10">
			<CardContent>
				<div className="flex items-start gap-3">
					<div className="flex-shrink-0 text-lg text-success">
						<CheckCircle className="size-5" />
					</div>
					<div className="min-w-0 flex-1">
						<h3 className="font-semibold text-success">Scan Successful!</h3>
						<p className="mt-1 text-muted-foreground text-sm">Please wait...</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
