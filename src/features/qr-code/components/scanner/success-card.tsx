import { Button } from "@/features/shared/components/base/button";
import { Card, CardContent } from "@/features/shared/components/base/card";
import { CheckCircle, RotateCcw } from "lucide-react";

interface SuccessCardProps {
	handleScanNext: () => void;
}

export default function SuccessCard({ handleScanNext }: SuccessCardProps) {
	return (
		<Card className="border-success/50 bg-success/10">
			<CardContent>
				<div className="flex items-start gap-3">
					<div className="flex-shrink-0 text-lg text-success">
						<CheckCircle className="size-5" />
					</div>
					<div className="min-w-0 flex-1">
						<h3 className="font-semibold text-success">Scan Successful!</h3>
						<div className="mt-3 flex gap-2">
							<Button
								onClick={handleScanNext}
								size="sm"
								className="bg-success hover:bg-success/90"
							>
								<RotateCcw className="mr-2 size-4" />
								Scan Next QR Code
							</Button>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
