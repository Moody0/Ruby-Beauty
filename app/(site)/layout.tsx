import Header from "../components/Header";
import Footer from "../components/Footer";
import { prisma } from "@/lib/prisma";

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

    return (
        <div className="min-h-screen flex flex-col">
            <Header initialCategories={categories} />
            {children}
            <Footer />
        </div>
    );
}
