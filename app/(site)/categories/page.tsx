import { prisma } from "@/lib/prisma";
import React from "react";
import CategoriesContent from "./CategoriesContent";
import { getSiteSettings } from "@/lib/admin-actions";

export const revalidate = 3600; // Revalidate every hour

async function getAllCategories() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: {
                name: 'asc'
            }
        });
        return categories;
    } catch (error) {
        console.error("Failed to fetch categories:", error);
        return [];
    }
}

export default async function CategoriesPage() {
    const [categories, siteSettings] = await Promise.all([
        getAllCategories(),
        getSiteSettings()
    ]);

    return (
        <CategoriesContent categories={categories} siteSettings={siteSettings} />
    );
}
