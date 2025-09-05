import { Badge } from "@/features/shared/components/base/badge";

// TODO: Change this to an enum for type safety and better maintainability
interface StatusBadgeProps {
	status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
	switch (status.toLowerCase()) {
		case "fatal":
		case "error":
			return (
				<Badge className="bg-analytics-danger text-white hover:bg-analytics-danger-dark">
					{status.toUpperCase()}
				</Badge>
			);
		case "warning":
		case "warn":
			return (
				<Badge className="bg-analytics-warning text-black hover:bg-analytics-warning-dark">
					{status.toUpperCase()}
				</Badge>
			);
		case "info":
			return (
				<Badge className="bg-analytics-primary text-white hover:bg-analytics-primary-dark">
					{status.toUpperCase()}
				</Badge>
			);
		case "debug":
		case "trace":
			return (
				<Badge variant="secondary" className="text-muted-foreground">
					{status.toUpperCase()}
				</Badge>
			);

		default:
			return <Badge variant="secondary">{status}</Badge>;
	}
}
