import { getAdminProducts, getAdminCategories } from "../../../../lib/admin-actions";
import ProductsClient from "./ProductsClient";

export const revalidate = 60; // Revalidate every minute for admin

export default async function AdminProductsPage() {
    const [products, categoriesData] = await Promise.all([
        getAdminProducts(),
        getAdminCategories(1, 2000)
    ]);

    return <ProductsClient products={products} categories={categoriesData.categories} />;
}
