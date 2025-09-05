import { Card, CardContent } from "@/features/shared/components/base/card";

export function RegistrationChart() {
	const percentage = 42;
	const weeklyCount = 847;

	return (
		<Card className="relative h-full overflow-hidden rounded-2xl border-border bg-gradient-to-br from-success to-success-dark text-white shadow-lg">
			<div className="absolute inset-0 opacity-20">
				<div className="-translate-y-8 absolute top-0 right-0 h-32 w-32 translate-x-8 rounded-full bg-white" />
				<div className="absolute top-8 right-8 h-20 w-20 rounded-full bg-white" />
			</div>

			<CardContent className="relative z-10 h-full px-8 py-4">
				<div className="flex h-full flex-col justify-center space-y-4">
					<div>
						<p className="mb-2 font-semibold text-xl opacity-80">
							New Registrations
						</p>
						<p className="font-bold text-7xl">{percentage}%</p>
						<p className="mt-2 text-lg opacity-80">{weeklyCount} this week</p>
					</div>

					{/* Progress Bar */}
					<div className="h-3 w-full rounded-full bg-white/20">
						<div
							className="h-3 rounded-full bg-white transition-all duration-500"
							style={{ width: `${percentage}%` }}
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
