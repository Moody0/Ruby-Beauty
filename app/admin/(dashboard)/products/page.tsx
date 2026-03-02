import { getAdminProducts, getAdminCategories } from "../../../../lib/admin-actions";
import ProductsClient from "./ProductsClient";

export const revalidate = 60; // Revalidate every minute for admin

export default async function AdminProductsPage() {
<<<<<<< HEAD
    const [productsData, categoriesData] = await Promise.all([
        getAdminProducts(1, 2000),
=======
    const [products, categoriesData] = await Promise.all([
        getAdminProducts(),
>>>>>>> a19576317a12ff361fa14bd438f06655de705684
        getAdminCategories(1, 2000)
    ]);

    return <ProductsClient products={products} categories={categoriesData.categories} />;
}
