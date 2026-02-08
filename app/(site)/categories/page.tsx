import { prisma } from "@/lib/prisma";
import React from "react";
import CategoriesContent from "./CategoriesContent";

export const dynamic = "force-dynamic";

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
    const categories = await getAllCategories();

    return (
        <CategoriesContent categories={categories} />
    );
}
