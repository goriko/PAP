import { QRCodeGenerator } from "@/features/qr-code/components/generator/qr-code-generator";

export const dynamic = "force-dynamic";

export default async function QRCodePage() {
	return (
		<div className="col-span-full flex flex-col">
			<QRCodeGenerator />
		</div>
	);
}
