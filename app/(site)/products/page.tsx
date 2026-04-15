import React, { Suspense } from "react";
import { redirect } from "next/navigation";
import ProductsClient from "./ProductsClient";
import { getCatalogInitialData } from "@/lib/catalog";
import { findCategoryByIdentifier } from "@/lib/category-utils";

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;
    const category = typeof params.category === "string" ? params.category : null;

    if (category) {
        const resolvedCategory = await findCategoryByIdentifier(category);
        redirect(resolvedCategory ? `/categories/${resolvedCategory.slug}` : "/products");
    }

    const { categories, products, totalProducts } = await getCatalogInitialData();

    return (
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
            <ProductsClient
                key="all-products"
                initialCategories={categories}
                initialProducts={products}
                initialTotal={totalProducts}
                activeCategory={null}
            />
        </Suspense>
    );
}
