"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/features/shared/components/base/button";
import { Input } from "@/features/shared/components/base/input";
import { Label } from "@/features/shared/components/base/label";
import type { UserCreateEntity } from "@/types/entities/user.entity";
import { useRegisterUserManually } from "../data/use-register-user-manually";
import { toast } from "@/features/shared/lib/toast";
import { UserRoleEnumSchema } from "@/types/enums/UserRoleEnum";
import {
	RadioGroup,
	RadioGroupItem,
} from "@/features/shared/components/base/radio-group";

type FormData = Omit<UserCreateEntity, "password">;

const initialFormData: FormData = {
	email: "",
	firstName: "",
	middleName: "",
	lastName: "",
	role: UserRoleEnumSchema.Enum.USER,
};

const UserInputForm = () => {
	const [formData, setFormData] = useState<FormData>(initialFormData);
	const mutation = useRegisterUserManually();

	const handleInputChange = (newData: FormData) => {
		setFormData(newData);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		mutation.mutate(formData, {
			onSuccess: (data) => {
				toast.success(data.message);
				setFormData(initialFormData);
			},
			onError: (error) => {
				toast.error(error.message);
			},
		});
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="space-y-2">
				<Label htmlFor="email" className="font-medium text-foreground">
					Email
				</Label>
				<Input
					id="email"
					type="email"
					value={formData.email}
					onChange={(e) =>
						handleInputChange({ ...formData, email: e.target.value })
					}
					className="bg-background text-foreground"
					required
				/>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor="firstName" className="font-medium text-foreground">
						First Name
					</Label>
					<Input
						id="firstName"
						type="text"
						value={formData.firstName}
						onChange={(e) =>
							handleInputChange({ ...formData, firstName: e.target.value })
						}
						className="bg-background text-foreground"
						required
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="middleName" className="font-medium text-foreground">
						Middle Name
					</Label>
					<Input
						id="middleName"
						type="text"
						value={formData.middleName}
						onChange={(e) =>
							handleInputChange({ ...formData, middleName: e.target.value })
						}
						className="bg-background text-foreground"
					/>
				</div>
			</div>

			<div className="space-y-2">
				<Label htmlFor="lastName" className="font-medium text-foreground">
					Last Name
				</Label>
				<Input
					id="lastName"
					type="text"
					value={formData.lastName}
					onChange={(e) =>
						handleInputChange({ ...formData, lastName: e.target.value })
					}
					className="bg-background text-foreground"
					required
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="role" className="font-medium text-foreground">
					Role
				</Label>
				<RadioGroup value={formData.role as string}>
					{Object.keys(UserRoleEnumSchema.Enum).map((role) => (
						<div key={`role-${role}`} className="flex items-center space-x-2">
							<RadioGroupItem
								value={role}
								id={`option-${role}`}
								className="border-input bg-background text-foreground"
								onClick={() => handleInputChange({ ...formData, role })}
							/>
							<Label htmlFor={`option-${role}`}>{role}</Label>
						</div>
					))}
				</RadioGroup>
			</div>
			<Button
				type="submit"
				className="mt-2 w-full bg-info-dark py-2.5 font-medium text-white transition-colors duration-200 hover:bg-info-light dark:text-white"
				disabled={mutation.isPending}
			>
				Register User
			</Button>
		</form>
	);
};

export default UserInputForm;
