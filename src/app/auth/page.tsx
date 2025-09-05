"use client";

import type React from "react";

import { useState } from "react";

import { Input } from "@/features/shared/components/base/input";
import { Label } from "@/features/shared/components/base/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/features/shared/components/base/card";
import { Mail, ArrowRight } from "lucide-react";
import { Button } from "@/features/shared/components/base/button";
import EmailSentCard from "@/features/auth/components/email-sent-card";
import { authClient } from "@/infrastructure/auth/auth-client";
import { toast } from "@/features/shared/lib/toast";
import { env } from "@/config/env.client";
import { LOG_GROUPS, Logger } from "@/features/shared/lib/logger";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isEmailSent, setIsEmailSent] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!email) return;

		setIsLoading(true);

		const { error } = await authClient.signIn.magicLink({
			email,
			callbackURL: `${env.NEXT_PUBLIC_BASE_URL}/auth`,
		});

		if (error) {
			toast.error("Failed to send magic link.", { description: error.message });
			Logger.error(`Registration Error: ${email} not found`, {
				group: LOG_GROUPS.REGISTRATION,
				email,
				message: error.message,
			});
			return setIsLoading(false);
		}

		setIsLoading(false);
		setIsEmailSent(true);
	};

	const handleUseDifferentEmail = () => {
		setEmail("");
		setIsEmailSent(false);
	};

	if (isEmailSent) {
		return (
			<EmailSentCard
				handleUseDifferentEmail={handleUseDifferentEmail}
				email={email}
			/>
		);
	}

	return (
		<div className="flex min-h-screen items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
						<Mail className="h-6 w-6 text-white" />
					</div>
					<CardTitle>Welcome back</CardTitle>
					<CardDescription className="text-muted-foreground">
						Enter your email to receive a magic link
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="email" className="text-foreground">
								Email address
							</Label>
							<Input
								id="email"
								type="email"
								placeholder="Enter your email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className="bg-background text-foreground"
							/>
						</div>
						<Button
							type="submit"
							className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
							disabled={isLoading || !email}
						>
							{isLoading ? (
								<div className="flex items-center space-x-2">
									<div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
									<span>Sending link...</span>
								</div>
							) : (
								<div className="flex items-center space-x-2">
									<span>Send Link</span>
									<ArrowRight className="h-4 w-4" />
								</div>
							)}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
