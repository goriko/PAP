"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/features/shared/components/base/card";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/features/shared/components/base/tabs";
import FileUpload from "./file-upload";
import UserInputForm from "./user-input-form";

const RegistrationForm = () => {
	return (
		<Card className="w-full overflow-y-auto border-border shadow-sm">
			<CardHeader className="space-y-1 ">
				<CardTitle className="font-bold text-foreground text-xl">
					Registration
				</CardTitle>
				<CardDescription className="text-muted-foreground">
					Upload a file or enter information manually
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Tabs defaultValue="upload" className="w-full">
					<TabsList className="grid h-fit w-full grid-cols-2 gap-2 rounded-full border border-input bg-background p-2">
						<TabsTrigger
							value="upload"
							className="text-foreground data-[state=active]:border-input data-[state=active]:bg-accent data-[state=active]:shadow-none"
						>
							File Upload
						</TabsTrigger>
						<TabsTrigger
							value="manual"
							className="text-foreground data-[state=active]:border-input data-[state=active]:bg-accent data-[state=active]:shadow-none"
						>
							Manual Entry
						</TabsTrigger>
					</TabsList>

					<TabsContent value="upload" className="mt-6">
						<FileUpload />
					</TabsContent>

					<TabsContent value="manual" className="mt-6">
						<UserInputForm />
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	);
};

export default RegistrationForm;
