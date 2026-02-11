import { getSiteSettings } from "../../../../lib/admin-actions";
import SiteContentClient from "./SiteContentClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function SiteContentPage() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'SUPER_ADMIN') {
        redirect('/admin/dashboard');
    }

    const siteSettings = await getSiteSettings();
    
    return <SiteContentClient initialSettings={siteSettings} />;
}
