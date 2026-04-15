import Header from "../components/Header";
import Footer from "../components/Footer";
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
            <Header initialCategories={categories} t={t} dir={dir} language={language} />
            <main className="flex-1">
                {children}
            </main>
            <Footer t={t} language={language} />
        </div>
    );
}
