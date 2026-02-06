import { getAdminCategories } from "../../../../lib/admin-actions";
import CategoriesClient from "./CategoriesClient";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
    const categories = await getAdminCategories();

    return <CategoriesClient categories={categories} />;
}
