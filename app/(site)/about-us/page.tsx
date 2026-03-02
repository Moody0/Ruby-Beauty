import { getSiteSettings } from "@/lib/admin-actions";
import AboutUsClient from "./AboutUsClient";

export const dynamic = 'force-dynamic';

export default async function AboutUsPage() {
    const settings = await getSiteSettings();

    return <AboutUsClient settings={settings} />;
}
