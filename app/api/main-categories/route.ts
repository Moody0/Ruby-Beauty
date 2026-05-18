import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const mainCategories = await prisma.mainCategory.findMany({
            where: { isActive: true },
            orderBy: { name: "asc" },
            select: {
                id: true,
                name: true,
                slug: true,
                description: true,
                image: true,
            },
        });

        return NextResponse.json(mainCategories);
    } catch (error) {
        console.error("Error fetching main categories:", error);
        return NextResponse.json(
            { error: "Failed to fetch main categories" },
            { status: 500 }
        );
    }
}
