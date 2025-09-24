import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "fs";
import path from "path";
import db from "@/infrastructure/db";
import { user } from "@/infrastructure/db/schema/auth.schema";
import { eq } from "drizzle-orm";

export async function GET(
    req: NextRequest,
    { params }: { params: { userId: string } }
) {
    // 1. Get user
    const [foundUser] = await db
        .select()
        .from(user)
        .where(eq(user.id, params.userId));

    if (!foundUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const fullName = foundUser.name || "Participant";

    // 2. Load template
    const templatePath = path.join(process.cwd(), "public", "papCertificate-template.pdf");
    const templateBytes = fs.readFileSync(templatePath);
    const pdfDoc = await PDFDocument.load(templateBytes);

    // 3. Add text
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    let fontSize = 28;
    let textWidth = font.widthOfTextAtSize(fullName, fontSize);

    // shrink until it fits max width
    const maxWidth = 300;
    while (textWidth > maxWidth && fontSize > 10) {
        fontSize -= 1;
        textWidth = font.widthOfTextAtSize(fullName, fontSize);
    }

    const textX = 280 + (maxWidth - textWidth) / 2;

    firstPage.drawText(fullName, {
        x: textX,
        y: 320,
        size: fontSize,
        font,
        color: rgb(0, 0, 0),
    });

    // 4. Export PDF
    const pdfBytes = await pdfDoc.save();

    // Convert Uint8Array to Buffer (Node.js)
    const pdfBuffer = Buffer.from(pdfBytes);

    return new NextResponse(pdfBuffer, {
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `inline; filename="Certificate-${fullName}.pdf"`,
        },
    });
}