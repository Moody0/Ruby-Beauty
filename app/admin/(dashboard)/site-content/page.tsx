import { getAdminCategories, getSiteSettings } from "../../../../lib/admin-actions";
import SiteContentClient from "./SiteContentClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SiteContentPage() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'SUPER_ADMIN') {
        redirect('/admin/dashboard');
    }

    const [siteSettings, categoriesData] = await Promise.all([
        getSiteSettings(),
        getAdminCategories(1, 500),
    ]);
    
    return (
        <SiteContentClient
            initialSettings={siteSettings}
            categories={categoriesData.categories.map((category) => ({
                id: category.id,
                name: category.name,
            }))}
        />
    );
}
