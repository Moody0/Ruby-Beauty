import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "8");
        const sort = searchParams.get("sort");
        const categoryIdsParam = searchParams.get("categoryIds");
        const search = searchParams.get("search");

        const skip = (page - 1) * limit;

        const where: Prisma.ProductWhereInput = {};
        if (categoryIdsParam) {
            const ids = categoryIdsParam.split(",").filter(Boolean);
            if (ids.length > 0) {
                where.categoryId = { in: ids };
            }
        }

        if (search) {
            where.OR = [
                { name: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
            ];
        }

        let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" };
        if (sort === "price_asc") {
            orderBy = { price: "asc" };
        } else if (sort === "price_desc") {
            orderBy = { price: "desc" };
        } else if (sort === "newest") {
            orderBy = { createdAt: "desc" };
        }

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
                price: p.price.toString(),
                discountPrice: p.discountPrice ? p.discountPrice.toString() : null,
                discountType: p.discountType,
                discountValue: p.discountValue ? p.discountValue.toString() : null,
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
