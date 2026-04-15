import { prisma } from "./prisma";

export interface CatalogCategory {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    image: string | null;
}

export interface CatalogProduct {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    price: string;
    discountPrice: string | null;
    images: string;
    categoryId: string;
    stock: number;
    isTrending: boolean;
}

const catalogCategorySelect = {
    id: true,
    name: true,
    slug: true,
    description: true,
    image: true,
};

export async function getCatalogCategories() {
    return prisma.category.findMany({
        orderBy: [
            { isFeatured: "desc" },
            { name: "asc" },
        ],
        select: catalogCategorySelect,
    });
}

export async function getFooterCategories(preferredIds: string[] = []) {
    const sanitizedIds = [...new Set(preferredIds.filter(Boolean))];

    if (sanitizedIds.length > 0) {
        const selectedCategories = await prisma.category.findMany({
            where: {
                id: {
                    in: sanitizedIds,
                },
            },
            select: {
                id: true,
                name: true,
                slug: true,
            },
        });

        const orderedSelectedCategories = sanitizedIds
            .map((id) => selectedCategories.find((category) => category.id === id))
            .filter((category): category is NonNullable<typeof category> => Boolean(category));

        if (orderedSelectedCategories.length > 0) {
            return orderedSelectedCategories;
        }
    }

    return prisma.category.findMany({
        take: 4,
        orderBy: [
            { isFeatured: "desc" },
            { name: "asc" },
        ],
        select: {
            id: true,
            name: true,
            slug: true,
        },
    });
}

export async function getCategoryBySlug(slug: string) {
    return prisma.category.findUnique({
        where: { slug },
        select: catalogCategorySelect,
    });
}

export async function getCatalogInitialData(categoryId?: string) {
    const whereClause: {
        stock: { gt: number };
        categoryId?: string;
    } = {
        stock: { gt: 0 },
    };

    if (categoryId) {
        whereClause.categoryId = categoryId;
    }

    const [categories, products, totalProducts] = await Promise.all([
        getCatalogCategories(),
        prisma.product.findMany({
            where: whereClause,
            take: 12,
            orderBy: {
                createdAt: "desc",
            },
        }),
        prisma.product.count({
            where: whereClause,
        }),
    ]);

    return {
        categories,
        products: products.map((product) => ({
            ...product,
            price: product.price.toString(),
            discountPrice: product.discountPrice?.toString() || null,
        })),
        totalProducts,
    };
}
