import { getAdminProducts, getAdminCategories, getAdminBrands } from "../../../../lib/admin-actions";
import ProductsClient from "./ProductsClient";

export const revalidate = 60; // Revalidate every minute for admin

export default async function AdminProductsPage() {
    const [products, categoriesData, brands] = await Promise.all([
        getAdminProducts(),
        getAdminCategories(1, 2000),
        getAdminBrands()
    ]);

    return <ProductsClient products={products} categories={categoriesData.categories} brands={brands} />;
}
