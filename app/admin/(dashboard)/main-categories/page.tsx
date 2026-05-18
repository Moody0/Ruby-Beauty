import { getAdminMainCategories } from "../../../../lib/admin-actions";
import MainCategoriesClient from "./MainCategoriesClient";

export const revalidate = 60;

export default async function AdminMainCategoriesPage() {
    const mainCategories = await getAdminMainCategories();

    return <MainCategoriesClient mainCategories={mainCategories} />;
}
