import { Card, CardContent } from "@/features/shared/components/base/card";
import { cn } from "@/features/shared/lib/utils";

interface TurnoutChartProps {
	attendees: number;
	registered: number;
	className?: string;
}

export function TurnoutChart({
	attendees,
	registered,
	className,
}: TurnoutChartProps) {
	const percentage = Math.round((attendees / registered) * 100);
	const radius = 90;
	const strokeWidth = 18;
	const normalizedRadius = radius - strokeWidth * 2;
	const circumference = normalizedRadius * 2 * Math.PI;
	const strokeDasharray = `${circumference} ${circumference}`;
	const strokeDashoffset = circumference - (percentage / 100) * circumference;

	return (
		<Card
			className={cn(
				"relative overflow-hidden rounded-2xl border-border bg-gradient-to-br from-info to-info-dark text-white shadow-lg",
				className,
			)}
		>
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-10">
				<div className="-translate-y-12 absolute top-0 right-0 h-40 w-40 translate-x-12 rounded-full bg-white" />
				<div className="-translate-x-8 absolute bottom-0 left-0 h-32 w-32 translate-y-8 rounded-full bg-white" />
			</div>

			<CardContent className="relative z-10 px-8 py-4">
				<div className="flex h-full items-center justify-between">
					<div className="space-y-4">
						<div className="font-medium text-base opacity-80">
							TURNOUT ANALYTICS
						</div>
						<div className="font-bold text-6xl">{percentage}%</div>
						<div className="inline-block rounded-full bg-analytics-warning-dark px-3 py-1 font-medium text-base text-white">
							Active
						</div>

						<div className="mt-6 space-y-2">
							<div className="flex items-center gap-2 text-base">
								<div className="h-2 w-2 rounded-full bg-white" />
								<span>Present: {attendees.toLocaleString()}</span>
							</div>
							<div className="flex items-center gap-2 text-base">
								<div className="h-2 w-2 rounded-full bg-white/60" />
								<span>Registered: {registered.toLocaleString()}</span>
							</div>
						</div>
					</div>

					<div className="relative">
						<svg
							height={radius * 2}
							width={radius * 2}
							className="-rotate-90 transform"
						>
							<title>Turnout Chart</title>
							{/* Background Circle */}
							<circle
								stroke="rgba(255,255,255,0.2)"
								fill="transparent"
								strokeWidth={strokeWidth}
								r={normalizedRadius}
								cx={radius}
								cy={radius}
							/>
							{/* Progress Circle */}
							<circle
								stroke="white"
								fill="transparent"
								strokeWidth={strokeWidth}
								strokeDasharray={strokeDasharray}
								strokeDashoffset={strokeDashoffset}
								strokeLinecap="round"
								r={normalizedRadius}
								cx={radius}
								cy={radius}
								className="transition-all duration-1000 ease-out"
							/>
						</svg>

						{/* Center Text */}
						<div className="absolute inset-0 flex items-center justify-center">
							<div className="text-center">
								<div className="font-bold text-2xl">{percentage}%</div>
							</div>
						</div>

						{/* Arrow */}
						<div className="absolute right-3 bottom-3 flex h-8 w-8 items-center justify-center rounded-full bg-white">
							<svg
								className="h-4 w-4 text-analytics-primary"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<title>Arrow</title>
								<path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
							</svg>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
