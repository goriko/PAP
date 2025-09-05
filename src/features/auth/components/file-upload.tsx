"use client";

import type React from "react";
import { useRef, useState } from "react";
import { Button } from "@/features/shared/components/base/button";
import { Label } from "@/features/shared/components/base/label";
import { Input } from "@/features/shared/components/base/input";
import { useRegisterUserWithFile } from "../data/use-register-user-with-file";
import { toast } from "@/features/shared/lib/toast";

const FileUpload = () => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [file, setFile] = useState<File | null>(null);
	const mutation = useRegisterUserWithFile();

	const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setFile(file);
		}
	};

	const handleUploadClick = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!file) {
			toast.error("Please select a file");
			return;
		}

		mutation.mutate(
			{ file },
			{
				onSuccess: (data) => {
					toast.success(data.message);
					// Reset the file input
					if (fileInputRef.current) {
						fileInputRef.current.value = "";
					}
					setFile(null);
				},
				onError: (error) => {
					toast.error(error.message);
				},
			},
		);
	};

	return (
		<form className="flex flex-col gap-4" onSubmit={handleUploadClick}>
			<Label htmlFor="file">Upload CSV or Excel file only</Label>
			<Input
				id="file"
				type="file"
				accept=".csv,.xlsx,.xls"
				className="cursor-pointer bg-background"
				onChange={handleFileSelect}
				ref={fileInputRef}
				required
			/>
			<Button
				disabled={mutation.isPending}
				type="submit"
				className="bg-info-dark text-white hover:bg-info-light"
			>
				Upload
			</Button>
		</form>
	);
};

export default FileUpload;
