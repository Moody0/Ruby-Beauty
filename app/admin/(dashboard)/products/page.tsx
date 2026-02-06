import { getAdminProducts, getAdminCategories } from "../../../../lib/admin-actions";
import ProductsClient from "./ProductsClient";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
    const [products, categories] = await Promise.all([
        getAdminProducts(),
        getAdminCategories()
    ]);

    return <ProductsClient products={products} categories={categories} />;
}
