import { Card, CardContent } from "@/features/shared/components/base/card";
import { Input } from "@/features/shared/components/base/input";
import { Search } from "lucide-react";

interface LogsFiltersEnhancedProps {
	onSearch: (query: string) => void;
}

export default function LogsFilters({ onSearch }: LogsFiltersEnhancedProps) {
	return (
		<Card className="border-border">
			<CardContent className="p-3 sm:p-4">
				<div className="space-y-3 sm:space-y-4">
					<div className="relative">
						<Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 transform text-muted-foreground" />
						<Input
							placeholder="Search logs by message..."
							className="bg-background pl-10 text-foreground placeholder-muted-foreground"
							onChange={(e) => onSearch(e.target.value)}
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
