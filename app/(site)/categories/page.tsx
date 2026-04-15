import React from "react";
import CategoriesContent from "./CategoriesContent";
import { getSiteSettings } from "@/lib/admin-actions";
import { getCatalogCategories } from "@/lib/catalog";

export const revalidate = 3600; // Revalidate every hour

async function getAllCategories() {
    try {
        return await getCatalogCategories();
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
