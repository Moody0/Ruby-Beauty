import { getAdminBrands } from "../../../../lib/admin-actions";
import BrandsClient from "./BrandsClient";

export const revalidate = 60;

export default async function AdminBrandsPage() {
    const brands = await getAdminBrands();

    return <BrandsClient brands={brands} />;
}
