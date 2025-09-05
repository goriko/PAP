import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/features/shared/components/base/card";
import { CheckCircle } from "lucide-react";
import { Button } from "@/features/shared/components/base/button";

export default function EmailSentCard({
	email,
	handleUseDifferentEmail,
}: {
	email: string;
	handleUseDifferentEmail: () => void;
}) {
	return (
		<div className="flex min-h-screen items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-success">
						<CheckCircle className="h-6 w-6 " />
					</div>
					<CardTitle>Check your email</CardTitle>
					<CardDescription className="text-muted-foreground">
						We've sent a magic link to{" "}
						<span className="font-medium ">{email}</span>
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="text-center text-muted-foreground text-sm">
						<p>Click the link in your email to sign in to your account.</p>
						<p className="mt-2">The link will expire in 15 minutes.</p>
					</div>
					<Button
						onClick={handleUseDifferentEmail}
						variant="outline"
						className="w-full border bg-background text-foreground hover:bg-accent"
					>
						Use a different email
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
