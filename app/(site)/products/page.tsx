import React, { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import ProductsClient from './ProductsClient';

// Use a separate component for the loading state if needed, 
// but Suspense in layout or here is good.

async function getInitialData(categoryId?: string | null) {
    try {
        const whereClause: any = {
            stock: { gt: 0 }
        };

        if (categoryId) {
            // Find category by name or ID
            const category = await prisma.category.findFirst({
                where: {
                    OR: [
                        { id: categoryId },
                        { name: { equals: categoryId, mode: 'insensitive' } }
                    ]
                }
            });
            if (category) {
                whereClause.categoryId = category.id;
            }
        }

        const [categories, products, totalProducts] = await Promise.all([
            prisma.category.findMany({
                take: 100,
                select: {
                    id: true,
                    name: true,
                    description: true,
                }
            }),
            prisma.product.findMany({
                where: whereClause,
                take: 12,
                orderBy: {
                    createdAt: 'desc'
                }
            }),
            prisma.product.count({
                where: whereClause
            })
        ]);

        return {
            categories,
            products: products.map(p => ({
                ...p,
                price: p.price.toString(),
                discountPrice: p.discountPrice?.toString() || null,
            })),
            totalProducts
        };
    } catch (error) {
        console.error("Error fetching initial products data:", error);
        return {
            categories: [],
            products: [],
            totalProducts: 0
        };
    }
}

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;
    const category = typeof params.category === 'string' ? params.category : null;
    const { categories, products, totalProducts } = await getInitialData(category);

    return (
        <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
            <ProductsClient 
                initialCategories={categories} 
                initialProducts={products as any} 
                initialTotal={totalProducts} 
            />
        </Suspense>
    );
}
