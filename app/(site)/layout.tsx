import Header from "../components/Header";
import Footer from "../components/Footer";
import FooterInfoBar from "../components/FooterInfoBar";
import AnnouncementBar from "../components/AnnouncementBar";
import BottomNav from "../components/BottomNav";
import { getI18n } from "@/lib/i18n";
import { getCatalogCategories } from "@/lib/catalog";

async function getCategories() {
    try {
        return await getCatalogCategories();
    } catch (error) {
        console.error("Failed to fetch categories for header:", error);
        return [];
    }
}

export default async function SiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const categories = await getCategories();
    const { t, dir, language } = await getI18n();

    return (
        <div className="min-h-screen flex flex-col" dir={dir}>
            {/* Header */}
            <Header initialCategories={categories} dir={dir} language={language} />

            {/* Main Content */}
            <main className="flex-1 pb-16 md:pb-0">
                {children}
            </main>

            {/* Footer */}
            <Footer t={t} language={language} />

            {/* Bottom Mobile Navigation */}
            <BottomNav />
        </div>
    );
}
