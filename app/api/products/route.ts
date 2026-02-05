import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "8");
        const sort = searchParams.get("sort");
        const categoryIdsParam = searchParams.get("categoryIds");

        const skip = (page - 1) * limit;

        const where: any = {};
        if (categoryIdsParam) {
            const ids = categoryIdsParam.split(",").filter(Boolean);
            if (ids.length > 0) {
                where.categoryId = { in: ids };
            }
        }

        let orderBy: any = { createdAt: "desc" };
        if (sort === "price_asc") {
            orderBy = { price: "asc" };
        } else if (sort === "price_desc") {
            orderBy = { price: "desc" };
        } else if (sort === "newest") {
            orderBy = { createdAt: "desc" };
        }
        // 'best_selling' isn't easily possible without order history logic, defaulting to newest for now or we could add a popularity field later.

        const [products, total] = await Promise.all([
            prisma.product.findMany({
                where,
                skip,
                take: limit,
                orderBy,
            }),
            prisma.product.count({ where }),
        ]);

        return NextResponse.json({
            products: products.map(p => ({
                ...p,
                price: p.price.toString(), // Decimal to string for JSON
            })),
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                page,
                limit,
            },
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { error: "Failed to fetch products" },
            { status: 500 }
        );
    }
}
