import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/features/shared/components/base/theme-provider";
import { QueryClientProvider } from "@/features/shared/components/QueryClientProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/features/shared/components/base/sonner";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "PAP Annual Convention",
	description: "PAP Annual Convention Registration System",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html suppressHydrationWarning lang="en">
			<body className={`${geistSans.className} antialiased`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<QueryClientProvider>
						{children}
						<ReactQueryDevtools initialIsOpen={false} />
						<Toaster />
					</QueryClientProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
