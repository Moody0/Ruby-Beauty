import { prisma } from "./prisma";

const CATEGORY_SLUG_FALLBACK = "category";

function randomSuffix() {
    return Math.random().toString(36).substring(2, 7);
}

export function createCategorySlugBase(name: string) {
    const slug = name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    return slug || CATEGORY_SLUG_FALLBACK;
}

export async function generateUniqueCategorySlug(name: string, excludeId?: string) {
    let slug = createCategorySlugBase(name);

    const existingCategory = await prisma.category.findFirst({
        where: {
            slug,
            ...(excludeId ? { id: { not: excludeId } } : {}),
        },
        select: {
            id: true,
        },
    });

    if (existingCategory) {
        slug = `${slug}-${randomSuffix()}`;
    }

    return slug;
}

export async function findCategoryByIdentifier(identifier: string) {
    if (!identifier) {
        return null;
    }

    return prisma.category.findFirst({
        where: {
            brand: { isActive: true },
            OR: [
                { id: identifier },
                { slug: { equals: identifier, mode: "insensitive" } },
                { name: { equals: identifier, mode: "insensitive" } },
            ],
        },
        select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            image: true,
            brandId: true,
        },
    });
}
