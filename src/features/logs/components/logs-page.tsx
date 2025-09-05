"use client";

import { useState } from "react";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/features/shared/components/base/card";
import { Tabs, TabsContent } from "@/features/shared/components/base/tabs";
import { Zap } from "lucide-react";
import { LOG_TABS } from "@/features/logs/types/transformed-log";
import LogTab from "@/features/logs/components/log-tab";
import { LOG_GROUPS } from "@/features/shared/lib/logger";
import { cn } from "@/features/shared/lib/utils";

export function LogsPage() {
	const [activeTab, setActiveTab] = useState<string>(LOG_GROUPS.REGISTRATION);

	return (
		<div>
			<div className="mx-auto space-y-6">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="font-bold text-3xl text-foreground">
							Logs Monitoring Dashboard
						</h1>
					</div>

					<div className="flex items-center gap-2">
						<Zap className="h-6 w-6 text-success" />
						<span className="font-medium text-base text-success">Live</span>
					</div>
				</div>

				<div className="hidden grid-cols-1 gap-4 md:grid md:grid-cols-4">
					{LOG_TABS.map((tab) => {
						return (
							<Card
								key={tab.id}
								className={cn(
									"cursor-pointer border-border bg-gradient-to-br from-card to-primary/10 transition-shadow hover:shadow-md",
									{
										"ring-2 ring-primary": activeTab === tab.id,
									},
								)}
								onClick={() => setActiveTab(tab.id)}
							>
								<CardHeader>
									<div className="flex items-center justify-between">
										<tab.icon className="h-8 w-8 text-muted-foreground" />
										<div className={`h-3 w-3 rounded-full ${tab.color}`} />
									</div>
								</CardHeader>
								<CardContent>
									<CardTitle className="font-medium text-foreground text-xl">
										{tab.label}
									</CardTitle>
									<CardDescription className="mt-1 text-xs">
										{tab.description}
									</CardDescription>
								</CardContent>
							</Card>
						);
					})}
				</div>

				<Tabs
					value={activeTab}
					onValueChange={setActiveTab}
					className="space-y-4"
				>
					{LOG_TABS.map((tab) => (
						<TabsContent key={tab.id} value={tab.id}>
							<LogTab group={tab.id} />
						</TabsContent>
					))}
				</Tabs>
			</div>
		</div>
	);
}
