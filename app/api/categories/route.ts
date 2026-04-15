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
            orderBy: [
                { isFeatured: "desc" },
                { name: "asc" },
            ],
            select: {
                id: true,
                name: true,
                slug: true,
                description: true,
                image: true,
            },
        });

        const response = NextResponse.json(categories);
        response.headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
        return response;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return NextResponse.json(
            { error: "Failed to fetch categories" },
            { status: 500 }
        );
    }
}
