import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
    try {
        const trendingProducts = await prisma.product.findMany({
            where: {
                isTrending: true,
            },
            take: 6,
            include: {
                category: true,
            },
        });

        return NextResponse.json(trendingProducts.map(p => ({
            ...p,
            price: p.price.toString()
        })));
    } catch (error) {
        console.error("Error fetching trending products:", error);
        return NextResponse.json(
            { error: "Failed to fetch trending products" },
            { status: 500 }
        );
    }
}
