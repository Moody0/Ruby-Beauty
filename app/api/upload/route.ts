import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file received." }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to public/uploads/reviews
        const uploadDir = join(process.cwd(), "public/uploads/reviews");
        
        // Ensure directory exists
        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true });
        }

        // Create a unique filename
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const extension = file.name.split('.').pop() || 'jpg';
        const filename = `${uniqueSuffix}.${extension}`;
        
        const path = join(uploadDir, filename);
        await writeFile(path, buffer);
        
        // Return the public URL
        const imageUrl = `/uploads/reviews/${filename}`;
        
        return NextResponse.json({ url: imageUrl, success: true });
    } catch (error) {
        console.error("Error uploading file:", error);
        return NextResponse.json({ error: "Failed to upload file." }, { status: 500 });
    }
}
