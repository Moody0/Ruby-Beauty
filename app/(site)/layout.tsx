import Header from "../components/Header";
import Footer from "../components/Footer";
import { prisma } from "@/lib/prisma";
import { getI18n } from "@/lib/i18n";

async function getCategories() {
    try {
        const categories = await prisma.category.findMany({
            take: 20,
            select: {
                id: true,
                name: true,
            },
            orderBy: {
                name: 'asc'
            }
        });
        return categories;
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
            <Footer t={t} />
        </div>
    );
}
