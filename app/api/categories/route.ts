import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const limitParam = searchParams.get("limit");

        const take = limitParam ? parseInt(limitParam) : undefined;

        const categories = await prisma.category.findMany({
            ...(take && { take }),
            orderBy: {
                createdAt: "asc",
            },
            select: {
                id: true,
                name: true,
                description: true,
                image: true,
            },
        });

        return NextResponse.json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        return NextResponse.json(
            { error: "Failed to fetch categories" },
            { status: 500 }
        );
    }
}
