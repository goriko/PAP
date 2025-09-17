import {
	Building,
	Calendar,
	Home,
	Inbox,
	QrCode,
	UserPlus,
	MonitorStop,
	User,
	Gift,
	Clipboard,
} from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/features/shared/components/base/sidebar";
import Link from "next/link";
import { authClient } from "@/infrastructure/auth/auth-client";
import { headers } from "next/headers";
import { Avatar, AvatarFallback, AvatarImage } from "../components/base/avatar";
import type { ExtendedSession } from "@/types/entities/session.entity";
import {
	type UserRoleEnum,
	UserRoleEnumSchema,
} from "@/types/enums/UserRoleEnum";

import { Button } from "@/features/shared/components/base/button"

// Menu items with role restrictions
const getMenuItems = (userRole: UserRoleEnum, userId?: string) => {
	const allItems = [
		{
			title: "Home",
			url: "/",
			icon: Home,
			roles: [UserRoleEnumSchema.Enum.STAFF, UserRoleEnumSchema.Enum.ADMIN, UserRoleEnumSchema.Enum.USER],
		},
		{
			title: "Logs",
			url: "/logs",
			icon: Inbox,
			roles: [UserRoleEnumSchema.Enum.STAFF, UserRoleEnumSchema.Enum.ADMIN],
		},
		{
			title: "Registration",
			url: "/registration",
			icon: UserPlus,
			roles: [UserRoleEnumSchema.Enum.STAFF, UserRoleEnumSchema.Enum.ADMIN],
		},
		{
			title: "Terminal",
			url: "/terminal",
			icon: MonitorStop,
			roles: [UserRoleEnumSchema.Enum.STAFF, UserRoleEnumSchema.Enum.ADMIN],
		},
		{
			title: "QR Code",
			url: "/qr-code",
			icon: QrCode,
			roles: [
				UserRoleEnumSchema.Enum.USER,
				UserRoleEnumSchema.Enum.STAFF,
				UserRoleEnumSchema.Enum.ADMIN,
			],
		},
		{
			title: "QR Scanner",
			url: "/qr-scan",
			icon: QrCode,
			roles: [UserRoleEnumSchema.Enum.STAFF, UserRoleEnumSchema.Enum.ADMIN],
		},
		{
			title: "Event Schedule",
			url: "/schedule",
			icon: Calendar,
			roles: [
				UserRoleEnumSchema.Enum.USER,
				UserRoleEnumSchema.Enum.STAFF,
				UserRoleEnumSchema.Enum.ADMIN,
			],
		},
		{
			title: "Souvenir",
			url: "https://heyzine.com/flip-book/f899f08b83.html?fbclid=IwY2xjawMqr-5leHRuA2FlbQIxMABicmlkETE4Z1JOY0hvbnRERlRuc2JYAR6x2Jg0sU2GWe48XEbPw4E71isiKUopUbqbnoY3eOO1nznEJlJCzwgEf-yJ2g_aem_04k5fAnzd1zAsSQXFi29xQ",
			icon: Gift,
			roles: [
				UserRoleEnumSchema.Enum.USER,
				UserRoleEnumSchema.Enum.STAFF,
				UserRoleEnumSchema.Enum.ADMIN,
			],
		},
	];

	if (userId) {
		allItems.push({
			title: "Evaluation",
			url: `/evaluation/${userId}`,
			icon: Clipboard,
			roles: [UserRoleEnumSchema.Enum.USER],
		});
	}

	return allItems.filter((item) => item.roles.includes(userRole));
};

export async function AppSidebar() {
	const session = (await authClient.getSession({
		fetchOptions: {
			headers: await headers(),
		},
	})) as { data: ExtendedSession | null };

	const userName = session.data?.user.name;
	const userRole = session.data?.user.role as UserRoleEnum;
	const userId = session.data?.user.id;
	const menuItems = getMenuItems(userRole, userId);

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader className="border-border border-r py-4">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<div className="font-semibold">
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
									<Building className="size-4" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">PAP Summit</span>
									<span className="truncate text-sidebar-foreground/70 text-xs">
										Dashboard
									</span>
								</div>
							</div>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent className="border-border border-r">
				<SidebarGroup>
					<SidebarGroupLabel>Navigation</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{menuItems.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild tooltip={item.title}>
										{item.title != "Souvenir" ? (
											<Link href={item.url}>
												<item.icon />
												<span>{item.title}</span>
											</Link>
										) : (
											<a
												key={item.title}
												href={item.url}
												target="_blank"
												rel="noopener noreferrer"
											>
												<item.icon />
												<span>{item.title}</span>
											</a>
										)}

									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter className="border-border border-r">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton tooltip="User Account">
							<div className="flex aspect-square size-4 items-center justify-center rounded-full bg-sidebar-accent">
								<Avatar>
									<AvatarImage src="/placeholder.svg?height=32&width=32" />
									<AvatarFallback>
										<User className="h-4 w-4" />
									</AvatarFallback>
								</Avatar>
							</div>
							<span>{userName}</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
